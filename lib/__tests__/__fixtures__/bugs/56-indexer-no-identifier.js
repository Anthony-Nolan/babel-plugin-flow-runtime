"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\ntype Animal = {};\n\ntype AnimalID = string;\n\ntype AnimalMap = {\n  [AnimalID]: Animal;\n};\n";
exports.input = input;
var expected = "\nimport t from \"flow-runtime\";\n\nconst Animal = t.type(\"Animal\", t.object());\nconst AnimalID = t.type(\"AnimalID\", t.string());\n\nconst AnimalMap = t.type(\"AnimalMap\", t.object(\n  t.indexer(\"key\", AnimalID, Animal)\n));\n";
exports.expected = expected;