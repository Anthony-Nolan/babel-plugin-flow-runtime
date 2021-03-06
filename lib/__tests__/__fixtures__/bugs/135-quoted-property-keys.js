"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\ntype ODataAST = {\n  '$path'?: $path,\n  '$select'?: $select,\n  '$expand'?: $expand,\n  '$filter'?: $filter,\n  '$orderby'?: $orderby,\n  '$callback'?: string,\n  '$format'?: string,\n  '$search'?: string,\n  '$count'?: boolean,\n  '$skip'?: number,\n  '$top'?: number\n}\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  const ODataAST = t.type(\"ODataAST\", t.object(\n    t.property(\"$path\", t.ref(\"$path\"), true), \n    t.property(\"$select\", t.ref(\"$select\"), true), \n    t.property(\"$expand\", t.ref(\"$expand\"), true), \n    t.property(\"$filter\", t.ref(\"$filter\"), true), \n    t.property(\"$orderby\", t.ref(\"$orderby\"), true), \n    t.property(\"$callback\", t.string(), true), \n    t.property(\"$format\", t.string(), true), \n    t.property(\"$search\", t.string(), true), \n    t.property(\"$count\", t.boolean(), true), \n    t.property(\"$skip\", t.number(), true), \n    t.property(\"$top\", t.number(), true))\n  );\n";
exports.expected = expected;