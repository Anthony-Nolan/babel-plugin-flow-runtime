"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  type Demo = <T: string> () => T;\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  const Demo = t.type(\"Demo\", t.function(_fn => {\n    const T = _fn.typeParameter(\"T\", t.string());\n    return [t.return(T)];\n  }));\n";
exports.expected = expected;