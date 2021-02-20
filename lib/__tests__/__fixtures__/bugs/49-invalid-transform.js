"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\ntype Demo = {\n  name: string,\n  type: string\n};\n\nconst task = 123;\n\nexport { task };\n";
exports.input = input;
var expected = "\nimport t from \"flow-runtime\";\nconst Demo = t.type(\"Demo\", t.object(\n  t.property(\"name\", t.string()),\n  t.property(\"type\", t.string())\n));\nconst task = 123;\n\nexport { task };\n";
exports.expected = expected;