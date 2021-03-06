"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combined = exports.annotated = exports.expected = exports.input = void 0;
var input = "\n  interface XPoint<T> {\n    x: T;\n  }\n  interface YPoint<T> {\n    y: T;\n  }\n  class Point implements XPoint<number>, YPoint<number> {\n    x: number = 0;\n    y: number = 0;\n  }\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n\n  const XPoint = t.type(\"XPoint\", XPoint => {\n    const T = XPoint.typeParameter(\"T\");\n    return t.object(\n      t.property(\"x\", T)\n    );\n  });\n\n  const YPoint = t.type(\"YPoint\", YPoint => {\n    const T = YPoint.typeParameter(\"T\");\n    return t.object(\n      t.property(\"y\", T)\n    );\n  });\n\n  class Point {\n    @t.decorate(t.number())\n    x = 0;\n\n    @t.decorate(t.number())\n    y = 0;\n\n    constructor() {\n      t.ref(XPoint, t.number()).assert(this);\n      t.ref(YPoint, t.number()).assert(this);\n    }\n  }\n";
exports.expected = expected;
var annotated = "\n  import t from \"flow-runtime\";\n\n  const XPoint = t.type(\"XPoint\", XPoint => {\n    const T = XPoint.typeParameter(\"T\");\n    return t.object(\n      t.property(\"x\", T)\n    );\n  });\n\n  const YPoint = t.type(\"YPoint\", YPoint => {\n    const T = YPoint.typeParameter(\"T\");\n    return t.object(\n      t.property(\"y\", T)\n    );\n  });\n\n  @t.annotate(t.class(\n    \"Point\",\n    t.property(\"x\", t.number()),\n    t.property(\"y\", t.number())\n  ))\n  class Point {\n    x = 0;\n    y = 0;\n  }\n";
exports.annotated = annotated;
var combined = "\n  import t from \"flow-runtime\";\n\n  const XPoint = t.type(\"XPoint\", XPoint => {\n    const T = XPoint.typeParameter(\"T\");\n    return t.object(\n      t.property(\"x\", T)\n    );\n  });\n\n  const YPoint = t.type(\"YPoint\", YPoint => {\n    const T = YPoint.typeParameter(\"T\");\n    return t.object(\n      t.property(\"y\", T)\n    );\n  });\n\n  @t.annotate(t.class(\n    \"Point\",\n    t.property(\"x\", t.number()),\n    t.property(\"y\", t.number())\n  ))\n  class Point {\n    @t.decorate(t.number())\n    x = 0;\n\n    @t.decorate(t.number())\n    y = 0;\n\n    constructor() {\n      t.ref(XPoint, t.number()).assert(this);\n      t.ref(YPoint, t.number()).assert(this);\n    }\n  }\n";
exports.combined = combined;