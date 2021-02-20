"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\nexport default (): string => \"hello world\";\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n\n  export default (() => {\n    const _returnType = t.return(t.string());\n    return _returnType.assert(\"hello world\");\n  });\n";
exports.expected = expected;