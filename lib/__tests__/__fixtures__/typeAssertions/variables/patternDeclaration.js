"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  const [hello, world]: [string, string] = [\"hello\", \"world\"];\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  const [hello, world] = t.tuple(t.string(), t.string()).assert([\"hello\", \"world\"]);\n";
exports.expected = expected;