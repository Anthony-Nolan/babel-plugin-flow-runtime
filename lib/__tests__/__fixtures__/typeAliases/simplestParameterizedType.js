"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  type Demo<T> = T;\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  const Demo = t.type(\"Demo\", Demo => {\n    const T = Demo.typeParameter(\"T\");\n    return T;\n  });\n";
exports.expected = expected;