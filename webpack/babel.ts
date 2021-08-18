/*
 * Copyright 2021 Marek Kobida
 */

// @ts-ignore
import * as babel from '@babel/core';

export default function (code: string): string {
  ({ code } = babel.transformSync(code, {
    // @ts-ignore
    filename: this.resourcePath,
    presets: ['@babel/preset-react', '@babel/preset-typescript'],
  }));

  return code;
}
