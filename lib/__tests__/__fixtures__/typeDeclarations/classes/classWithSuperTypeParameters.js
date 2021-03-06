"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  declare class Thing<T> {\n    id: T;\n    name: string;\n  }\n\n  declare class Place extends Thing<string> {\n    url: string;\n  }\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n\n  t.declare(t.class(\"Thing\", _Thing => {\n    const T = _Thing.typeParameter(\"T\");\n    return [\n      t.object(\n        t.property(\"id\", T),\n        t.property(\"name\", t.string())\n      )\n    ];\n  }));\n\n  t.declare(t.class(\n    \"Place\",\n    t.object(\n      t.property(\"url\", t.string())\n    ),\n    t.extends(\"Thing\", t.string())\n  ));\n";
exports.expected = expected;