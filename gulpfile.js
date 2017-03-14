'use strict';

// CONFIG VARIABLES
var config = require('./config.json');
var dest = config.dest;

// REQUIRE VARIOUS
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var del = require('del');
var entityconvert = require('gulp-entity-convert');
var path = require('path');
var merge = require('merge-stream');
var fs = require('fs');

// REQUIRE HTML
var hb = require('gulp-hb');
var htmlmin = require('gulp-htmlmin');
var extname = require('gulp-extname');

// REQUIRE CSS
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var nano = require('gulp-cssnano');
var autoprefixer = require('autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var reporter = require("postcss-reporter");
var stylelint = require("stylelint");

// REQUIRE JS
var uglify = require('gulp-uglify');
var concat = require('gulp-concat-util');
var eslint = require('gulp-eslint');
var babel = require('gulp-babel');
var es2015 = require('babel-preset-es2015');

// REQUIRE IMAGE MINIFICATION
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

// BUILD HTML
gulp.task('html', function() {
  gulp.src(config.root + config.templates.pages + '/**/*.hbs')
    .pipe(hb({
      data: config.root + config.data + '/*.{js,json}',
      helpers: config.root + config.templates.helpers + '**/*.js',
      partials: config.root + config.templates.partials + '/**/*.hbs',
      bustCache: true
    }))
    .pipe(extname('.html'))
    .pipe(htmlmin({
      // https://github.com/kangax/html-minifier
      collapseWhitespace: true,
      minifyCSS: true,
      minifyJS: true,
      removeStyleLinkTypeAttributes: true,
      removeScriptTypeAttributes: true,
      useShortDoctype: true
    }))
    .pipe(entityconvert({ type: 'html' }))
    .pipe(gulp.dest(dest))
    .pipe(browserSync.reload({stream:true})); // Fire Browsersync
});

// BUILD CSS
var supportedBrowsers = [
    'last 2 versions',
    'safari >= 8',
    'ie >= 9',
    'ff >= 20',
    'ios 6',
    'android 4'
];

gulp.task('css', function () {
  gulp.src(config.root + config.styles + '/**/*.scss')
    .pipe(sourcemaps.init()) // Initialize sourcemaps
    .pipe(sass({
      includePaths: require('node-bourbon').includePaths,
      includePaths: require('node-neat').includePaths
    }).on('error', sass.logError)) // Run SASS
    .pipe(postcss([
      // http://stylelint.io/?docs/user-guide/rules.md
      stylelint({ /* options located in ./.stylelintrc */ }),
      reporter({ clearMessages: true })
    ]))
    .pipe(nano({
      zindex: false,
      autoprefixer: {
        browsers: supportedBrowsers,
        add: true
      }
    })) // Run CSSNano
    .pipe(sourcemaps.write()) // Write sourcemaps
    .pipe(gulp.dest(dest + '/assets/css')) // Output CSS
    .pipe(browserSync.reload({stream:true})); // Fire Browsersync
});

// HELPER FUNCTION TO BUILD OUT SEPARATE CONCAT FILES FOR APP AND VENDOR JS
function getFolders(dir) {
  return fs.readdirSync(dir)
    .filter(function(file) {
      return fs.statSync(path.join(dir, file)).isDirectory();
    });
}

// BUILD JS
// TODO: build out separate files for app and vendor
gulp.task('js', function() {
  var jsPath = config.root + config.scripts;
  var folders = getFolders(jsPath);

  var tasks = folders.map(function(folder) {
    return gulp.src(path.join(jsPath, folder, '/**/*.js'))
      .pipe(eslint({ /* options located in ./.eslintrc */ }))
      .pipe(eslint.format())
      .pipe(eslint.failOnError())
      .pipe(sourcemaps.init())
      .pipe(babel({ presets: ['es2015'] }))
      .pipe(concat(folder + '.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(dest + '/assets/js/' + folder))
      .pipe(browserSync.reload({stream:true})); // Fire Browsersync
  });
});

// MINIFY IMAGES
gulp.task('images', function() {
  gulp.src(config.root + config.images + '/**/*.{svg,png,gif,jpg,jpeg}')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(dest + config.images));
});

// CLEAN BUILD
gulp.task('clean', function() {
  return del(dest);
});

// LAUNCH BROWSERSYNC
gulp.task('browser-sync', function() {
  browserSync.init({
    // proxy: config.local + '/_build/',
    server: './_build',
    port: 3030,
    open: true,
    injectChanges: true
  });
});

gulp.task('watch', ['browser-sync'], function () {
  gulp.watch([
    config.root + config.templates.partials + '/**/*.hbs',
    config.root + config.templates.pages + '/**/*.hbs',
    config.root + config.data + '/**/*.json'], ['html']);
  gulp.watch(config.root + config.styles + '/**/*.scss', ['css']);
  gulp.watch(config.root + config.scripts + '/**/*.js', ['js']);
  gulp.watch('_src/assets/images/**/*', ['images']); // can't use root
});

// TODO: clean first, build after
gulp.task('default', ['html','css','js','images']);
