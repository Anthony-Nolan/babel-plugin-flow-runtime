"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  type Demo = <T> (a: T) => T;\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  const Demo = t.type(\"Demo\", t.function(_fn => {\n    const T = _fn.typeParameter(\"T\");\n    return [\n      t.param(\"a\", T),\n      t.return(T)\n    ];\n  }));\n";
exports.expected = expected;