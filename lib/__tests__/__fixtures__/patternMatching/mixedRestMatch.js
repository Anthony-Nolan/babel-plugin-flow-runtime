"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  import t from \"flow-runtime\";\n  console.log(t.match(\"foo\", [\n    (input: string) => input,\n    (...input: boolean[]) => input,\n    _ => _\n  ]));\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n\n  console.log(((..._arg0) => {\n    if (typeof _arg0[0] === \"string\") {\n      return _arg0[0];\n    }\n    else if (t.array(t.boolean()).accepts(_arg0)) {\n      return _arg0;\n    }\n    else {\n      return _arg0[0];\n    }\n  })(\"foo\"));\n";
exports.expected = expected;