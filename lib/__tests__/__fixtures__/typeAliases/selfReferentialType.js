"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  type Demo = {\n    next: ? Demo;\n  };\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  const Demo = t.type(\"Demo\", Demo => {\n    return t.object(\n      t.property(\"next\", t.nullable(Demo))\n    );\n  });\n";
exports.expected = expected;