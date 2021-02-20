"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = testTransform;

var _assert = require("assert");

var _transform = _interopRequireDefault(require("../transform"));

var babel = _interopRequireWildcard(require("@babel/core"));

var babylon = _interopRequireWildcard(require("@babel/parser"));

var _generator = _interopRequireDefault(require("@babel/generator"));

var _traverse = _interopRequireDefault(require("@babel/traverse"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stripFlowTypes(program) {
  (0, _traverse.default)(program, {
    Flow: function Flow(path) {
      path.remove();
    },
    TypeCastExpression: function TypeCastExpression(path) {
      var node = path.node;

      do {
        node = node.expression;
      } while (node.type === 'TypeCastExpression');

      path.replaceWith(node);
    },
    Class: function Class(path) {
      path.node.implements = null;
    }
  });
  return program;
}

function parse(source) {
  return babylon.parse(source, {
    filename: 'unknown',
    sourceType: 'module',
    plugins: ['jsx', 'flow', 'doExpressions', 'objectRestSpread', 'decorators-legacy', 'classProperties', 'exportDefaultFrom', 'exportNamespaceFrom', 'asyncGenerators', 'functionBind', 'functionSent']
  });
}

function normalize(input) {
  return input.trim().replace(/\s+/g, ' ').replace(/\(\s+/g, '(').replace(/\s+\)/g, ')').replace(/\{\s+/g, '{\n').replace(/\s+\}/g, '\n}').replace(/\[\s+/g, '[').replace(/\s+]/g, ']').replace(/\}\s+([A-Za-z])/g, '\n}\n$1').split(';').join(';\n').trim();
}

function testTransform(input, options, expected, integration) {
  var parsed = parse(input);
  var generated;

  if (integration) {
    generated = babel.transform(input, integration).code;
  } else {
    var transformed = stripFlowTypes((0, _transform.default)(parsed, options));
    generated = (0, _generator.default)(transformed).code;
  }

  (0, _assert.equal)(normalize(generated), normalize(expected));
}