"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = collectProgramOptions;

var t = _interopRequireWildcard(require("@babel/types"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

/**
 * Collects the program level pragmas which override the plugin options.
 * Pragmas are specified via comments like `-runtime ignore`
 * and `@flow-runtime warn, annotate`.
 * Collected options are applied to the conversion context, if the program
 * has a `@flow-runtime ignore` comment or doesn't use any flow types this function
 * will return `false`, if any other flow-runtime pragmas are present or the file
 * does use flow, the function returns `true`.
 */
function collectProgramOptions(context, node) {
  if (t.isFile(node)) {
    node = node.program;
  }

  var options = collectOptionsFromPragma(context, node);

  if (!options) {
    // if we have no options, check to see whether flow is in use in this file
    return !context.optInOnly && hasFlowNodes(node);
  } else if (options.ignore) {
    return false;
  }

  if (options.assert) {
    context.shouldAssert = true;
  }

  if (options.warn) {
    context.shouldWarn = true;
  }

  if (options.annotate) {
    context.shouldAnnotate = true;
  }

  return true;
}

var HAS_FLOW = new Error('This is not really an error, we use it to bail out of t.traverseFast() early when we find a flow element, and yes, that is ugly.');

function collectOptionsFromPragma(context, node) {
  var comments = node.leadingComments || node.comments;

  if (comments && comments.length > 0) {
    var _iterator = _createForOfIteratorHelper(comments),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var comment = _step.value;
        var matches = /^\s*@flow-runtime\s*([\w,\s]+)?$/i.exec(comment.value);

        if (matches) {
          var raw = matches[1] && matches[1].trim() || '';
          var keys = raw.split(/[\s,]+/g);

          if (!raw || keys.length === 0) {
            // we have a comment but no options, this is strict by default.
            return {
              assert: true,
              annotate: true
            };
          } else {
            var options = {};

            var _iterator2 = _createForOfIteratorHelper(keys),
                _step2;

            try {
              for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                var key = _step2.value;
                options[key] = true;
              }
            } catch (err) {
              _iterator2.e(err);
            } finally {
              _iterator2.f();
            }

            return options;
          }
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }

  if (t.isProgram(node)) {
    var body = node.body;

    if (body.length > 0) {
      return collectOptionsFromPragma(context, body[0]);
    }
  }
}

function hasFlowNodes(node) {
  try {
    throwIfFlow(node);
    t.traverseFast(node, throwIfFlow);
    return false;
  } catch (e) {
    if (e === HAS_FLOW) {
      return true;
    } else {
      throw e;
    }
  }
}

function throwIfFlow(node) {
  if (t.isFlow(node)) {
    throw HAS_FLOW;
  } else if (t.isImportDeclaration(node) && (node.importKind === 'type' || node.importKind === 'typeof')) {
    throw HAS_FLOW;
  } else if (t.isExportDeclaration(node) && (node.exportKind === 'type' || node.exportKind === 'typeof')) {
    throw HAS_FLOW;
  }
}