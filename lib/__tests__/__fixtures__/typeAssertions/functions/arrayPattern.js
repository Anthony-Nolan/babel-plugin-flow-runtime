"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combined = exports.annotated = exports.expected = exports.input = void 0;
var input = "\n  const demo = ([foo]: string[]): string => foo;\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  const demo = _arg => {\n    const _returnType = t.return(t.string());\n    let [foo] = t.array(t.string()).assert(_arg);\n    return _returnType.assert(foo);\n  };\n";
exports.expected = expected;
var annotated = "\n  import t from \"flow-runtime\";\n  const demo = t.annotate(\n    function demo(_arg) {\n      let [foo] = _arg;\n      return foo;\n    },\n    t.function(\n      t.param(\"_arg\", t.array(t.string())),\n      t.return(t.string())\n    )\n  );\n";
exports.annotated = annotated;
var combined = "\n  import t from \"flow-runtime\";\n  const demo = t.annotate(\n    function demo(_arg) {\n      const _returnType = t.return(t.string());\n      let [foo] = t.array(t.string()).assert(_arg);\n      return _returnType.assert(foo);\n    },\n    t.function(\n      t.param(\"_arg\", t.array(t.string())),\n      t.return(t.string())\n    )\n  );\n";
exports.combined = combined;