"use strict";
/*
 * Copyright 2021 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_dom_1 = __importDefault(require("react-dom"));
react_dom_1.default.render(react_1.default.createElement("div", { className: "container" },
    react_1.default.createElement("div", null,
        react_1.default.createElement("h1", { className: "name" }, "warden.sk"),
        react_1.default.createElement("p", { className: "description" }, "\u010Coskoro v\u00E1m predstav\u00EDm str\u00E1nku v \u00FAplne novom kab\u00E1te."))), document.getElementById('index'));
