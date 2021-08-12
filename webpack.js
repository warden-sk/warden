/*
 * Copyright 2021 Marek Kobida
 */

const Html = require('./webpack/Html');
const path = require('path');
const webpack = require('webpack');

webpack(
  {
    entry: path.resolve('./private/index.tsx'),
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.css$/,
          type: 'asset/resource',
        },
        {
          exclude: /node_modules/,
          loader: path.resolve('./webpack/babel.js'),
          test: /\.tsx?$/,
        },
      ],
    },
    output: {
      assetModuleFilename: '[name][ext]',
      filename: 'index.js',
      path: path.resolve(__dirname, './public'),
    },
    plugins: [new Html({ title: 'warden' })],
    resolve: {
      extensions: ['.js', '.json', '.ts', '.tsx'],
    },
  },
  (_, __) => console.log(_, __?.toString())
);
