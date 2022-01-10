/*
 * Copyright 2022 Marek Kobida
 */

import ReactDOMServer from 'react-dom/server';
import vm from 'vm';
import webpack from 'webpack';

function compileReact(compilation: webpack.Compilation, outputFileName = 'index.js'): string {
  const asset: webpack.Asset | undefined = compilation.getAsset('index.js');

  if (asset) {
    const code: Buffer = asset.source.buffer();

    const context = { exports, module: { exports } } as const;

    const script: vm.Script = new vm.Script(code.toString());

    try {
      script.runInNewContext(context);
    } catch (error) {}

    return ReactDOMServer.renderToString(context.module.exports.default);
  }

  throw new Error(`The output file "${outputFileName}" does not exist.`);
}

export default compileReact;
