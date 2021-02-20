"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combined = exports.annotated = exports.expected = exports.input = void 0;
var input = "\n  function *demo (): Generator<string, void, void> {\n    yield* \"hello world\";\n  }\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  function* demo() {\n    const _yieldType = t.string();\n    const _nextType = t.void();\n    const _returnType = t.return(t.void());\n    yield* t.wrapIterator(_yieldType)(\"hello world\");\n  }\n";
exports.expected = expected;
var annotated = "\n  import t from \"flow-runtime\";\n  function* demo() {\n    yield* \"hello world\";\n  }\n  t.annotate(demo, t.function(\n    t.return(t.ref(\"Generator\", t.string(), t.void(), t.void()))\n  ));\n";
exports.annotated = annotated;
var combined = "\n  import t from \"flow-runtime\";\n  function* demo() {\n    const _yieldType = t.string();\n    const _nextType = t.void();\n    const _returnType = t.return(t.void());\n    yield* t.wrapIterator(_yieldType)(\"hello world\");\n  }\n  t.annotate(demo, t.function(\n    t.return(t.ref(\"Generator\", t.string(), t.void(), t.void()))\n  ));\n";
exports.combined = combined;