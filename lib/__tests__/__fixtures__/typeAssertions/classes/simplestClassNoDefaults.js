"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  class Point {\n    x: number;\n    y: number;\n  }\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n\n  class Point {\n    @t.decorate(t.number())\n    x;\n\n    @t.decorate(t.number())\n    y;\n  }\n";
exports.expected = expected;