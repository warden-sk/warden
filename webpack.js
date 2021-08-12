/*
 * Copyright 2021 Marek Kobida
 */

const Html = require('./webpack/Html');
const path = require('path');
const webpack = require('webpack');

const INPUT_FILE_PATH = './private/index.tsx';

const OUTPUT_FILE_NAME = 'index.js';

const OUTPUT_FILE_PATH = './public';

webpack(
  {
    entry: path.resolve(INPUT_FILE_PATH),
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
      filename: OUTPUT_FILE_NAME,
      path: path.resolve(OUTPUT_FILE_PATH),
    },
    plugins: [new Html()],
    resolve: {
      extensions: ['.js', '.json', '.ts', '.tsx'],
    },
  },
  (_, __) => console.log(_, __?.toString({ colors: true }))
);
