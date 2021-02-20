"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customRuntime = exports.expected = exports.input = void 0;
var input = "\n  import rt, { reify } from \"flow-runtime\";\n  import type { Type } from \"flow-runtime\";\n  type Demo = number;\n  console.log((reify: Type<Demo>));\n";
exports.input = input;
var expected = "\n  import rt, { reify } from \"flow-runtime\";\n  import { Type as _Type } from \"flow-runtime\";\n  const Type = rt.tdz(() => _Type);\n  const Demo = rt.type(\"Demo\", rt.number());\n  console.log(Demo);\n";
exports.expected = expected;
var customRuntime = "\n  import rt, { reify } from \"flow-runtime\";\n  import { Type as _Type } from \"flow-runtime\";\n  const Type = rt.tdz(() => _Type);\n  const Demo = rt.type(\"Demo\", rt.number());\n  console.log(Demo);\n";
exports.customRuntime = customRuntime;