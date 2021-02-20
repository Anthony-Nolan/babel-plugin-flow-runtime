"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combined = exports.annotated = exports.expected = exports.input = void 0;
var input = "\nexport default function test(id: number): number {\n  return id;\n}\n";
exports.input = input;
var expected = "\nimport t from \"flow-runtime\";\nexport default function test(id) {\n  let _idType = t.number();\n  const _returnType = t.return(t.number());\n  t.param(\"id\", _idType).assert(id);\n  return _returnType.assert(id);\n}\n";
exports.expected = expected;
var annotated = "\nimport t from \"flow-runtime\";\nexport default function test(id) {\n  return id;\n}\nt.annotate(\n  test,\n  t.function(\n    t.param(\"id\", t.number()),\n    t.return(t.number())\n  )\n);\n";
exports.annotated = annotated;
var combined = "\nimport t from \"flow-runtime\";\nexport default function test(id) {\n  let _idType = t.number();\n  const _returnType = t.return(t.number());\n  t.param(\"id\", _idType).assert(id);\n  return _returnType.assert(id);\n}\nt.annotate(\n  test,\n  t.function(\n    t.param(\"id\", t.number()),\n    t.return(t.number())\n  )\n);\n";
exports.combined = combined;