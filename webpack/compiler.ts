/*
 * Copyright 2021 Marek Kobida
 */

// @ts-ignore
import * as babel from '@babel/core';
import webpack from 'webpack';

export const FILES = new Map<string, string>();

function compileTypeScript(code: string, filePath: string): string {
  ({ code } = babel.transformSync(code, { filename: filePath }));

  return code;
}

function compiler(this: webpack.LoaderContext<{}>, code: string): string {
  const filePath = this.resourcePath;

  FILES.set(filePath, code);

  if (/\.css$/.test(filePath)) {
    return '';
  }

  if (/\.tsx?$/.test(filePath)) {
    return compileTypeScript(code, filePath);
  }

  return code;
}

export default compiler;