/*
 * Copyright 2021 Marek Kobida
 */

import common from './webpack/common';
import compileReact from './webpack/compileReact';
import webpack from 'webpack';

const compiler = webpack(
  common({
    htmlTemplate: compilation => `<div id="index">${compileReact('index.js', compilation)}</div>`,
    name: 'warden',
  })
);

compiler.watch({}, (_, __) => console.log(_, __?.toString({ colors: true })));
