"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = preTransformVisitors;

var t = _interopRequireWildcard(require("@babel/types"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function preTransformVisitors(context) {
  return {
    Function: function Function(path) {
      // see if we have any annotated ObjectPatterns or ArrayPatterns
      // as arguments.
      foldComplexParamsIntoBody(path);
    }
  };
}

function removePatternBindings(path) {
  if (path.isIdentifier()) {
    path.scope.removeBinding(path.node.name);
  } else if (path.isRestElement()) {
    removePatternBindings(path.get('argument'));
  } else if (path.isObjectProperty()) {
    removePatternBindings(path.get('value'));
  } else if (path.isObjectPattern()) {
    var properties = path.get('properties');

    for (var i = 0; i < properties.length; i++) {
      removePatternBindings(properties[i]);
    }
  } else if (path.isArrayPattern()) {
    var elements = path.get('elements');

    for (var _i = 0; _i < elements.length; _i++) {
      removePatternBindings(elements[_i]);
    }
  }
}

function foldComplexParamsIntoBody(path) {
  var body = path.get('body');
  var params = path.get('params');
  var extra = [];
  var accumulating = false;

  for (var i = 0; i < params.length; i++) {
    var original = params[i];
    var param = original;
    var assignmentRight = void 0;

    if (param.isAssignmentPattern()) {
      assignmentRight = param.get('right');
      param = param.get('left');
    }

    if (!accumulating && !param.has('typeAnnotation')) {
      continue;
    }

    if (param.isObjectPattern() || param.isArrayPattern()) {
      if (body.type !== 'BlockStatement') {
        body.replaceWith(t.blockStatement([t.returnStatement(body.node)]));
        body = path.get('body');
        path.node.expression = false;
      }

      removePatternBindings(param);
      var cloned = t.cloneDeep(param.node);
      var uid = body.scope.generateUidIdentifier("arg".concat(params[i].key));
      uid.__flowRuntime__wasParam = true;
      cloned.__flowRuntime__wasParam = true;
      param.node.__flowRuntime__wasParam = true;

      if (original.node.optional) {
        uid.optional = true;
      }

      if (accumulating && assignmentRight) {
        extra.push(t.ifStatement(t.binaryExpression('===', uid, t.identifier('undefined')), t.blockStatement([t.expressionStatement(t.assignmentExpression('=', uid, assignmentRight.node))])));
        extra.push(t.variableDeclaration('let', [t.variableDeclarator(cloned, uid)]));
        original.replaceWith(uid);
      } else {
        extra.push(t.variableDeclaration('let', [t.variableDeclarator(cloned, uid)]));
        param.replaceWith(uid);
      }

      accumulating = true;
    } else if (accumulating && assignmentRight && !isSimple(assignmentRight)) {
      extra.push(t.ifStatement(t.binaryExpression('===', param.node, t.identifier('undefined')), t.blockStatement([t.expressionStatement(t.assignmentExpression('=', param.node, assignmentRight.node))])));
      original.replaceWith(param.node);
    }
  }

  if (extra.length > 0) {
    body.unshiftContainer('body', extra);
  }
}

function isSimple(path) {
  switch (path.type) {
    case 'NullLiteral':
    case 'NumberLiteral':
    case 'StringLiteral':
    case 'BooleanLiteral':
    case 'RegExpLiteral':
    case 'ThisExpression':
      return true;

    case 'Identifier':
      return path.node.name === 'undefined';

    default:
      return false;
  }
}