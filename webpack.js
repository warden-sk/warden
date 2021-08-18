"use strict";
/*
 * Copyright 2021 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __importDefault(require("./webpack/common"));
const webpack_1 = __importDefault(require("webpack"));
const compiler = webpack_1.default(common_1.default({ name: 'warden' }));
compiler.watch({}, (_, __) => console.log(_, __?.toString({ colors: true })));
