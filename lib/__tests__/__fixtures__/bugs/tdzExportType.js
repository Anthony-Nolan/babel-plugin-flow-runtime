"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combined = exports.annotated = exports.expected = exports.input = void 0;
var input = "\n  function demo (): Thing {\n    return \"ok\";\n  }\n\n  export type Thing = string;\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  function demo() {\n    const _returnType = t.return(t.tdz(() => Thing, \"Thing\"));\n    return _returnType.assert(\"ok\");\n  }\n\n  export const Thing = t.type(\"Thing\", t.string());\n";
exports.expected = expected;
var annotated = "\n  import t from \"flow-runtime\";\n  function demo() {\n    return \"ok\";\n  }\n  t.annotate(\n    demo,\n    t.function(t.return(t.tdz(() => Thing, \"Thing\")))\n  );\n\n  export const Thing = t.type(\"Thing\", t.string());\n";
exports.annotated = annotated;
var combined = "\n  import t from \"flow-runtime\";\n  function demo() {\n    const _returnType = t.return(t.tdz(() => Thing, \"Thing\"));\n    return _returnType.assert(\"ok\");\n  }\n  t.annotate(\n    demo,\n    t.function(t.return(t.tdz(() => Thing, \"Thing\")))\n  );\n\n  export const Thing = t.type(\"Thing\", t.string());\n";
exports.combined = combined;