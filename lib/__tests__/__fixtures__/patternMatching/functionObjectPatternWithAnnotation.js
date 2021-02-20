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
var input = "\n  class Model {\n    static init({foo}: {foo: string}) {\n\n    }\n  }\n";
exports.input = input;
var expected = "\n\"use strict\";\n var _flowRuntime = _interopRequireDefault(require(\"flow-runtime\"));\n function _interopRequireDefault(obj) {\nreturn obj && obj.__esModule ? obj : {\ndefault: obj\n};\n\n} @_flowRuntime.default.annotate(_flowRuntime.default.class(\"Model\", _flowRuntime.default.staticMethod(\"init\", _flowRuntime.default.param(\"_arg\", _flowRuntime.default.object(_flowRuntime.default.property(\"foo\", _flowRuntime.default.string())))))) class Model {\nstatic init(_arg) {\nlet {\nfoo\n} = _arg;\n\n}\n}\n";
exports.expected = expected;