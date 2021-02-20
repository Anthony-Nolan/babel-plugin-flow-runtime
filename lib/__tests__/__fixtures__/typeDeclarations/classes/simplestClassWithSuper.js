"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  declare class Thing {\n    name: string;\n  }\n\n  declare class Place extends Thing {\n    url: string;\n  }\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n\n  t.declare(\n    t.class(\n      \"Thing\",\n      t.object(\n        t.property(\"name\", t.string())\n      )\n    )\n  );\n\n  t.declare(\n    t.class(\n      \"Place\",\n      t.object(\n        t.property(\"url\", t.string())\n      ),\n      t.extends(\"Thing\")\n    )\n  );\n";
exports.expected = expected;