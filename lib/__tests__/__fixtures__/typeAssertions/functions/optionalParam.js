"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  const demo = (input?: string): ? string => input;\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  const demo = (input?) => {\n    let _inputType = t.string();\n    const _returnType = t.return(t.nullable(t.string()));\n    t.param(\"input\", _inputType, true).assert(input);\n    return _returnType.assert(input);\n  };\n\n";
exports.expected = expected;