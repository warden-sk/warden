/*
 * Copyright 2021 Marek Kobida
 */

const path = require('path');

module.exports = {
  entry: './compiled/index.js',
  mode: 'production',
  output: {
    filename: 'index.webpack.js',
    path: path.resolve(__dirname, './compiled'),
  },
};
