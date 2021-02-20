"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n/* @flow */\n\ntype Demo = false;\n\nclass Thing {\n  // $FlowFixMe\n  a: string;\n\n  b: Demo;\n}\n";
exports.input = input;
var expected = "\nimport t from \"flow-runtime\";\n/* @flow */\n\nconst Demo = t.type(\"Demo\", t.boolean(false));\n\nclass Thing {\n  // $FlowFixMe\n  a;\n\n  @t.decorate(Demo)\n  b;\n}\n";
exports.expected = expected;