"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  type B = A;\n  type A = string;\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  const B = t.type(\"B\", t.tdz(() => A, \"A\"));\n  const A = t.type(\"A\", t.string());\n";
exports.expected = expected;