"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n let a = 123;\n (a: number);\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  let a = 123;\n  let _aType = t.number();\n  _aType.assert(a);\n";
exports.expected = expected;