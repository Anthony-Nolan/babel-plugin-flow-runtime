"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customRuntime = exports.expected = exports.input = void 0;
var input = "\n  export type Demo = string;\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  export const Demo = t.type(\"Demo\", t.string());\n";
exports.expected = expected;
var customRuntime = "\n  import t from \"./custom-flow-runtime\";\n  export const Demo = t.type(\"Demo\", t.string());\n";
exports.customRuntime = customRuntime;