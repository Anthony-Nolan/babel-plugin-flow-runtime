"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  interface A {\n    \"a\"(): number;\n    \"b\"(): string;\n  }\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  const A = t.type(\"A\", t.object(t.property(\"a\", t.function(t.return(t.number()))), t.property(\"b\", t.function(t.return(t.string())))));\n";
exports.expected = expected;