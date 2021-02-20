"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = exports.integration = void 0;
var integration = {
  presets: [["@babel/preset-env", {
    "targets": {
      "node": "current"
    }
  }], '@babel/preset-flow'],
  plugins: ['babel-plugin-flow-runtime']
};
exports.integration = integration;
var input = "\n// @flow\n// @flow-runtime\nimport { type Foo } from './Foo'\n";
exports.input = input;
var expected = "\n\"use strict\";\nvar _Foo2 = require(\"./Foo\");\nvar _flowRuntime = _interopRequireDefault(require(\"flow-runtime\"));\nfunction _interopRequireDefault(obj) {\n  return obj && obj.__esModule ? obj : {\n    default: obj\n  };\n}\n\n// -runtime\nconst Foo = _flowRuntime.default.tdz(() => _Foo2.Foo);\n";
exports.expected = expected;