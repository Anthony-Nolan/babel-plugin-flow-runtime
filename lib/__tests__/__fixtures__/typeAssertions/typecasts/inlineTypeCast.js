"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  const a = {\n    b: 123\n  };\n  function go() {\n    return 456;\n  }\n  a.b = a.b + (go(): number);\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  const a = {\n    b: 123\n  };\n  function go() {\n    return 456;\n  }\n  a.b = a.b + t.number().assert(go());\n";
exports.expected = expected;