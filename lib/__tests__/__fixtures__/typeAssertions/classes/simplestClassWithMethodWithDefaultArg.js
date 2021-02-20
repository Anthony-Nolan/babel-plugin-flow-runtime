"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combined = exports.annotated = exports.expected = exports.input = void 0;
var input = "\n  class Point {\n    x: number = 0;\n    y: number = 0;\n\n    z (a: string = \"123\"): string {\n      return a;\n    }\n\n  }\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n\n  class Point {\n    @t.decorate(t.number())\n    x = 0;\n\n    @t.decorate(t.number())\n    y = 0;\n\n    z(a = \"123\") {\n      let _aType = t.string();\n      const _returnType = t.return(t.string());\n      t.param(\"a\", _aType).assert(a);\n      return _returnType.assert(a);\n    }\n  }\n";
exports.expected = expected;
var annotated = "\n  import t from \"flow-runtime\";\n\n  @t.annotate(t.class(\n    \"Point\",\n    t.property(\"x\", t.number()),\n    t.property(\"y\", t.number()),\n    t.method(\"z\",\n      t.param(\"a\", t.string()),\n      t.return(t.string())\n    )\n  ))\n  class Point {\n    x = 0;\n    y = 0;\n\n    z(a = \"123\") {\n      return a;\n    }\n  }\n";
exports.annotated = annotated;
var combined = "\n  import t from \"flow-runtime\";\n\n  @t.annotate(t.class(\n    \"Point\",\n    t.property(\"x\", t.number()),\n    t.property(\"y\", t.number()),\n    t.method(\"z\",\n      t.param(\"a\", t.string()),\n      t.return(t.string())\n    )\n  ))\n  class Point {\n    @t.decorate(t.number())\n    x = 0;\n\n    @t.decorate(t.number())\n    y = 0;\n\n    z(a = \"123\") {\n      let _aType = t.string();\n      const _returnType = t.return(t.string());\n      t.param(\"a\", _aType).assert(a);\n      return _returnType.assert(a);\n    }\n  }\n";
exports.combined = combined;