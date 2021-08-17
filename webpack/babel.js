/*
 * Copyright 2021 Marek Kobida
 */

const babel = require('@babel/core');

module.exports = function (code) {
  ({ code } = babel.transformSync(code, {
    filename: this.resourcePath,
    presets: ['@babel/preset-react', '@babel/preset-typescript'],
  }));

  return code;
};
