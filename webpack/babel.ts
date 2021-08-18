/*
 * Copyright 2021 Marek Kobida
 */

import * as babel from '@babel/core';

export default function (code: string): string {
  ({ code } = babel.transformSync(code, {
    filename: this.resourcePath,
    presets: ['@babel/preset-react', '@babel/preset-typescript'],
  }));

  return code;
}
