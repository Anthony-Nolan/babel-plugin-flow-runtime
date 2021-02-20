"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  type Demo = {\n    (input: string): string;\n  };\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  const Demo = t.type(\"Demo\", t.object(\n    t.callProperty(t.function(\n      t.param(\"input\", t.string()),\n      t.return(t.string())\n    ))\n  ));\n";
exports.expected = expected;