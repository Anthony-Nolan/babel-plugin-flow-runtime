"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = firstPassVisitors;

var t = _interopRequireWildcard(require("@babel/types"));

var _attachImport = _interopRequireDefault(require("./attachImport"));

var _getTypeParameters = _interopRequireDefault(require("./getTypeParameters"));

var _findIdentifiers = _interopRequireDefault(require("./findIdentifiers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function firstPassVisitors(context) {
  return {
    Program: {
      exit: function exit(path) {
        if (context.shouldImport) {
          (0, _attachImport.default)(context, path);
        }
      }
    },
    GenericTypeAnnotation: function GenericTypeAnnotation(path) {
      var id = path.get('id');
      path.scope.setData("seenReference:".concat(id.node.name), true);
    },
    Identifier: function Identifier(path) {
      var parentPath = path.parentPath;

      if (parentPath.isFlow()) {
        // This identifier might point to a type that has not been resolved yet
        if (parentPath.isTypeAlias() || parentPath.isInterfaceDeclaration()) {
          if (path.key === 'id') {
            return; // this is part of the declaration name
          }
        }

        if (context.hasTDZIssue(path.node.name, path)) {
          context.markTDZIssue(path.node);
        }

        return;
      } else if (!context.shouldImport) {
        return;
      }

      if (path.key === 'property' && parentPath.isMemberExpression() && parentPath.node.computed) {
        return;
      }

      var name = path.node.name;

      if (name === context.libraryId) {
        context.libraryId = path.scope.generateUid(context.libraryId);
      }
    },
    TypeAlias: function TypeAlias(path) {
      context.defineTypeAlias(path.node.id.name, path);
    },
    InterfaceDeclaration: function InterfaceDeclaration(path) {
      context.defineTypeAlias(path.node.id.name, path);
    },
    ImportDeclaration: function ImportDeclaration(path) {
      var source = path.get('source').node.value;
      var isReact = path.node.importKind !== 'type' && (source === 'react' || source === 'preact');
      var isFlowRuntime = path.node.importKind !== 'type' && source === 'flow-runtime';

      if (isReact) {
        path.parentPath.scope.setData('importsReact', true);
      }

      var _iterator = _createForOfIteratorHelper(path.get('specifiers')),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var specifier = _step.value;
          var local = specifier.get('local');
          var name = local.node.name;

          if (path.node.importKind === 'type') {
            context.defineImportedType(name, specifier);
          } else {
            context.defineValue(name, path);

            if (isReact) {
              if (specifier.isImportDefaultSpecifier()) {
                path.parentPath.scope.setData('reactLib', name);
              } else if (specifier.isImportNamespaceSpecifier()) {
                path.parentPath.scope.setData('reactLib', name);
              } else if (specifier.node.imported.name === 'Component') {
                path.parentPath.scope.setData('reactComponentClass', name);
              } else if (specifier.node.imported.name === 'PureComponent') {
                path.parentPath.scope.setData('reactPureComponentClass', name);
              }
            } else if (isFlowRuntime && (specifier.isImportDefaultSpecifier() || specifier.isImportNamespaceSpecifier())) {
              context.shouldImport = false;
              context.libraryId = name;
            }
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      context.lastImportDeclaration = path;
    },
    VariableDeclarator: function VariableDeclarator(path) {
      var _iterator2 = _createForOfIteratorHelper((0, _findIdentifiers.default)(path.get('id'))),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var id = _step2.value;
          var name = id.node.name;
          context.defineValue(name, path);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    },
    Function: function Function(path) {
      if (path.isFunctionDeclaration() && path.has('id')) {
        var name = path.node.id.name;
        context.defineValue(name, path.parentPath);
      }

      var params = path.get('params').filter(hasTypeAnnotation);
      var typeParameters = (0, _getTypeParameters.default)(path);
      var body = path.get('body');

      if (path.node.generator && path.node.returnType) {
        var yieldTypeUid = body.scope.generateUidIdentifier('yieldType');
        body.scope.setData("yieldTypeUid", yieldTypeUid);
        var returnTypeUid = body.scope.generateUidIdentifier('returnType');
        body.scope.setData("returnTypeUid", returnTypeUid);
        var nextTypeUid = body.scope.generateUidIdentifier('nextType');
        body.scope.setData("nextTypeUid", nextTypeUid);
      } else if (path.node.async && path.node.returnType) {
        var _returnTypeUid = body.scope.generateUidIdentifier('returnType');

        body.scope.setData("returnTypeUid", _returnTypeUid);
      }

      if (path.has('returnType') || params.length || typeParameters.length) {
        if (!body.isBlockStatement()) {
          // Expand arrow function expressions
          body.replaceWith(t.blockStatement([t.returnStatement(body.node)]));
          body = path.get('body'); // BABEL7

          path.node.expression = false;
        }

        typeParameters.forEach(function (item) {
          var name = item.node.name;
          context.defineTypeParameter(name, item);
        });

        var _iterator3 = _createForOfIteratorHelper((0, _findIdentifiers.default)(params)),
            _step3;

        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var id = _step3.value;
            context.defineTypeAlias(id.node.name, id);
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
      }
    },
    Class: function Class(path) {
      var className = 'AnonymousClass';

      if (path.isClassDeclaration() && path.has('id')) {
        var name = path.node.id.name; // have we seen a reference to this class already?
        // if so we should replace it with a `var className = class className {}`
        // to avoid temporal dead zone issues

        if (!path.parentPath.isExportDefaultDeclaration() && path.scope.getData("seenReference:".concat(name))) {
          path.replaceWith(t.variableDeclaration('var', [t.variableDeclarator(t.identifier(name), t.classExpression(path.node.id, path.node.superClass, path.node.body, path.node.decorators || []))]));
          return;
        }

        className = name;
        context.defineValue(name, path.parentPath);
      }

      context.setClassData(path, 'currentClassName', className);
      var typeParameters = (0, _getTypeParameters.default)(path);
      typeParameters.forEach(function (item) {
        var name = item.node.name;
        context.defineClassTypeParameter(name, item);
      });

      if (typeParameters.length > 0 || path.has('superTypeParameters')) {
        ensureConstructor(path);
        context.setClassData(path, 'typeParametersUid', path.parentPath.scope.generateUid("_typeParameters"));
      } else if (path.has('implements') && (context.shouldAssert || context.shouldWarn)) {
        ensureConstructor(path);
      }

      if (typeParameters.length > 0) {
        context.setClassData(path, 'typeParametersSymbolUid', path.parentPath.scope.generateUid("".concat(className, "TypeParametersSymbol")));
      } else {
        context.setClassData(path, 'typeParametersSymbolUid', '');
      }
    }
  };
}
/**
 * Determine whether the given node path has a type annotation or not.
 */


function hasTypeAnnotation(path) {
  if (!path.node) {
    return false;
  } else if (path.node.typeAnnotation) {
    return true;
  } else if (path.isAssignmentPattern()) {
    return hasTypeAnnotation(path.get('left'));
  } else {
    return false;
  }
}
/**
 * Ensure that the given class contains a constructor.
 */


function ensureConstructor(path) {
  var lastProperty;

  var _path$get$filter = path.get('body.body').filter(function (item) {
    if (item.isClassProperty()) {
      lastProperty = item;
      return false;
    }

    return item.node.kind === 'constructor';
  }),
      _path$get$filter2 = _slicedToArray(_path$get$filter, 1),
      existing = _path$get$filter2[0];

  if (existing) {
    return existing;
  }

  var constructorNode;

  if (path.has('superClass')) {
    var args = t.identifier('args');
    constructorNode = t.classMethod('constructor', t.identifier('constructor'), [t.restElement(args)], t.blockStatement([t.expressionStatement(t.callExpression(t.super(), [t.spreadElement(args)]))]));
  } else {
    constructorNode = t.classMethod('constructor', t.identifier('constructor'), [], t.blockStatement([]));
  }

  if (lastProperty) {
    lastProperty.insertAfter(constructorNode);
  } else {
    path.get('body').unshiftContainer('body', constructorNode);
  }
}