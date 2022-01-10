/*
 * Copyright 2022 Marek Kobida
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
              .replace(/export default (".+");/, (js, css) => JSON.parse(css)) ?? ''
        );

      compilation.emitAsset('index.css', new ConcatSource(...css));
    });
  }
}

export default CSS;
