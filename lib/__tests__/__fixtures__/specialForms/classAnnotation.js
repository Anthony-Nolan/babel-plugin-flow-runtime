"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combined = exports.annotated = exports.expected = exports.input = void 0;
var input = "\n  class User {}\n\n  function demo (model: Class<User>) {\n\n  }\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  class User {}\n\n  function demo(model) {\n    let _modelType = t.Class(t.ref(User));\n    t.param(\"model\", _modelType).assert(model);\n  }\n";
exports.expected = expected;
var annotated = "\n  import t from \"flow-runtime\";\n  @t.annotate(t.class(\"User\"))\n  class User {}\n\n  function demo(model) {}\n\n  t.annotate(\n    demo,\n    t.function(\n      t.param(\"model\", t.Class(t.ref(User)))\n    )\n  );\n";
exports.annotated = annotated;
var combined = "\n  import t from \"flow-runtime\";\n  @t.annotate(t.class(\"User\"))\n  class User {}\n\n  function demo(model) {\n    let _modelType = t.Class(t.ref(User));\n    t.param(\"model\", _modelType).assert(model);\n  }\n\n  t.annotate(\n    demo,\n    t.function(\n      t.param(\"model\", t.Class(t.ref(User)))\n    )\n  );\n";
exports.combined = combined;