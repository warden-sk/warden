/*
 * Copyright 2021 Marek Kobida
 */

import commonjs from '@rollup/plugin-commonjs';
import { minify } from 'terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';

function terser() {
  return {
    name: 'terser',
    async renderChunk(code) {
      const { code: c } = await minify(code);
      return c;
    },
  };
}

export default {
  input: './private/index.tsx',
  output: {
    file: './public/index.js',
  },
  plugins: [
    typescript(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    nodeResolve({
      extensions: ['.js', '.ts', '.tsx'],
    }),
    commonjs(),

    terser(),
  ],
};
