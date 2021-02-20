"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  export type {Foo} from './c';\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  export {\n    Foo\n  } from './c';\n";
exports.expected = expected;