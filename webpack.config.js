/*
 * Copyright 2021 Marek Kobida
 */

const path = require('path');

module.exports = {
  entry: './public/index.js',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(css|html)$/i,
        type: 'asset/resource',
      },
    ],
  },
  output: {
    assetModuleFilename: '[name][ext]',
    filename: 'index.compiled.js',
    path: path.resolve(__dirname, './public'),
  },
};
