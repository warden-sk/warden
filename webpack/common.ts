/*
 * Copyright 2021 Marek Kobida
 */

import Html from './Html';
import path from 'path';
import webpack from 'webpack';

function common({ assets, name }: { assets?: string[]; name: string }): webpack.Configuration {
  return {
    entry: './private/index.tsx',
    module: {
      rules: [
        {
          test: /\.css$/,
          type: 'asset/resource',
        },
        {
          exclude: /node_modules/,
          loader: path.resolve(__dirname, './compiler.ts'),
          test: /\.tsx?$/,
        },
      ],
    },
    name,
    output: {
      assetModuleFilename: '[name][ext]',
      filename: 'index.js',
      path: path.resolve('./public'),
      publicPath: '',
    },
    plugins: [new Html(assets)],
    resolve: {
      extensions: ['.js', '.json', '.ts', '.tsx'],
    },
  };
}

export default common;
