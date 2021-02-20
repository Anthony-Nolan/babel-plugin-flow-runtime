"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.expected = exports.input = void 0;
var input = "\n  type Person<A> = {\n    name: string,\n    surname: A\n  };\n\n  type PersonType = Person<string>;\n";
exports.input = input;
var expected = "\n  import t from \"flow-runtime\";\n  const Person = t.type(\"Person\", Person => {\n    const A = Person.typeParameter(\"A\");\n    return t.object(\n      t.property(\"name\", t.string()),\n      t.property(\"surname\", A)\n    );\n  });\n\n  const PersonType = t.type(\"PersonType\", t.ref(Person, t.string()));\n";
exports.expected = expected;