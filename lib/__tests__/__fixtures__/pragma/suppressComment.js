"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n/* @flow */\n\nconst demo = (): string => \"hello world\";\n\n// $FlowFixMe\nconst demo2 = (): string => \"hello world\";\n";
exports.input = input;
var expected = "\nimport t from \"flow-runtime\";\n/* @flow */\n\nconst demo = () => {\n  const _returnType = t.return(t.string());\n  return _returnType.assert(\"hello world\");\n};\n\n// $FlowFixMe\nconst demo2 = () => {\n  return \"hello world\";\n};\n";
exports.expected = expected;