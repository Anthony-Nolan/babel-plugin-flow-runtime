"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  try {\n    throw new TypeError('Intentional');\n  }\n  catch (e) {\n    (e: TypeError);\n    console.log(e);\n  }\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  try {\n    throw new TypeError('Intentional');\n  }\n  catch (e) {\n    if (!t.ref(\"TypeError\").accepts(e)) {\n      throw e;\n    }\n    console.log(e);\n  }\n";
exports.expected = expected;