"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transform;

var _traverse = _interopRequireDefault(require("@babel/traverse"));

var _collectProgramOptions = _interopRequireDefault(require("./collectProgramOptions"));

var _firstPassVisitors = _interopRequireDefault(require("./firstPassVisitors"));

var _patternMatchVisitors = _interopRequireDefault(require("./patternMatchVisitors"));

var _annotateVisitors = _interopRequireDefault(require("./annotateVisitors"));

var _preTransformVisitors = _interopRequireDefault(require("./preTransformVisitors"));

var _transformVisitors = _interopRequireDefault(require("./transformVisitors"));

var _createConversionContext = _interopRequireDefault(require("./createConversionContext"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transform(input) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var scope = arguments.length > 2 ? arguments[2] : undefined;
  var state = arguments.length > 3 ? arguments[3] : undefined;
  var parentPath = arguments.length > 4 ? arguments[4] : undefined;
  var context = (0, _createConversionContext.default)(options);

  if (!(0, _collectProgramOptions.default)(context, input)) {
    return input;
  }

  (0, _traverse.default)(input, (0, _firstPassVisitors.default)(context), scope, state, parentPath);
  (0, _traverse.default)(input, (0, _patternMatchVisitors.default)(context), scope, state, parentPath);

  if (context.shouldAnnotate) {
    context.isAnnotating = true;
    (0, _traverse.default)(input, (0, _annotateVisitors.default)(context), scope, state, parentPath);
    context.isAnnotating = false;
    context.visited = new WeakSet();
  }

  (0, _traverse.default)(input, (0, _preTransformVisitors.default)(context), scope, state, parentPath);
  (0, _traverse.default)(input, (0, _transformVisitors.default)(context), scope, state, parentPath);
  return input;
}