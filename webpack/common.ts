/*
 * Copyright 2021 Marek Kobida
 */

import CSS from './CSS';
import HTML from './HTML';
import path from 'path';
import webpack from 'webpack';

interface Common {
  assets?: HTML['assets'];
  htmlTemplate?: HTML['htmlTemplate'];
  inputFile: string;
  name: string;
  publicPath?: HTML['publicPath'];
  target?: string;
}

function common({ assets, htmlTemplate, inputFile, name, publicPath, target = 'web' }: Common): webpack.Configuration {
  return {
    entry: path.resolve('./private', inputFile),
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    module: {
      rules: [
        {
          loader: path.resolve(__dirname, './compiler.ts'),
          test: /\.css$/,
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
      filename: 'index.js',
      globalObject: 'this',
      libraryTarget: 'umd',
      path: path.resolve('./public'),
      publicPath,
    },
    plugins: [new CSS(), new HTML({ assets, htmlTemplate, publicPath })],
    resolve: {
      extensions: ['.js', '.json', '.ts', '.tsx'],
    },
    target,
  };
}

export default common;
