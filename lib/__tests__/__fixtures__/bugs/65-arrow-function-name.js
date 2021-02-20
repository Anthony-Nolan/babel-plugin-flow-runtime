"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.annotated = exports.expected = exports.input = void 0;
var input = "\nconst fn = (a: string): string => a;\n";
exports.input = input;
var expected = "\nimport t from \"flow-runtime\";\nconst fn = a => {\n  let _aType = t.string();\n  const _returnType = t.return(t.string());\n  t.param(\"a\", _aType).assert(a);\n  return _returnType.assert(a);\n};\n";
exports.expected = expected;
var annotated = "\nimport t from \"flow-runtime\";\nconst fn = t.annotate(\n  function fn(a) {\n    return a;\n  },\n  t.function(t.param(\"a\", t.string()), t.return(t.string()))\n);\n";
exports.annotated = annotated;