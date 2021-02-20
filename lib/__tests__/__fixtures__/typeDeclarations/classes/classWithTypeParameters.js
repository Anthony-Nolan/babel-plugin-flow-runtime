"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  declare class Thing<T: string> {\n    name: T;\n  }\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n\n  t.declare(t.class(\"Thing\", _Thing => {\n    const T = _Thing.typeParameter(\"T\", t.string());\n    return [\n      t.object(\n        t.property(\"name\", T)\n      )\n    ];\n  }));\n";
exports.expected = expected;