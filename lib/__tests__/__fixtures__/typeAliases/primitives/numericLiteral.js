"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  type Demo = 123;\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  const Demo = t.type(\"Demo\", t.number(123));\n";
exports.expected = expected;