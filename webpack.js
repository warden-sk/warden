/*
 * Copyright 2021 Marek Kobida
 */

const path = require('path');
const webpack = require('webpack');

webpack(
  {
    entry: path.resolve('./private/index.tsx'),
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.(css|html)$/,
          type: 'asset/resource',
        },
        {
          exclude: /node_modules/,
          loader: path.resolve('./babel.js'),
          test: /\.tsx?$/,
        },
      ],
    },
    output: {
      assetModuleFilename: '[name][ext]',
      filename: 'index.js',
      path: path.resolve(__dirname, './public'),
    },
    resolve: {
      extensions: ['.js', '.json', '.ts', '.tsx'],
    },
  },
  (_, __) => console.log(__.toString())
);
