const config = require('./config');
const webpack = require('webpack')
const path = require('path');

module.exports = {
  devtool: 'inline-source-map',
  entry: {
    main: path.resolve(__dirname, `${config.src + config.js}main.js`),
    // homepage: path.resolve(__dirname, `${config.src + config.js}layouts/homepage.js`),
    // products: path.resolve(__dirname, `${config.src + config.js}layouts/products.js`),
    // 'product-details': path.resolve(__dirname, `${config.src + config.js}layouts/product-details.js`)
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, `${config.build}`)
  },
  watch: false,
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }]
  }
}
