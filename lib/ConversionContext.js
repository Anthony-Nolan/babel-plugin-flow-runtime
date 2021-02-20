"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var t = _interopRequireWildcard(require("@babel/types"));

var _Entity = _interopRequireDefault(require("./Entity"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var tdzIdentifiers = new WeakSet();
var FLOW_TYPENAMES = {
  $Exact: '$exact',
  $Diff: '$diff',
  $Keys: '$keys',
  $ObjMapi: '$objMapi',
  $ObjMap: '$objMap',
  $PropertyType: '$propertyType',
  $Shape: '$shape',
  $Subtype: '$subtype',
  $Supertype: '$supertype',
  $TupleMap: '$tupleMap',
  $Values: '$values',
  Class: 'Class'
};

var ConversionContext = /*#__PURE__*/function () {
  function ConversionContext() {
    _classCallCheck(this, ConversionContext);

    this.libraryName = 'flow-runtime';
    this.libraryId = 't';
    this.shouldImport = true;
    this.shouldAssert = true;
    this.shouldWarn = false;
    this.shouldAnnotate = true;
    this.optInOnly = false;
    this.isAnnotating = false;
    this.suppressCommentPatterns = [/\$FlowFixMe/];
    this.suppressTypeNames = ['$FlowFixMe'];
    this.lastImportDeclaration = null;
    this.visited = new WeakSet();
  }

  _createClass(ConversionContext, [{
    key: "markTDZIssue",
    value:
    /**
     * Mark a particular node (an Identifier) as boxed.
     * Only applies to identifiers.
     * Boxed identifiers are wrapped in `t.box()` to avoid
     * Temporal Dead Zone issues.
     */
    function markTDZIssue(node) {
      tdzIdentifiers.add(node);
    }
    /**
     * Determine whether the given node exists in a
     * temporal dead zone.
     */

  }, {
    key: "inTDZ",
    value: function inTDZ(node) {
      return tdzIdentifiers.has(node);
    }
    /**
     * Define a type alias with the given name and path.
     */

  }, {
    key: "defineTypeAlias",
    value: function defineTypeAlias(name, path) {
      return this.defineEntity(name, 'TypeAlias', path);
    }
    /**
     * Define a type alias with the given name and path.
     */

  }, {
    key: "defineImportedType",
    value: function defineImportedType(name, path) {
      return this.defineEntity(name, 'ImportedType', path);
    }
    /**
     * Define a type parameter with the given name and path.
     */

  }, {
    key: "defineTypeParameter",
    value: function defineTypeParameter(name, path) {
      return this.defineEntity(name, 'TypeParameter', path);
    }
    /**
     * Define a class type parameter with the given name and path.
     */

  }, {
    key: "defineClassTypeParameter",
    value: function defineClassTypeParameter(name, path) {
      return this.defineEntity(name, 'ClassTypeParameter', path);
    }
    /**
     * Define a value with the given name and path.
     */

  }, {
    key: "defineValue",
    value: function defineValue(name, path) {
      return this.defineEntity(name, 'Value', path);
    }
    /**
     * Determines whether the given node path should be ignored
     * based on its comments.
     */

  }, {
    key: "shouldSuppressPath",
    value: function shouldSuppressPath(path) {
      var comments = getPathComments(path);

      var _iterator = _createForOfIteratorHelper(this.suppressCommentPatterns),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var pattern = _step.value;

          var _iterator2 = _createForOfIteratorHelper(comments),
              _step2;

          try {
            for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
              var comment = _step2.value;

              if (pattern.test(comment)) {
                return true;
              }
            }
          } catch (err) {
            _iterator2.e(err);
          } finally {
            _iterator2.f();
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return false;
    }
    /**
     * Determine whether we should suppress types with the given name.
     */

  }, {
    key: "shouldSuppressTypeName",
    value: function shouldSuppressTypeName(name) {
      return this.suppressTypeNames.indexOf(name) !== -1;
    }
    /**
     * Determine whether the given identifier has TDZ issues.
     * e.g. referencing a `TypeAlias` before it has been defined.
     */

  }, {
    key: "hasTDZIssue",
    value: function hasTDZIssue(name, path) {
      var existingEntity = this.getEntity(name, path);

      if (existingEntity) {
        // We have an entity but we don't know whether it clashes
        // with another entity in this scope that hasn't been defined yet.
        var existingFunctionParent = existingEntity.path && existingEntity.path.getFunctionParent();
        var functionParent = path.getFunctionParent();

        if (existingEntity.scope === path.scope) {
          // if the scopes are identical this cannot clash.
          return false;
        } else if (existingFunctionParent && functionParent && existingFunctionParent.node === functionParent.node) {
          // flow doesn't allow block scoped type aliases
          // so if the scopes are in the same function this must be
          // an identical reference
          return false;
        } else {
          // We need to see if any of the block statements
          // between this node and the existing entity have
          // unvisited type aliases that override the entity we're looking at.
          return existingEntity.isGlobal ? this.hasForwardTypeDeclaration(name, path) : existingEntity.path ? this.hasForwardTypeDeclaration(name, path, existingEntity.path.findParent(filterBlockParent)) : false;
        }
      } else {
        // There's no entity defined with that name yet
        return this.hasForwardTypeDeclaration(name, path);
      }
    }
    /**
     * Find a named type declaration which occurs "after" the `startPath`.
     */

  }, {
    key: "hasForwardTypeDeclaration",
    value: function hasForwardTypeDeclaration(name, startPath, endBlockPath) {
      var subject = startPath.getStatementParent();
      var block = subject.parentPath;
      var body;

      while (block !== endBlockPath) {
        while (block && !block.isBlockStatement() && !block.isProgram()) {
          subject = block;
          block = subject.parentPath;
        }

        if (!block || block === endBlockPath) {
          return false;
        }

        body = block.get('body');

        for (var i = subject.key + 1; i < body.length; i++) {
          var path = body[i];

          if (path.isExportNamedDeclaration() || path.isExportDefaultDeclaration()) {
            if (!path.has('declaration')) {
              continue;
            }

            path = path.get('declaration');
          }

          var hasSameName = path.node.id && path.node.id.name === name;
          var isDeclaration = path.type === 'TypeAlias' || path.type === 'InterfaceDeclaration' || path.type === 'FunctionDeclaration' || path.type === 'ClassDeclaration';

          if (hasSameName && isDeclaration) {
            return true;
          }
        }

        if (block.isProgram()) {
          // nothing left to do
          return false;
        }

        subject = block.getStatementParent();
        block = subject.parentPath;
      }

      return false;
    }
    /**
     * Define an entity with the given name, type and path.
     */

  }, {
    key: "defineEntity",
    value: function defineEntity(name, type, path) {
      var entity = new _Entity.default();
      entity.name = name;
      entity.path = path;
      entity.type = type;
      path.scope.setData("Entity:".concat(name), entity);
      return entity;
    }
    /**
     * Get an entity with the given name in the given path.
     */

  }, {
    key: "getEntity",
    value: function getEntity(name, path) {
      return path.scope.getData("Entity:".concat(name));
    }
    /**
     * Get a named symbol from the library.
     */

  }, {
    key: "symbol",
    value: function symbol(name) {
      return t.memberExpression(t.identifier(this.libraryId), t.identifier("".concat(name, "Symbol")));
    }
    /**
     * Returns a `CallExpression` node invoking the given named method
     * on the runtime library, passing in the given arguments.
     */

  }, {
    key: "call",
    value: function call(name) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      return t.callExpression(t.memberExpression(t.identifier(this.libraryId), t.identifier(name)), args);
    }
    /**
     * Call `type.assert(...args)` on the given node, or `t.warn(type, ...args)`
     * if `shouldWarn` is true.
     */

  }, {
    key: "assert",
    value: function assert(subject) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      if (this.shouldWarn) {
        return this.call.apply(this, ['warn', subject].concat(args));
      } else {
        return t.callExpression(t.memberExpression(subject, t.identifier('assert')), args);
      }
    }
    /**
     * Replace the given path with a node,
     * and ensure the node won't be visited again.
     */

  }, {
    key: "replacePath",
    value: function replacePath(path, replacement) {
      this.visited.add(replacement);
      path.replaceWith(replacement);
    }
  }, {
    key: "getClassData",
    value: function getClassData(path, key) {
      var candidates = path.scope.getData("classData:".concat(key));

      if (candidates instanceof Map) {
        var declaration = path.isClass() ? path : path.findParent(function (item) {
          return item.isClass();
        });

        if (declaration) {
          return candidates.get(declaration.node);
        } else {
          console.warn('Could not find class declaration to get data from:', key);
        }
      }
    }
  }, {
    key: "setClassData",
    value: function setClassData(path, key, value) {
      var scope = path.scope;
      var qualifiedKey = "classData:".concat(key);
      var declaration = path.isClass() ? path : path.findParent(function (item) {
        return item.isClass();
      });

      if (!declaration) {
        console.warn('Could not find class declaration to set data on:', key);
        return;
      }

      var map = scope.data[qualifiedKey];

      if (!(map instanceof Map)) {
        map = new Map();
        scope.data[qualifiedKey] = map;
      }

      map.set(declaration.node, value);
    }
  }, {
    key: "getFlowTypeName",
    value: function getFlowTypeName(name) {
      return FLOW_TYPENAMES[name];
    }
  }]);

  return ConversionContext;
}();

exports.default = ConversionContext;

function filterBlockParent(item) {
  return item.isBlockStatement() || item.isProgram();
}

function getPathComments(path) {
  //"leadingComments", "trailingComments", "innerComments"
  var comments = [];

  if (path.node.comments) {
    var _iterator3 = _createForOfIteratorHelper(path.node.comments),
        _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var comment = _step3.value;
        comments.push(comment.value || '');
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }

  if (path.node.leadingComments) {
    var _iterator4 = _createForOfIteratorHelper(path.node.leadingComments),
        _step4;

    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var _comment = _step4.value;
        comments.push(_comment.value || '');
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
  }

  if (path.node.innerComments) {
    var _iterator5 = _createForOfIteratorHelper(path.node.innerComments),
        _step5;

    try {
      for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
        var _comment2 = _step5.value;
        comments.push(_comment2.value || '');
      }
    } catch (err) {
      _iterator5.e(err);
    } finally {
      _iterator5.f();
    }
  }

  return comments;
}