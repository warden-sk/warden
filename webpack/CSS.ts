/*
 * Copyright 2021 Marek Kobida
 */

import webpack from 'webpack';

class CSS {
  apply(compiler: webpack.Compiler) {
    const { ConcatSource } = webpack.sources;

    compiler.hooks.emit.tap(CSS.name, compilation => {
      const css = [...compilation.modules]
        .filter(module => /\.css$/.test(module.identifier()))
        .map(
          module =>
            module
              .originalSource()
              ?.buffer()
              .toString()
              .replace(/export default (".*");/, (_, __) => JSON.parse(__)) ?? ''
        );

      compilation.emitAsset('index.css', new ConcatSource(...css));
    });
  }
}

export default CSS;
