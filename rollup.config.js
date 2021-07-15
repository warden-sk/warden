/*
 * Copyright 2021 Marek Kobida
 */

import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

export default {
  input: './public/index.js',
  output: {
    file: './public/index.compiled.js',
    format: 'iife',
  },
  plugins: [
    commonjs(),
    nodeResolve({
      extensions: ['.js', '.ts', '.tsx'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
};
