"use strict";

var _testTransform = _interopRequireDefault(require("./testTransform"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('optInOnly', function () {
  it("transforms files with @flow-runtime annotation", function () {
    var input = "\n    /* @flow */\n    /* @flow-runtime enable */\n\n    type Demo = 123;\n\n    (\"nope\": Demo);\n\n    const demo = ([foo]: string[]): string => foo;\n    ";
    var expected = "\n    import t from \"flow-runtime\";\n    /* @flow */\n    /* @flow-runtime enable */\n    const Demo = t.type(\"Demo\", t.number(123));\n    let _undefinedType = Demo;\n    \"nope\";\n    const demo = (_arg) => {\n    let [foo] = _arg;\n    return foo;\n    };\n    ";
    (0, _testTransform.default)(input, {
      annotate: false,
      assert: false,
      optInOnly: true
    }, expected);
  });
  it("doesn't transform files without @flow-runtime annotation", function () {
    var input = "\n    /* @flow */\n\n    const Demo = 123;\n    ";
    var expected = "\n    /* @flow */\n\n    const Demo = 123;\n    ";
    (0, _testTransform.default)(input, {
      optInOnly: true
    }, expected);
  });
});