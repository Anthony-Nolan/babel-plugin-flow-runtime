"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combined = exports.annotated = exports.expected = exports.input = void 0;
var input = "\n  class Point {\n    x: number = 0;\n    y: number = 0;\n  }\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n\n  class Point {\n    @t.decorate(t.number())\n    x = 0;\n\n    @t.decorate(t.number())\n    y = 0;\n  }\n";
exports.expected = expected;
var annotated = "\n  import t from \"flow-runtime\";\n\n  @t.annotate(t.class(\n    \"Point\",\n    t.property(\"x\", t.number()),\n    t.property(\"y\", t.number())\n  ))\n  class Point {\n    x = 0;\n    y = 0;\n  }\n";
exports.annotated = annotated;
var combined = "\n  import t from \"flow-runtime\";\n\n  @t.annotate(t.class(\n    \"Point\",\n    t.property(\"x\", t.number()),\n    t.property(\"y\", t.number())\n  ))\n  class Point {\n    @t.decorate(t.number())\n    x = 0;\n\n    @t.decorate(t.number())\n    y = 0;\n  }\n";
exports.combined = combined;