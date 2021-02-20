"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combined = exports.annotated = exports.expected = exports.input = void 0;
var input = "\ntype Options = {};\n\nexport const makeApiCallSaga = (opts: Options) => {\n  return function* apiCallWatcherSaga (): Generator<*, void, *> {\n  };\n};\n";
exports.input = input;
var expected = "\nimport t from \"flow-runtime\";\nconst Options = t.type(\"Options\", t.object());\n\nexport const makeApiCallSaga = opts => {\n  let _optsType = Options;\n  t.param(\"opts\", _optsType).assert(opts);\n  return function* apiCallWatcherSaga() {\n    const _yieldType = t.existential();\n    const _nextType = t.existential();\n    const _returnType = t.return(t.void());\n  };\n};\n";
exports.expected = expected;
var annotated = "\nimport t from \"flow-runtime\";\nconst Options = t.type(\"Options\", t.object());\n\nexport const makeApiCallSaga = t.annotate(\n  function makeApiCallSaga(opts) {\n    return t.annotate(\n      function* apiCallWatcherSaga() {},\n      t.function(t.return(t.ref(\"Generator\", t.existential(), t.void(), t.existential())))\n    );\n  },\n  t.function(t.param(\"opts\", Options))\n);\n";
exports.annotated = annotated;
var combined = "\nimport t from \"flow-runtime\";\nconst Options = t.type(\"Options\", t.object());\n\nexport const makeApiCallSaga = t.annotate(\n  function makeApiCallSaga(opts) {\n    let _optsType = Options;\n    t.param(\"opts\", _optsType).assert(opts);\n    return t.annotate(\n      function* apiCallWatcherSaga() {\n        const _yieldType = t.existential();\n        const _nextType = t.existential();\n        const _returnType = t.return(t.void());\n      },\n      t.function(t.return(t.ref(\"Generator\", t.existential(), t.void(), t.existential())))\n    );\n  },\n  t.function(t.param(\"opts\", Options))\n);\n";
exports.combined = combined;