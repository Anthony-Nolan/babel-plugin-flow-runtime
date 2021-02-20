"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customRuntime = exports.expected = exports.input = void 0;
var input = "\n  import types from \"flow-runtime\";\n  type Demo = number;\n";
exports.input = input;
var expected = "\n  import types from \"flow-runtime\";\n  const Demo = types.type(\"Demo\", types.number());\n";
exports.expected = expected;
var customRuntime = "\n  import types from \"flow-runtime\";\n  const Demo = types.type(\"Demo\", types.number());\n";
exports.customRuntime = customRuntime;