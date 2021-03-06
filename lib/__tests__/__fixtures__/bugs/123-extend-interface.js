"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  interface B {\n    (): string;\n  }\n\n  interface A extends B {\n    prop: number;\n  }\n\n  let a: A;\n\n  let val = function() {};\n  val.prop = 1;\n\n  // assignment 1\n  a = val;\n\n  // assignment 2\n  a = { prop: 1 };\n\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  const B = t.type(\"B\", t.object(t.callProperty(t.function(t.return(t.string())))));\n  const A = t.type(\"A\", t.spread(B, t.object(t.property(\"prop\", t.number()))));\n\n\n  let _aType = A,\n      a;\n\n  let val = function () {};\n  val.prop = 1;\n\n  // assignment 1\n  a = _aType.assert(val);\n\n  // assignment 2\n  a = _aType.assert({ prop: 1 });\n";
exports.expected = expected;