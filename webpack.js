/*
 * Copyright 2021 Marek Kobida
 */

const webpack = require('webpack');

const compiler = webpack(require('./webpack/common')({ name: 'warden' }));

compiler.watch({}, (_, __) => console.log(_, __?.toString({ colors: true })));
