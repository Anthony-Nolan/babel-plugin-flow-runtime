"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n/* @flow */\n/* @flow-runtime warn */\n\nclass A {\n  x: boolean = false;\n}\n";
exports.input = input;
var expected = "\nimport t from \"flow-runtime\";\n/* @flow */\n/* @flow-runtime warn */\n\nclass A {\n  @t.decorate(t.boolean(), false)\n  x = false;\n}\n";
exports.expected = expected;