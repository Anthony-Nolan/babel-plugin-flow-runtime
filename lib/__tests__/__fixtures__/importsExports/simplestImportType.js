"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.customRuntime = exports.expected = exports.input = void 0;
var input = "\n  import type { Demo } from './simplestExportType';\n\n  type Local = number;\n\n  type Item = {\n    local: Local;\n    value: Demo;\n  };\n";
exports.input = input;
var expected = "\n  import { Demo as _Demo } from './simplestExportType';\n  import t from \"flow-runtime\";\n  const Demo = t.tdz(() => _Demo);\n\n  const Local = t.type(\"Local\", t.number());\n\n  const Item = t.type(\"Item\", t.object(\n    t.property(\"local\", Local),\n    t.property(\"value\", t.ref(Demo))\n  ));\n";
exports.expected = expected;
var customRuntime = "\n  import { Demo as _Demo } from './simplestExportType';\n  import t from \"./custom-flow-runtime\";\n  const Demo = t.tdz(() => _Demo);\n\n  const Local = t.type(\"Local\", t.number());\n\n  const Item = t.type(\"Item\", t.object(\n    t.property(\"local\", Local),\n    t.property(\"value\", t.ref(Demo))\n  ));\n";
exports.customRuntime = customRuntime;