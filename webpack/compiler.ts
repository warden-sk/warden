/*
 * Copyright 2021 Marek Kobida
 */

// @ts-ignore
import * as babel from '@babel/core';
import webpack from 'webpack';

export const FILES = new Map<string, string>();

function compiler(this: webpack.LoaderContext<{}>, code: string): string {
  const filePath = this.resourcePath;

  FILES.set(filePath, code);

  if (/\.css$/.test(filePath)) return '';

  if (/\.tsx?$/.test(filePath)) ({ code } = babel.transformSync(code, { filename: filePath }));

  return code;
}

export default compiler;
