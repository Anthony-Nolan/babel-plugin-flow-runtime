"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\nexport default class {\n  a: string\n}\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n\n  export default class {\n    @t.decorate(t.string())\n    a;\n  }\n";
exports.expected = expected;