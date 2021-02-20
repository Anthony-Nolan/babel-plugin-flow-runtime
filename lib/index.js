"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = babelPluginFlowRuntime;
Object.defineProperty(exports, "transform", {
  enumerable: true,
  get: function get() {
    return _transform.default;
  }
});
Object.defineProperty(exports, "findIdentifiers", {
  enumerable: true,
  get: function get() {
    return _findIdentifiers.default;
  }
});
Object.defineProperty(exports, "getTypeParameters", {
  enumerable: true,
  get: function get() {
    return _getTypeParameters.default;
  }
});

var _createConversionContext = _interopRequireDefault(require("./createConversionContext"));

var _collectProgramOptions = _interopRequireDefault(require("./collectProgramOptions"));

var _attachImport = _interopRequireDefault(require("./attachImport"));

var _firstPassVisitors = _interopRequireDefault(require("./firstPassVisitors"));

var _annotateVisitors = _interopRequireDefault(require("./annotateVisitors"));

var _patternMatchVisitors = _interopRequireDefault(require("./patternMatchVisitors"));

var _preTransformVisitors = _interopRequireDefault(require("./preTransformVisitors"));

var _transformVisitors = _interopRequireDefault(require("./transformVisitors"));

var _transform = _interopRequireDefault(require("./transform"));

var _findIdentifiers = _interopRequireDefault(require("./findIdentifiers"));

var _getTypeParameters = _interopRequireDefault(require("./getTypeParameters"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function babelPluginFlowRuntime() {
  return {
    visitor: {
      Program: function Program(path, state) {
        var opts = state.opts;
        var context = (0, _createConversionContext.default)(opts || {});

        if (!(0, _collectProgramOptions.default)(context, path.node)) {
          return;
        }

        path.traverse((0, _firstPassVisitors.default)(context));

        if (context.shouldImport) {
          // We need to do this here because the Program visitor
          // in firstPassVisitors will never receive a node as
          // we're already travsersing a Program.
          (0, _attachImport.default)(context, path);
        }

        path.traverse((0, _patternMatchVisitors.default)(context));

        if (context.shouldAnnotate) {
          context.isAnnotating = true;
          path.traverse((0, _annotateVisitors.default)(context));
          context.isAnnotating = false;
          context.visited = new WeakSet();
        }

        path.traverse((0, _preTransformVisitors.default)(context));
        path.traverse((0, _transformVisitors.default)(context));
      }
    }
  };
}