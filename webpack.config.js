/*
 * Copyright 2021 Marek Kobida
 */

const path = require('path');

module.exports = {
  entry: './private/index.js',
  mode: 'development',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, './public'),
  },
};
