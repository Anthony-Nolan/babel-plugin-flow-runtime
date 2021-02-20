"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  const demo: string = \"hello world\";\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  const demo = t.string().assert(\"hello world\");\n";
exports.expected = expected;