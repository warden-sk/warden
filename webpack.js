/*
 * Copyright 2021 Marek Kobida
 */

const path = require('path');
const webpack = require('webpack');

webpack(
  {
    entry: './private/index.tsx',
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.(css|html)$/,
          type: 'asset/resource',
        },
        {
          exclude: /node_modules/,
          test: /\.tsx?$/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    output: {
      assetModuleFilename: '[name][ext]',
      filename: 'index.js',
      path: path.resolve(__dirname, '../warden.public'),
    },
    resolve: {
      extensions: ['.js', '.json', '.ts', '.tsx'],
    },
  },
  (_, __) => console.log(__.toString())
);
