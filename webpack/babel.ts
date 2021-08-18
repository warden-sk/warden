/*
 * Copyright 2021 Marek Kobida
 */

// @ts-ignore
import * as babel from '@babel/core';
import webpack from 'webpack';

export default function (this: webpack.LoaderContext<{}>, code: string): string {
  ({ code } = babel.transformSync(code, {
    filename: this.resourcePath,
    presets: ['@babel/preset-react', '@babel/preset-typescript'],
  }));

  return code;
}
