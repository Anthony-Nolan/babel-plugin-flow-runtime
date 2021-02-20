"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.annotated = exports.expected = exports.input = void 0;
var input = "\n/* @flow */\nfunction* oneTwoThree (): Iterable<number> {\n  yield 1;\n}\n";
exports.input = input;
var expected = "\nimport t from \"flow-runtime\";\n/* @flow */\n\nfunction* oneTwoThree() {\n  const _yieldType = t.number();\n  yield _yieldType.assert(1);\n}\n\n";
exports.expected = expected;
var annotated = "\nimport t from \"flow-runtime\";\n/* @flow */\n\nfunction* oneTwoThree() {\n  yield 1;\n}\n\nt.annotate(oneTwoThree, t.function(t.return(t.ref(\"Iterable\", t.number()))));\n";
exports.annotated = annotated;