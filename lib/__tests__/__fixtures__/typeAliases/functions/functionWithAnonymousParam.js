"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  type Demo = (string) => string;\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  const Demo = t.type(\"Demo\", t.function(\n    t.param(\"_arg0\", t.string()),\n    t.return(t.string())\n  ));\n";
exports.expected = expected;