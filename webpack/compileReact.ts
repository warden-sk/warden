/*
 * Copyright 2021 Marek Kobida
 */

import vm from 'vm';
import webpack from 'webpack';

function compileReact(compilation: webpack.Compilation): string {
  const asset = compilation.getAsset('index.js');

  if (asset) {
    const code = asset.source.source();

    const context = { console, exports, module: { exports } };

    const script = new vm.Script(code.toString());

    script.runInNewContext(context);

    return context.module.exports.default;
  }

  throw new Error('Asset does not exist.');
}

export default compileReact;
