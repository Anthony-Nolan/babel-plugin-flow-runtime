"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  type A = Symbol;\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  const A = t.type(\"A\", t.symbol());\n";
exports.expected = expected;