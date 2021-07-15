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

function test() {
  return {
    name: 'test',
    transform(code, id) {
      const [fileName, fileExtension] = id.match(/[^/]+\.([^.]+)$/);

      if (fileExtension === 'css' || fileExtension === 'html') {
        this.emitFile({ fileName, source: code, type: 'asset' });

        return { code: `export default ${JSON.stringify(code)};` };
      }
    },
  };
}

export default {
  input: './private/index.tsx',
  output: { file: './public/index.js' },
  plugins: [
    typescript(),
    test(),
    terser(),
    replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    nodeResolve({ extensions: ['.js', '.ts', '.tsx'] }),
    commonjs(),
  ],
};
