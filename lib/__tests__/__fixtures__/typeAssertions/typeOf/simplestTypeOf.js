"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n const a = 123 ;\n const b: typeof a = 456;\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  const a = 123;\n  const b = t.typeOf(a).assert(456);\n";
exports.expected = expected;