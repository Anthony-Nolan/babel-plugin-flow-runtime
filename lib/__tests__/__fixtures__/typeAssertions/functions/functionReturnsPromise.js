"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  const demo = (): Promise<string> => Promise.resolve(\"hello world\");\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  const demo = () => {\n    const _returnType = t.return(t.string());\n    return Promise.resolve(\"hello world\").then(_arg => _returnType.assert(_arg));\n  };\n\n";
exports.expected = expected;