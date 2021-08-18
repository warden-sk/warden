/*
 * Copyright 2021 Marek Kobida
 */

import common from './webpack/common';
import webpack from 'webpack';

const compiler = webpack(common({ name: 'warden' }));

compiler.watch({}, (_, __) => console.log(_, __?.toString({ colors: true })));
