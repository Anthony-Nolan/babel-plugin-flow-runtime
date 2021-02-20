"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  const a = {\n    b: 123\n  };\n  (a.b: number);\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  const a = {\n    b: 123\n  };\n  t.number().assert(a.b);\n";
exports.expected = expected;