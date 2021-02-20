"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loadFlowConfig;

var _flowConfigParser = _interopRequireDefault(require("flow-config-parser"));

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadFlowConfig() {
  var startDir = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : process.cwd();
  var dirname = startDir;

  while (dirname) {
    try {
      var filename = _path.default.join(dirname, '.flowconfig');

      var stat = _fs.default.statSync(filename);

      if (stat.isFile()) {
        var content = _fs.default.readFileSync(filename, 'utf8');

        return (0, _flowConfigParser.default)(content);
      }
    } catch (e) {// do nothing
    }

    var next = _path.default.dirname(dirname);

    if (next === dirname) {
      return false;
    } else {
      dirname = next;
    }
  }
}