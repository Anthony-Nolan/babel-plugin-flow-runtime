"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  declare type Demo = string;\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n\n  t.declare(t.type(\"Demo\", t.string()));\n";
exports.expected = expected;