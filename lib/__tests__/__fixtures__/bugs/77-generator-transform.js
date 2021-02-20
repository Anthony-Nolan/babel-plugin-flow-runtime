"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  function* someGenerator(): any {\n    yield 12;\n    yield 42;\n  }\n\n  for (const it of someGenerator()) {\n    console.log(it);\n  }\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  function* someGenerator() {\n    const _returnType2 = t.return(t.any());\n    yield 12;\n    yield 42;\n  }\n\n  for (const it of someGenerator()) {\n    console.log(it);\n  }\n";
exports.expected = expected;