/*
 * Copyright 2021 Marek Kobida
 */

import common from './webpack/common';
import compileReact from './webpack/compileReact';
import webpack from 'webpack';

const compiler = webpack(
  common({
    htmlTemplate: compileReact,
    name: 'warden',
    publicPath: process.env.NODE_ENV === 'production' ? 'https://warden.sk' : undefined,
  })
);

compiler.watch({}, (_, __) => console.log(_, __?.toString({ colors: true })));
