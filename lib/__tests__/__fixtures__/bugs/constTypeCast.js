"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  for (const prop: any of []) {\n    (prop: any);\n  }\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  let _propType = t.any();\n  for (const prop of []) {\n    _propType = t.any();\n    _propType.assert(prop);\n  }\n";
exports.expected = expected;