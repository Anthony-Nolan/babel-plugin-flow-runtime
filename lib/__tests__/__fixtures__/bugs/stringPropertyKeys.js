"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.annotated = exports.expected = exports.input = void 0;
var input = "\n/* @flow */\n\nclass Demo {\n  'test': boolean;\n}\n\n";
exports.input = input;
var expected = "\nimport t from \"flow-runtime\";\n/* @flow */\n\nclass Demo {\n  @t.decorate(t.boolean())\n  'test';\n}\n\n";
exports.expected = expected;
var annotated = "\nimport t from \"flow-runtime\";\n/* @flow */\n\n@t.annotate(t.class(\"Demo\", t.property(\"test\", t.boolean())))\nclass Demo {\n  'test';\n}\n\n";
exports.annotated = annotated;