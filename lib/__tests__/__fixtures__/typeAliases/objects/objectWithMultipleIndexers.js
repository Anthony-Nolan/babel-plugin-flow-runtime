"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  type Demo = {\n    [key: string]: number;\n    [index: number]: boolean;\n  };\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  const Demo = t.type(\"Demo\", t.object(\n    t.indexer(\"key\", t.string(), t.number()),\n    t.indexer(\"index\", t.number(), t.boolean())\n  ));\n";
exports.expected = expected;