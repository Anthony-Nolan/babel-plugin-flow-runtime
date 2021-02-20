"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  function *demo (): Generator<string, boolean, number> {\n    const result = yield* \"hello world\";\n    return result > 2 ? true : false;\n  }\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  function* demo() {\n    const _yieldType = t.string();\n    const _nextType = t.number();\n    const _returnType = t.return(t.boolean());\n    const result = _nextType.assert(yield* t.wrapIterator(_yieldType)(\"hello world\"));\n    return _returnType.assert(result > 2 ? true : false);\n  }\n\n";
exports.expected = expected;