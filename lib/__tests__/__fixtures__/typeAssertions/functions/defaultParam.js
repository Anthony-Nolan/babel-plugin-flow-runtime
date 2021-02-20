"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combined = exports.annotated = exports.expected = exports.input = void 0;
var input = "\n  const demo = (input: string = \"Hello World\"): string => input;\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  const demo = (input = \"Hello World\") => {\n    let _inputType = t.string();\n    const _returnType = t.return(t.string());\n    t.param(\"input\", _inputType).assert(input);\n    return _returnType.assert(input);\n  };\n";
exports.expected = expected;
var annotated = "\n  import t from \"flow-runtime\";\n  const demo = t.annotate(\n    function demo(input = \"Hello World\") {\n      return input;\n    },\n    t.function(\n      t.param(\"input\", t.string()),\n      t.return(t.string())\n    )\n  );\n";
exports.annotated = annotated;
var combined = "\n  import t from \"flow-runtime\";\n  const demo = t.annotate(\n    function demo(input = \"Hello World\") {\n      let _inputType = t.string();\n      const _returnType = t.return(t.string());\n      t.param(\"input\", _inputType).assert(input);\n      return _returnType.assert(input);\n    },\n    t.function(\n      t.param(\"input\", t.string()),\n      t.return(t.string())\n    )\n  );\n";
exports.combined = combined;