"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  declare module \"foo-bar\" {\n    declare var foo: string;\n  }\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n\n  t.declare(t.module(\"foo-bar\", t => {\n    t.declare(t.var(\"foo\", t.string()));\n  }));\n";
exports.expected = expected;