"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  export type Demo = number;\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n\n  export const Demo = t.type(\"Demo\", t.number());\n";
exports.expected = expected;