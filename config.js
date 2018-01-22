module.exports = {
  src: "./_src/",
  build: "./_dist/",
  templates: {
    partials: "templates/partials/",
    pages: "templates/pages/",
    helpers: "templates/helpers/",
    data: "data/"
  },
  css: {
    local: "assets/stylesheets/",
    paths: [
      "node_modules/sass-mediaqueries",
      "node_modules/normalize.css",
    ]
  },
  js: "assets/javascripts/",
  images: "assets/images/"
}
