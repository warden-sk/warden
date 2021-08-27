/*
 * Copyright 2021 Marek Kobida
 */

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import common from './webpack/common';
import vm from 'vm';
import webpack from 'webpack';

function test(compilation: webpack.Compilation): string {
  const _ = compilation.getAsset('index.js');
  const code = _?.source.source();

  const context = { exports: exports, module: { exports }, require };

  const script = new vm.Script(code?.toString() || '');

  script.runInNewContext(context);

  const _1 = context.module.exports.default;

  try {
    return ReactDOMServer.renderToString(<_1 />);
  } catch (error) {
    console.log(error);
    return '';
  }
}

const compiler = webpack(
  common({
    assets: [
      'https://unpkg.com/react@17/umd/react.production.min.js',
      'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js',
    ],
    html: compilation => `<div id="index">${test(compilation)}</div>`,
    name: 'warden',
  })
);

compiler.watch({}, (_, __) => console.log(_, __?.toString({ colors: true })));
