"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customRuntime = exports.expected = exports.input = void 0;
var input = "\n  import t from \"@babel/types\";\n  type Demo = number;\n";
exports.input = input;
var expected = "\n  import t from \"@babel/types\";\n  import _t from \"flow-runtime\";\n  const Demo = _t.type(\"Demo\", _t.number());\n";
exports.expected = expected;
var customRuntime = "\n  import t from \"@babel/types\";\n  import _t from \"./custom-flow-runtime\";\n  const Demo = _t.type(\"Demo\", _t.number());\n";
exports.customRuntime = customRuntime;