/*
 * Copyright 2021 Marek Kobida
 */

const Html = require('./Html');
const path = require('path');
const webpack = require('webpack');

const INPUT_FILE_PATH = './private/index.tsx';

const OUTPUT_FILE_NAME = 'index.js';

const OUTPUT_FILE_PATH = './public';

module.exports = function ({ assets, name }) {
  return {
    entry: INPUT_FILE_PATH,
    mode: 'production',
    module: {
      rules: [
        {
          test: /\.css$/,
          type: 'asset/resource',
        },
        {
          exclude: /node_modules/,
          loader: path.resolve(__dirname, './babel'),
          test: /\.tsx?$/,
        },
      ],
    },
    name,
    output: {
      assetModuleFilename: '[name][ext]',
      filename: OUTPUT_FILE_NAME,
      path: path.resolve(OUTPUT_FILE_PATH),
    },
    plugins: [new Html(assets)],
    resolve: {
      extensions: ['.js', '.json', '.ts', '.tsx'],
    },
  };
};
