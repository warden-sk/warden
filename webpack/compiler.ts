/*
 * Copyright 2021 Marek Kobida
 */

import * as babel from '@babel/core';
import webpack from 'webpack';

function compiler(this: webpack.LoaderContext<{}>, code: string): string {
  const filePath = this.resourcePath;

  /\.css$/.test(filePath) && (code = `export default ${JSON.stringify(code)};`);

  /\.tsx?$/.test(filePath) &&
    // @ts-ignore
    ({ code } = babel.transformSync(code, {
      filename: filePath,
      plugins: ['@warden-sk'],
      presets: ['@babel/preset-react', '@babel/preset-typescript'],
    }));

  return code;
}

export default compiler;
