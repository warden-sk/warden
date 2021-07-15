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
    async renderChunk(_1) {
      const { code } = await minify(_1, { format: { comments: !1 } });
      return code;
    },
  };
}

export default {
  input: './private/index.tsx',
  output: { file: './public/index.js' },
  plugins: [
    terser(),
    typescript(),
    replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    nodeResolve({ extensions: ['.js', '.ts', '.tsx'] }),
    commonjs(),
  ],
};
