"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  import type {Demo} from './simplestExport';\n";
exports.input = input;
var expected = "\n  import { Demo as _Demo } from './simplestExport';\n  import t from \"flow-runtime\";\n  const Demo = t.tdz(() => _Demo);\n";
exports.expected = expected;