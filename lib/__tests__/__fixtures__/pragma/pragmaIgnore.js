"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n/* @flow */\n/* @flow-runtime ignore */\n\nconst Demo = 123;\n";
exports.input = input;
var expected = "\n/* @flow */\n/* @flow-runtime ignore */\n\nconst Demo = 123;\n";
exports.expected = expected;