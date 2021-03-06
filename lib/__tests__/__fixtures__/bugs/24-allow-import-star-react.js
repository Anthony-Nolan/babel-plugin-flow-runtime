"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\nimport * as R from 'react';\n\ntype Props = {\n  x: number;\n  y: number;\n};\n\nclass Point extends R.Component {\n  props: Props;\n  render() {\n    return <div>{this.props.x} : {this.props.y}</div>;\n  }\n}\n";
exports.input = input;
var expected = "\nimport * as R from 'react';\nimport t from \"flow-runtime\";\n\nconst Props = t.type(\"Props\", t.object(\n  t.property(\"x\", t.number()),\n  t.property(\"y\", t.number())\n));\n\nclass Point extends R.Component {\n  static propTypes = t.propTypes(Props);\n  @t.decorate(Props) props;\n  render() {\n    return <div>{this.props.x} : {this.props.y}</div>;\n  }\n}\n";
exports.expected = expected;