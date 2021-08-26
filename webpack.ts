/*
 * Copyright 2021 Marek Kobida
 */

import common from './webpack/common';
import webpack from 'webpack';

const compiler = webpack(
  common({
    assets: [
      'https://unpkg.com/react-dom@17/umd/react-dom.production.min.js',
      'https://unpkg.com/react@17/umd/react.production.min.js',
    ],
    name: 'warden',
  })
);

compiler.watch({}, (_, __) => console.log(_, __?.toString({ colors: true })));
