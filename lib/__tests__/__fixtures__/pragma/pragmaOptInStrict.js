"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n/* @flow */\n/* @flow-runtime */\n\nconst Demo = 123;\n";
exports.input = input;
var expected = "\nimport t from \"flow-runtime\";\n/* @flow */\n/* @flow-runtime */\n\nconst Demo = 123;\n";
exports.expected = expected;