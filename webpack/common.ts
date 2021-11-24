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
  inputPath?: string;
  name?: string;
  outputFileName?: string;
  publicPath?: HTML['publicPath'];
  target?: string;
}

function common({
  assets,
  htmlTemplate,
  inputPath = './private/index.tsx',
  name,
  outputFileName = 'index.js',
  publicPath,
  target,
}: Common): webpack.Configuration {
  return {
    entry: inputPath,
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    module: {
      rules: [
        {
          loader: path.resolve(__dirname, './compiler.ts'),
          test: /\.css$/,
        },
        {
          loader: path.resolve(__dirname, './compiler.ts'),
          test: /\.tsx?$/,
        },
      ],
    },
    name,
    output: {
      filename: outputFileName,
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
