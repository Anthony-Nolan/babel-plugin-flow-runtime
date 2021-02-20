"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n declare var a: {b: number};\n const c: typeof a.b = 456;\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  t.declare(t.var(\n    \"a\",\n    t.object(\n      t.property(\"b\", t.number())\n    )\n  ));\n  const c = t.get(\"a\", \"b\").assert(456);\n";
exports.expected = expected;