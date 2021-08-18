/*
 * Copyright 2021 Marek Kobida
 */

import Html from './Html';
import path from 'path';

const INPUT_FILE_PATH = './private/index.tsx';

const OUTPUT_FILE_NAME = 'index.js';

const OUTPUT_FILE_PATH = './public';

export default function ({ assets, name }) {
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
}
