"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  import t from \"flow-runtime\";\n  const pattern = t.pattern(\n    (...input: string[]) => true,\n    (...input: boolean[]) => false,\n    _ => _\n  );\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n\n  const pattern = (..._arg0) => {\n    if (t.array(t.string()).accepts(_arg0)) {\n      return true;\n    }\n    else if (t.array(t.boolean()).accepts(_arg0)) {\n      return false;\n    }\n    else {\n      return _arg0[0];\n    }\n  };\n";
exports.expected = expected;