"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  var demo: string;\n  demo = \"foo bar\";\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  var _demoType = t.string(), demo;\n  demo = _demoType.assert(\"foo bar\");\n";
exports.expected = expected;