"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  declare module \"Demo\" {\n    declare module.exports: any;\n  }\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n\n  t.declare(t.module(\"Demo\", t => {\n    t.moduleExports(t.any());\n  }));\n";
exports.expected = expected;