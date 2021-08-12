/*
 * Copyright 2021 Marek Kobida
 */

const Html = require('./webpack/Html');
const path = require('path');
const webpack = require('webpack');

const inputFilePath = './private/index.tsx';

const outputFileName = 'index.js';
const outputFilePath = './public';

webpack(
  {
    entry: path.resolve(inputFilePath),
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
    name: 'warden',
    output: {
      assetModuleFilename: '[name][ext]',
      filename: outputFileName,
      path: path.resolve(outputFilePath),
    },
    plugins: [new Html({ title: 'warden' })],
    resolve: {
      extensions: ['.js', '.json', '.ts', '.tsx'],
    },
  },
  (_, __) => console.log(_, __?.toString({ colors: true }))
);
