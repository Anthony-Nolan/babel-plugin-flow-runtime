"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\ntype V = {\n  a: 123,\n  b: true,\n  c: null\n}\n\ntype C = $Values<V>;\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  const V = t.type(\"V\", t.object(t.property(\"a\", t.number(123)), t.property(\"b\", t.boolean(true)), t.property(\"c\", t.null())));\n  const C = t.type(\"C\", t.$values(V));\n";
exports.expected = expected;