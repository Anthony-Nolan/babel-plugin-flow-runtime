"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combined = exports.annotated = exports.expected = exports.input = void 0;
var input = "\n  class Parent {\n    x: number = 0;\n  }\n\n  class Child extends Parent {\n    y: number = 0;\n  }\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n\n  class Parent {\n    @t.decorate(t.number())\n    x = 0;\n  }\n\n  class Child extends Parent {\n    @t.decorate(t.number())\n    y = 0;\n  }\n";
exports.expected = expected;
var annotated = "\n  import t from \"flow-runtime\";\n\n  @t.annotate(t.class(\n    \"Parent\",\n    t.property(\"x\", t.number())\n  ))\n  class Parent {\n    x = 0;\n  }\n\n  @t.annotate(t.class(\n    \"Child\",\n    t.extends(Parent),\n    t.property(\"y\", t.number())\n  ))\n  class Child extends Parent {\n    y = 0;\n  }\n";
exports.annotated = annotated;
var combined = "\n  import t from \"flow-runtime\";\n\n  @t.annotate(t.class(\n    \"Parent\",\n    t.property(\"x\", t.number())\n  ))\n  class Parent {\n    @t.decorate(t.number())\n    x = 0;\n  }\n\n  @t.annotate(t.class(\n    \"Child\",\n    t.extends(Parent),\n    t.property(\"y\", t.number())\n  ))\n  class Child extends Parent {\n    @t.decorate(t.number())\n    y = 0;\n  }\n";
exports.combined = combined;