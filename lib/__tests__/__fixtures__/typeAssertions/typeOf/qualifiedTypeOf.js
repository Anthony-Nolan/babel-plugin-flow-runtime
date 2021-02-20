"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n const a = {b: 123} ;\n const c: typeof a.b = 456;\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  const a = { b: 123 };\n  const c = t.typeOf(a.b).assert(456);\n";
exports.expected = expected;