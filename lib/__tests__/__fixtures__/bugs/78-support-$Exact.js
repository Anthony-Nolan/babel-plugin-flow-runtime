"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\ntype Demo = $Exact<{\n  a: 123\n}>\n";
exports.input = input;
var expected = "\nimport t from \"flow-runtime\";\nconst Demo = t.type(\"Demo\", t.$exact(\n  t.object(\n    t.property(\"a\", t.number(123))\n  )\n));\n";
exports.expected = expected;