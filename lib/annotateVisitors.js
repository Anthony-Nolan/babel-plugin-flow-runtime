"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = annotateVisitors;

var t = _interopRequireWildcard(require("@babel/types"));

var _convert = _interopRequireDefault(require("./convert"));

var _hasTypeAnnotations = _interopRequireDefault(require("./hasTypeAnnotations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function annotateVisitors(context) {
  return {
    Function: {
      exit: function exit(path) {
        if (context.shouldSuppressPath(path) || context.visited.has(path.node) || path.isClassMethod() || path.isObjectMethod()) {
          path.skip();
          return;
        }

        context.visited.add(path.node);

        if (!(0, _hasTypeAnnotations.default)(path)) {
          return;
        }

        var extractedName = path.isArrowFunctionExpression() && extractFunctionName(path);

        if (extractedName) {
          path.arrowFunctionToShadowed();
          path.node.id = t.identifier(extractedName);
        }

        var typeCall = (0, _convert.default)(context, path); // Capture the data from the scope, as it
        // may be overwritten by the replacement.

        var scopeData = path.get('body').scope.data;

        if (path.isExpression()) {
          var replacement = context.call('annotate', path.node, typeCall);
          context.replacePath(path, replacement); // Refetch the replaced node

          var body = path.get('body');
          body.scope.data = Object.assign(scopeData, body.scope.data);
        } else if (path.has('id')) {
          var _replacement = t.expressionStatement(context.call('annotate', path.node.id, typeCall));

          if (path.parentPath.isExportDefaultDeclaration() || path.parentPath.isExportDeclaration()) {
            path.parentPath.insertAfter(_replacement);
          } else {
            path.insertAfter(_replacement);
          }
        } else if (path.isFunctionDeclaration() && path.parentPath.isExportDefaultDeclaration()) {
          // @fixme - this is not nice, we just turn the declaration into an expression.
          path.node.type = 'FunctionExpression'; // TODO(vjpr): BABEL7: https://babeljs.io/docs/en/next/v7-migration-api#expression-field-removed-from-arrowfunctionexpression

          path.node.expression = true;

          var _replacement2 = t.exportDefaultDeclaration(context.call('annotate', path.node, typeCall));

          context.replacePath(path.parentPath, _replacement2); // Refetch the replaced node

          var _body = path.get('body');

          _body.scope.data = Object.assign(scopeData, _body.scope.data);
        } else {
          console.warn('Could not annotate function with parent node:', path.parentPath.type);
        }
      }
    },
    Class: {
      exit: function exit(path) {
        if (context.shouldSuppressPath(path)) {
          path.skip();
          return;
        }

        var typeCall = (0, _convert.default)(context, path);
        var decorator = t.decorator(context.call('annotate', typeCall));

        if (!path.has('decorators')) {
          path.node.decorators = [];
        }

        path.unshiftContainer('decorators', decorator);
      }
    }
  };
}

function extractFunctionName(path) {
  var id;

  if (path.parentPath.type === 'VariableDeclarator') {
    id = path.parentPath.node.id;
  } else if (path.parentPath.type === 'AssignmentExpression') {
    id = path.parentPath.node.left;
  } else {
    return;
  }

  if (id.type === 'Identifier') {
    return id.name;
  } else if (id.type === 'MemberExpression' && !id.computed) {
    return id.property.name;
  }
}