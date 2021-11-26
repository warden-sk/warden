/*
 * Copyright 2021 Marek Kobida
 */

// @ts-ignore
import * as babel from '@babel/core';
import webpack from 'webpack';

function compiler(this: webpack.LoaderContext<{}>, code: string): string {
  const filePath = this.resourcePath;

  /\.css$/.test(filePath) && (code = `export default ${JSON.stringify(code)};`);

  /\.tsx?$/.test(filePath) && ({ code } = babel.transformSync(code, { filename: filePath }));

  return code;
}

export default compiler;
