"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  import t from \"flow-runtime\";\n  const pattern = t.pattern(\n    (input: string) => input,\n    (...input: boolean[]) => input,\n    (foo: string, ...extra: number[]) => extra.length > 1,\n    _ => _\n  );\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n\n  const pattern = (..._arg0) => {\n    const _extra = _arg0.slice(1);\n    if (typeof _arg0[0] === \"string\") {\n      return _arg0[0];\n    }\n    else if (t.array(t.boolean()).accepts(_arg0)) {\n      return _arg0;\n    }\n    else if (typeof _arg0[0] === \"string\" && t.array(t.number()).accepts(_extra)) {\n      return _extra.length > 1;\n    }\n    else {\n      return _arg0[0];\n    }\n  };\n";
exports.expected = expected;