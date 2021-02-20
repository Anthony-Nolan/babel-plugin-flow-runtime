"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promisify = promisify;
exports.fs = void 0;

var _fs2 = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = Object.keys(_fs2.default).reduce(function (memo, key) {
  memo["".concat(key, "Async")] = promisify(_fs2.default[key]);
  return memo;
}, {});
exports.fs = fs;

function promisify(fn) {
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new Promise(function (resolve, reject) {
      function callback(err, data) {
        if (err) return reject(err);
        resolve(data);
      }

      fn.apply(void 0, [].concat(args, [callback]));
    });
  };
}