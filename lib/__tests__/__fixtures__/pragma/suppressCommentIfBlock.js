"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n/* @flow */\n\ntype Demo = false;\n\n// $FlowFixMe\nif (true) {\n  console.log((false: true));\n}\nelse {\n  console.log((true: Demo));\n}\n";
exports.input = input;
var expected = "\nimport t from \"flow-runtime\";\n/* @flow */\n\nconst Demo = t.type(\"Demo\", t.boolean(false));\n\n// $FlowFixMe\nif (true) {\n  console.log(false);\n}\nelse {\n  console.log(true);\n}\n";
exports.expected = expected;