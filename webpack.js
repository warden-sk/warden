/*
 * Copyright 2021 Marek Kobida
 */

const Html = require('./webpack/Html');
const path = require('path');
const webpack = require('webpack');

const INPUT_FILE_PATH = './private/index.tsx';

const OUTPUT_FILE_NAME = 'index.js?[contenthash]';

const OUTPUT_FILE_PATH = './public';

const compiler = webpack({
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
        loader: './webpack/babel',
        test: /\.tsx?$/,
      },
    ],
  },
  name: 'warden',
  output: {
    assetModuleFilename: '[name][ext]?[contenthash]',
    filename: OUTPUT_FILE_NAME,
    path: path.resolve(OUTPUT_FILE_PATH),
  },
  plugins: [new Html()],
  resolve: {
    extensions: ['.js', '.json', '.ts', '.tsx'],
  },
});

compiler.watch({}, (_, __) => console.log(_, __?.toString({ colors: true })));
