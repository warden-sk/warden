/*
 * Copyright 2021 Marek Kobida
 */

import { FILES } from './compiler';
import webpack from 'webpack';

class CSS {
  apply(compiler: webpack.Compiler) {
    const { ConcatSource } = webpack.sources;

    compiler.hooks.emit.tap(CSS.name, compilation => {
      const css = [...FILES].filter(([filePath]) => /\.css$/.test(filePath)).map(([, code]) => code);

      compilation.emitAsset('index.css', new ConcatSource(...css));
    });
  }
}

export default CSS;
