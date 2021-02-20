"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = patternMatchVisitors;

var t = _interopRequireWildcard(require("@babel/types"));

var _generator = _interopRequireDefault(require("@babel/generator"));

var _convert = _interopRequireDefault(require("./convert"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function patternMatchVisitors(context) {
  var isPatternCall = t.buildMatchMemberExpression("".concat(context.libraryId, ".pattern"));
  var isMatchCall = t.buildMatchMemberExpression("".concat(context.libraryId, ".match"));
  return {
    CallExpression: function CallExpression(path) {
      var callee = path.get('callee');

      if (isPatternCall(callee.node)) {
        transformPatternCall(context, path);
      } else if (isMatchCall(callee.node)) {
        transformMatchCall(context, path);
      }
    }
  };
}

;
/**
 * Transform a call to `t.match()` into an optimized version if possible.
 */

function transformMatchCall(context, path) {
  // the first arguments are the input, the last should be an array of clauses
  var args = path.get('arguments');

  if (args.length < 2) {
    // must have at least two arguments, bail out
    return;
  }

  var tail = args.pop();

  if (!tail.isArrayExpression()) {
    // last arg must be an array of clauses, bail out
    return;
  }

  var clauses = tail.get('elements');

  if (!clauses.length) {
    // empty array of clauses, bail out.
    return;
  }

  var collected = collectClauses(context, clauses);

  if (!collected) {
    return;
  }

  var _collected = _slicedToArray(collected, 3),
      collectedParams = _collected[0],
      collectedBlocks = _collected[1],
      errorClause = _collected[2];

  var pattern = makePattern(context, path, collectedParams, collectedBlocks, errorClause);

  if (pattern) {
    context.replacePath(path, t.callExpression(pattern, args.map(function (arg) {
      return arg.node;
    })));
  }
}
/**
 * Transform a call to `t.pattern()` into an inline function (if possible)
 */


function transformPatternCall(context, path) {
  var args = path.get('arguments');
  var collected = collectClauses(context, args);

  if (!collected) {
    return;
  }

  var _collected2 = _slicedToArray(collected, 3),
      collectedParams = _collected2[0],
      collectedBlocks = _collected2[1],
      errorClause = _collected2[2];

  var pattern = makePattern(context, path, collectedParams, collectedBlocks, errorClause);

  if (pattern) {
    context.replacePath(path, pattern);
  }
}

function collectClauses(context, args) {
  // Ensure that every argument is a function, and build a collection of params.
  var collectedParams = [];
  var collectedBlocks = [];
  var hasDefaultClause = false;

  for (var i = 0; i < args.length; i++) {
    var arg = args[i];

    if (!arg.isFunction()) {
      // argument is some other kind of expression, bail out to runtime.
      return;
    }

    if (arg.has('typeParameters')) {
      // too complicated to inline, bail out.
      return;
    }

    var simplified = getSimplifiedParams(arg);

    if (!simplified) {
      // found unsupported parameter type or no args, bail out.
      return;
    }

    var isAnnotated = simplified.some(function (item) {
      return item.typeAnnotation;
    });

    if (!isAnnotated) {
      if (i !== args.length - 1) {
        // unannotated function not in the last position.
        // this is almost certainly an error but let runtime deal with it.
        return;
      } else {
        hasDefaultClause = true;
      }
    }

    collectedParams.push(simplified);
    var body = arg.get('body');
    collectedBlocks.push(body);
  }

  var errorClause = hasDefaultClause ? null : makeNoMatchErrorBlock(context, collectedParams);
  return [collectedParams, collectedBlocks, errorClause];
}

function stringifyType(input) {
  if (!input) {
    return 'any';
  } else if (input.node) {
    input = input.node;
  }

  if (t.isTypeAnnotation(input)) {
    input = input.typeAnnotation;
  }

  var _generate = (0, _generator.default)(input),
      code = _generate.code;

  return code;
}

function makeNoMatchErrorBlock(context, collectedParams) {
  var expected = collectedParams.map(function (params) {
    var strings = params.map(function (param) {
      return stringifyType(param.typeAnnotation);
    });

    if (strings.length > 1) {
      return "(".concat(strings.join(', '), ")");
    } else {
      return strings[0] || 'empty';
    }
  });
  var message = "Value did not match any of the candidates, expected:\n\n    ".concat(expected.join('\nor:\n    '), "\n");
  var body = [t.variableDeclaration('const', [t.variableDeclarator(t.identifier('error'), t.newExpression(t.identifier('TypeError'), [t.stringLiteral(message)]))]), t.expressionStatement(t.assignmentExpression('=', t.memberExpression(t.identifier('error'), t.identifier('name')), t.stringLiteral('RuntimeTypeError'))), t.throwStatement(t.identifier('error'))];
  return t.blockStatement(body);
}

function makePattern(context, path, collectedParams, collectedBlocks) {
  var errorClause = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  var names = [];
  var sliceNames = {};
  var fnPrelude = [];
  var isRest = collectRestIndexes(collectedParams);
  var firstRest = 0; // tracks the index of the first rest element we've seen

  for (; firstRest < isRest.length; firstRest++) {
    if (isRest[firstRest]) {
      break;
    }
  }

  var tests = new Array(collectedBlocks.length);
  var blockPreludes = new Array(collectedBlocks.length);

  for (var index = 0; index < collectedParams.length; index++) {
    var params = collectedParams[index];
    var block = collectedBlocks[index];
    var blockPrelude = [];
    blockPreludes[index] = blockPrelude;
    var test = [];
    tests[index] = test;

    var _loop = function _loop(i) {
      var param = params[i];
      var name = param.name;

      if (i >= names.length) {
        name = "_arg".concat(i);
        names.push(name);
      } else {
        name = names[i];
      }

      var replacement = void 0;
      var useBinding = false;

      if (i === firstRest) {
        if (param.isRest) {
          replacement = t.identifier(name);
        } else {
          // take the first element of the param.
          replacement = t.memberExpression(t.identifier(name), t.NumericLiteral(0), true);
          useBinding = true;
        }
      } else if (i > firstRest) {
        // this param appears somewhere after the first rest param
        var relativeIndex = i - firstRest;

        if (param.isRest) {
          // this is rest too so we need to slice the existing rest param
          // we only want to do this once though so we keep a cache
          if (sliceNames[i]) {
            // we've already sliced this.
            replacement = t.identifier(sliceNames[i]);
            name = sliceNames[i];
          } else {
            // take a slice of the rest element and store it in a new var.
            var uid = path.scope.generateUid(param.name);
            sliceNames[i] = uid;
            name = uid;
            replacement = t.identifier(uid);
            fnPrelude.push(t.variableDeclaration('const', [t.variableDeclarator(t.identifier(uid), t.callExpression(t.memberExpression(t.identifier(names[firstRest]), t.identifier('slice')), [t.NumericLiteral(relativeIndex)]))]));
          }
        } else {
          // take the nth member of the rest element.
          replacement = t.memberExpression(t.identifier(names[firstRest]), t.NumericLiteral(relativeIndex), true);
          useBinding = true;
        }
      } else {
        // this is just a normal param
        replacement = t.identifier(name);
      }

      if (param.typeAnnotation) {
        test.push(inlineTest(context, param.typeAnnotation, replacement));
      }

      if (param.isPattern) {
        blockPrelude.push(t.variableDeclaration('let', [t.variableDeclarator(param.path.node, replacement)]));
      } else if (useBinding) {
        var binding = block.scope.getBinding(param.name);

        var _iterator = _createForOfIteratorHelper(binding.referencePaths),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var refPath = _step.value;

            if (refPath.isIdentifier()) {
              refPath.replaceWith(replacement);
            } else {
              // we've already replaced this, go looking for the reference.
              refPath.traverse({
                Identifier: function Identifier(id) {
                  if (id.node.name === param.name) {
                    id.replaceWith(replacement);
                  }
                }
              });
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      } else {
        block.scope.rename(param.name, name);
      }
    };

    for (var i = 0; i < params.length; i++) {
      _loop(i);
    }
  }

  var normalizedParams = [];

  for (var _i2 = 0; _i2 < names.length; _i2++) {
    var name = names[_i2];

    if (isRest[_i2]) {
      normalizedParams.push(t.restElement(t.identifier(name)));
      break;
    } else {
      normalizedParams.push(t.identifier(name));
    }
  }

  return t.arrowFunctionExpression(normalizedParams, t.blockStatement(fnPrelude.concat(tests.reduceRight(function (last, test, index) {
    var block = collectedBlocks[index];
    var blockPrelude = blockPreludes[index];
    var condition = test.reduce(function (prev, condition) {
      if (prev === null) {
        return condition;
      } else {
        return t.logicalExpression('&&', prev, condition);
      }
    }, null);

    if (last === null) {
      if (condition === null) {
        return prependBlockStatement(block.node, blockPrelude);
      } else {
        return t.ifStatement(condition, prependBlockStatement(block.node, blockPrelude));
      }
    } else {
      return t.ifStatement(condition, prependBlockStatement(block.node, blockPrelude), last);
    }
  }, errorClause))));
}

function collectRestIndexes(collectedParams) {
  var indexes = [];

  for (var index = 0; index < collectedParams.length; index++) {
    var params = collectedParams[index];

    for (var i = 0; i < params.length; i++) {
      var param = params[i];

      if (i >= indexes.length) {
        indexes.push(param.isRest);
      } else if (param.isRest) {
        indexes[i] = true;
      }
    }
  }

  return indexes;
}

function inlineTest(context, typeAnnotation, replacement) {
  if (typeAnnotation.isTypeAnnotation()) {
    typeAnnotation = typeAnnotation.get('typeAnnotation');
  }

  if (typeAnnotation.isStringTypeAnnotation()) {
    return inlineTypeOf('string', typeAnnotation, replacement);
  } else if (typeAnnotation.isNumberTypeAnnotation()) {
    return inlineTypeOf('number', typeAnnotation, replacement);
  } else if (typeAnnotation.isBooleanTypeAnnotation()) {
    return inlineTypeOf('boolean', typeAnnotation, replacement);
  } else if (typeAnnotation.isVoidTypeAnnotation()) {
    return inlineTypeOf('undefined', typeAnnotation, replacement);
  } else if (typeAnnotation.isStringLiteralTypeAnnotation()) {
    return t.binaryExpression('===', replacement, t.stringLiteral(typeAnnotation.node.value));
  } else if (typeAnnotation.isNumberLiteralTypeAnnotation()) {
    return t.binaryExpression('===', replacement, t.NumericLiteral(typeAnnotation.node.value));
  } else if (typeAnnotation.isBooleanLiteralTypeAnnotation()) {
    return t.binaryExpression('===', replacement, t.booleanLiteral(typeAnnotation.node.value));
  } else if (typeAnnotation.isNullLiteralTypeAnnotation()) {
    return t.binaryExpression('===', replacement, t.nullLiteral());
  } else if (typeAnnotation.isUnionTypeAnnotation()) {
    return typeAnnotation.get('types').reduce(function (last, item) {
      if (last === null) {
        return inlineTest(context, item, replacement);
      } else {
        return t.logicalExpression('||', last, inlineTest(context, item, replacement));
      }
    }, null);
  } else if (typeAnnotation.isIntersectionTypeAnnotation()) {
    return typeAnnotation.get('types').reduce(function (last, item) {
      if (last === null) {
        return inlineTest(context, item, replacement);
      } else {
        return t.logicalExpression('&&', last, inlineTest(context, item, replacement));
      }
    }, null);
  } else if (typeAnnotation.isNullableTypeAnnotation()) {
    return t.logicalExpression('||', t.binaryExpression('==', replacement, t.nullLiteral()), inlineTest(context, typeAnnotation.get('typeAnnotation'), replacement));
  }

  return t.callExpression(t.memberExpression((0, _convert.default)(context, typeAnnotation), t.identifier('accepts')), [replacement]);
}

function inlineTypeOf(typeOf, typeAnnotation, replacement) {
  return t.binaryExpression('===', t.unaryExpression('typeof', replacement), t.stringLiteral(typeOf));
}

function prependBlockStatement(node, prelude) {
  var body = t.isBlockStatement(node) ? node.body : [t.returnStatement(node)];
  return t.blockStatement([].concat(_toConsumableArray(prelude), _toConsumableArray(body)));
}

function getSimplifiedParams(path) {
  var simplified = [];

  var _iterator2 = _createForOfIteratorHelper(path.get('params')),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var param = _step2.value;

      if (param.isIdentifier()) {
        simplified.push({
          path: param,
          name: param.node.name,
          isRest: false,
          isPattern: false,
          default: null,
          typeAnnotation: param.has('typeAnnotation') ? param.get('typeAnnotation') : null
        });
      } else if (param.isAssignmentPattern()) {
        var left = param.get('left');

        if (left.isIdentifier()) {
          simplified.push({
            path: left,
            name: left.node.name,
            isRest: false,
            isPattern: false,
            default: path.get('right'),
            typeAnnotation: left.has('typeAnnotation') ? left.get('typeAnnotation') : null
          });
        } else if (left.isArrayPattern() || left.isObjectPattern()) {
          simplified.push({
            path: left,
            name: "_arg".concat(param.key),
            isRest: false,
            isPattern: true,
            default: path.get('right'),
            typeAnnotation: left.has('typeAnnotation') ? left.get('typeAnnotation') : null
          });
        } else {
          // should never happen.
          return false;
        }
      } else if (param.isRestElement()) {
        var id = param.get('argument');

        if (!id.isIdentifier()) {
          // should never happen
          return false;
        }

        simplified.push({
          path: id,
          name: id.node.name,
          isRest: true,
          isPattern: false,
          default: null,
          typeAnnotation: param.has('typeAnnotation') ? param.get('typeAnnotation') : null
        });
      } else if (param.isArrayPattern() || param.isObjectPattern()) {
        simplified.push({
          path: param,
          name: "_arg".concat(param.key),
          isRest: false,
          isPattern: true,
          default: path.get('right'),
          typeAnnotation: param.has('typeAnnotation') ? param.get('typeAnnotation') : null
        });
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return simplified.length === 0 ? false : simplified;
}