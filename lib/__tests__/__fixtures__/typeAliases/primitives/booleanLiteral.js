"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  type Demo = true;\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  const Demo = t.type(\"Demo\", t.boolean(true));\n";
exports.expected = expected;