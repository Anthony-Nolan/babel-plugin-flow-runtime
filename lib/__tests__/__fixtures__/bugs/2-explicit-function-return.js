"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\nfunction testFunction() : string {\n  return;\n}\n";
exports.input = input;
var expected = "\nimport t from \"flow-runtime\";\n\nfunction testFunction() {\n  const _returnType = t.return(t.string());\n  return _returnType.assert();\n}\n";
exports.expected = expected;