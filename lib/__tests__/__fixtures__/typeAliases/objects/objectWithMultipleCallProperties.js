"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  type Demo = {\n    (foo: string): string;\n    (bar: boolean): boolean;\n  };\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  const Demo = t.type(\"Demo\", t.object(\n    t.callProperty(t.function(\n      t.param(\"foo\", t.string()),\n      t.return(t.string())\n    )),\n    t.callProperty(t.function(\n      t.param(\"bar\", t.boolean()),\n      t.return(t.boolean())\n    ))\n  ));\n";
exports.expected = expected;