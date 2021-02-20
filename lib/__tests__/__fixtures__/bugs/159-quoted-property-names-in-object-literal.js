"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  type A = {\"a\": string, \"b\": string};\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  const A = t.type(\"A\", t.object(t.property(\"a\", t.string()), t.property(\"b\", t.string())));\n";
exports.expected = expected;