/*
 * Copyright 2021 Marek Kobida
 */

import CSS from './CSS';
import HTML from './HTML';
import path from 'path';
import webpack from 'webpack';

function common({ assets, name }: { assets?: string[]; name: string }): webpack.Configuration {
  return {
    entry: './private/index.tsx',
    externals: {
      react: {
        commonjs: 'react',
        commonjs2: 'react',
        root: 'React',
      },
      'react-dom': {
        commonjs: 'react-dom',
        commonjs2: 'react-dom',
        root: 'ReactDOM',
      },
    },
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
      publicPath: '',
    },
    plugins: [new CSS(), new HTML(assets)],
    resolve: {
      extensions: ['.js', '.json', '.ts', '.tsx'],
    },
  };
}

export default common;
