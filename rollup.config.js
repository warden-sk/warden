/*
 * Copyright 2021 Marek Kobida
 */

import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';

export default {
  input: './private/index.tsx',
  output: {
    file: './public/index.js',
  },
  plugins: [
    commonjs(),
    nodeResolve({
      extensions: ['.js', '.ts', '.tsx'],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    typescript(),
  ],
};
