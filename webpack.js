/*
 * Copyright 2021 Marek Kobida
 */

const path = require('path');
const webpack = require('webpack');

webpack(
  {
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
      filename: 'index.js',
      path: path.resolve(__dirname, './public'),
    },
  },
  function () {
    console.log(arguments[1].toString());
  }
);
