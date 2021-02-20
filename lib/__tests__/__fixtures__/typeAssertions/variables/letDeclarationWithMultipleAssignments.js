"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  let demo: string = \"qux\";\n  demo = \"foo bar\";\n  demo = \"hello world\";\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  let _demoType = t.string(), demo = _demoType.assert(\"qux\");\n  demo = _demoType.assert(\"foo bar\");\n  demo = _demoType.assert(\"hello world\");\n";
exports.expected = expected;