"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  const demo = <T> (input: T): T => input;\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  const demo = input => {\n    const T = t.typeParameter(\"T\");\n    let _inputType = t.flowInto(T);\n    const _returnType = t.return(T);\n    t.param(\"input\", _inputType).assert(input);\n    return _returnType.assert(input);\n  };\n\n";
exports.expected = expected;