"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  const demo = (a: string, {foo}: {foo: string}): string => a + foo;\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  const demo = (a, _arg) => {\n    let _aType = t.string();\n    const _returnType = t.return(t.string());\n    t.param(\"a\", _aType).assert(a);\n    let { foo }  = t.object(\n      t.property(\"foo\", t.string())\n    ).assert(_arg);\n    return _returnType.assert(a + foo);\n  };\n\n";
exports.expected = expected;