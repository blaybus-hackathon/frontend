// rule chain
// return error message sequence
// return '' if valid
export const run =
  (...rules) =>
  (value) => {
    for (const rule of rules) {
      const msg = rule?.(value);
      if (msg) return msg;
    }
    return '';
  };

export const validate = (values, schema) => {
  const errors = {};
  for (const key in schema) {
    const res = schema[key]?.(values[key]);
    if (res) errors[key] = res;
  }
  return errors;
};
