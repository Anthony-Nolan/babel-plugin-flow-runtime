"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  type Demo = (a: number, ...b: string[]) => string;\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  const Demo = t.type(\"Demo\", t.function(\n    t.param(\"a\", t.number()),\n    t.rest(\"b\", t.array(t.string())),\n    t.return(t.string())\n  ));\n";
exports.expected = expected;