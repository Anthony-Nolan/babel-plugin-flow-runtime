"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var fixturesDir = _path.default.join(__dirname, '__fixtures__');

var INCLUDE_PATTERN = process.env.TEST_FILTER ? new RegExp(process.env.TEST_FILTER) : null;

function findFiles(dirname, filenames) {
  var _iterator = _createForOfIteratorHelper(_fs.default.readdirSync(dirname)),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var filename = _step.value;

      var qualified = _path.default.join(dirname, filename);

      if (/\.js$/.test(filename)) {
        filenames.push(qualified.slice(fixturesDir.length + 1, -3));
      } else {
        var stat = _fs.default.statSync(qualified);

        if (stat.isDirectory()) {
          findFiles(qualified, filenames);
        }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return filenames;
}

function filterIncluded(filename) {
  if (INCLUDE_PATTERN) {
    return INCLUDE_PATTERN.test(filename);
  } else {
    return true;
  }
}

var files = findFiles(fixturesDir, []);
var fixtures = new Map(files.filter(filterIncluded).map(function (filename) {
  // Ignore
  return [filename, require("./__fixtures__/".concat(filename))];
}));
var _default = fixtures;
exports.default = _default;