"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combined = exports.annotated = exports.expected = exports.input = void 0;
var input = "\n  class A {\n    b(): this {\n      return this;\n    }\n  }\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n\n  class A {\n    b() {\n      const _returnType = t.return(t.this(this));\n      return _returnType.assert(this);\n    }\n  }\n";
exports.expected = expected;
var annotated = "\n  import t from \"flow-runtime\";\n\n  @t.annotate(t.class(\n    \"A\",\n    t.method(\"b\", t.return(t.this()))\n  ))\n  class A {\n    b() {\n      return this;\n    }\n  }\n";
exports.annotated = annotated;
var combined = "\n  import t from \"flow-runtime\";\n\n  @t.annotate(t.class(\n    \"A\",\n    t.method(\"b\", t.return(t.this()))\n  ))\n  class A {\n    b() {\n      const _returnType = t.return(t.this(this));\n      return _returnType.assert(this);\n    }\n  }\n";
exports.combined = combined;