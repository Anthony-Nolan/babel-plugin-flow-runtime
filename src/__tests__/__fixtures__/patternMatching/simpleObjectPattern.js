/* @flow */

export const input = `
  import t from "flow-runtime";
  const pattern = t.pattern(
    ({input}: Object) => input.toUpperCase(),
    _ => _
  );
`;

export const expected = `
  import t from "flow-runtime";

  const pattern = _arg0 => {
    if (t.object().accepts(_arg0)) {
      let { input } = _arg0;
      return input.toUpperCase();
    }
    else {
      return _arg0;
    }
  };
`;