"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  import t from \"flow-runtime\";\n  const pattern = t.pattern(\n    ({input}: Object) => input.toUpperCase(),\n    _ => _\n  );\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n\n  const pattern = _arg0 => {\n    if (t.object().accepts(_arg0)) {\n      let { input } = _arg0;\n      return input.toUpperCase();\n    }\n    else {\n      return _arg0;\n    }\n  };\n";
exports.expected = expected;