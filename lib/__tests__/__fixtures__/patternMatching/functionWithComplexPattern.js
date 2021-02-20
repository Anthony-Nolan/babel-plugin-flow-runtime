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
var input = "\n  class Model {\n    static init({a: [b, {d, e}], f: {g: [h, ...k], i}, ...j}: {a: [number, {d: string, e: number}], f: {g: [string], i: number}}) {\n\n    }\n  }\n";
exports.input = input;
var expected = "\n\"use strict\";\n var _flowRuntime = _interopRequireDefault(require(\"flow-runtime\"));\n function _interopRequireDefault(obj) {\nreturn obj && obj.__esModule ? obj : {\ndefault: obj\n};\n\n} @_flowRuntime.default.annotate(_flowRuntime.default.class(\"Model\", _flowRuntime.default.staticMethod(\"init\", _flowRuntime.default.param(\"_arg\", _flowRuntime.default.object(_flowRuntime.default.property(\"a\", _flowRuntime.default.tuple(_flowRuntime.default.number(), _flowRuntime.default.object(_flowRuntime.default.property(\"d\", _flowRuntime.default.string()), _flowRuntime.default.property(\"e\", _flowRuntime.default.number())))), _flowRuntime.default.property(\"f\", _flowRuntime.default.object(_flowRuntime.default.property(\"g\", _flowRuntime.default.tuple(_flowRuntime.default.string())), _flowRuntime.default.property(\"i\", _flowRuntime.default.number())))))))) class Model {\nstatic init(_arg) {\nlet {\na: [b, {\nd, e\n}], f: {\ng: [h, ...k], i\n}, ...j\n} = _arg;\n}\n}\n";
exports.expected = expected;