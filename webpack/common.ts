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
  inputFilePath?: string;
  name: string;
  outputFileName?: string;
  publicPath?: HTML['publicPath'];
}

function common({
  assets = [],
  htmlTemplate = () => '',
  inputFilePath = './private/index.tsx',
  name,
  outputFileName = 'index.js',
  publicPath = '',
}: Common): webpack.Configuration {
  return {
    entry: inputFilePath,
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    module: {
      rules: [
        {
          loader: path.resolve(__dirname, './compiler.ts'),
          test: /\.(?:css|tsx?)$/,
        },
      ],
    },
    name,
    output: {
      filename: outputFileName,
      globalObject: 'this',
      libraryTarget: 'umd',
      path: path.resolve('./public'),
    },
    plugins: [new CSS(), new HTML(assets, htmlTemplate, publicPath)],
    resolve: {
      extensions: ['.js', '.json', '.ts', '.tsx'],
    },
  };
}

export default common;
