"use strict";
/*
 * Copyright 2021 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Html_1 = __importDefault(require("./Html"));
const path_1 = __importDefault(require("path"));
const INPUT_FILE_PATH = './private/index.tsx';
const OUTPUT_FILE_NAME = 'index.js';
const OUTPUT_FILE_PATH = './public';
function default_1({ assets, name }) {
    return {
        entry: INPUT_FILE_PATH,
        module: {
            rules: [
                {
                    test: /\.css$/,
                    type: 'asset/resource',
                },
                {
                    exclude: /node_modules/,
                    loader: path_1.default.resolve(__dirname, './babel'),
                    test: /\.tsx?$/,
                },
            ],
        },
        name,
        output: {
            assetModuleFilename: '[name][ext]',
            filename: OUTPUT_FILE_NAME,
            path: path_1.default.resolve(OUTPUT_FILE_PATH),
            publicPath: '',
        },
        plugins: [new Html_1.default(assets)],
        resolve: {
            extensions: ['.js', '.json', '.ts', '.tsx'],
        },
    };
}
exports.default = default_1;
