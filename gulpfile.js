// Configuration file
const config = require('./config');

// Global requirements
const gulp = require('gulp');
const path = require('path');
const browserSync = require('browser-sync');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');

// HTML
const hb = require('gulp-hb');
const inline = require('gulp-inline');

// CSS
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
// const purify = require('gulp-purifycss');

// JS
const webpack = require('webpack2-stream-watch');

const supported = [
    'last 2 versions',
    'safari >= 8',
    'ie >= 11',
    'ff >= 20',
    'ios 6',
    'android 4'
];

gulp.task('html', () => {
  gulp.src(`${config.src + config.templates.pages}**/*.hbs`)
    .pipe(hb({
      data: `${config.src + config.templates.data}**/*.{js,json}`,
      helpers: `${config.src + config.templates.helpers}**/*.js`,
      partials: `${config.src + config.templates.partials}**/*.hbs`,
      bustCache: true
    }))
    .pipe(rename({
      extname: '.html'
    }))
    .pipe(inline({
      base: `${config.src}`,
      disabledTypes: ['css', 'img', 'js']
    }))
    .pipe(gulp.dest(`${config.build}`))
    .pipe(browserSync.stream());
});

gulp.task('scripts', () => {
  gulp.src(`${config.src + config.js}**/*`)
  .pipe(webpack( require('./webpack.config.js')))
  .pipe(gulp.dest(`${config.build}assets/scripts`))
  .pipe(browserSync.stream());
});

gulp.task('styles', () => {
  gulp.src(`${config.src + config.css.local}styles.scss`)
  .pipe(sourcemaps.init())
    .pipe(sass({includePaths: config.css.paths}).on('error', sass.logError))
    // .pipe(gulpif(config.prod(), purify([`${config.build}**/*.html`, `${config.build}assets/js/**/*.js`])))
    // .pipe(gulpif(config.prod(), cssnano({discardComments: { removeAll: true }})))
    .pipe(cssnano({
      autoprefixer: {
        browsers: supported,
        add: true
      }
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(`${config.build}assets/styles`))
    .pipe(browserSync.stream());
});

gulp.task('watch', () => {
  gulp.watch(`${config.src + config.css.local}**/*.scss`, ['styles']);
  gulp.watch(`${config.src + config.js}**/*.js`, ['scripts']);
  gulp.watch([
    `${config.src}templates/**/*.hbs`,
    `${config.src}data/**/*.json`,
    `${config.src + config.images}**/*.svg`
  ], ['html']);
});

gulp.task('serve',() => {
  browserSync.init({
    server: config.build,
    open: false
  });
});
