"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  type B = {a: A};\n  type A = {b: B};\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  const B = t.type(\"B\", t.object(\n    t.property(\"a\", t.tdz(() => A, \"A\"))\n  ));\n  const A = t.type(\"A\", t.object(\n    t.property(\"b\", B)\n  ));\n";
exports.expected = expected;