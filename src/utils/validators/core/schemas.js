// rule chain
// return error message sequence
// return '' if valid
export const chain =
  (...rules) =>
  (value) => {
    for (const rule of rules) {
      const msg = rule?.(value);
      if (msg) return msg;
    }
    return '';
  };

export const validateWithSchema = (values, schema) => {
  const errors = {};
  for (const key in schema) {
    const res = schema[key]?.(values[key]);
    if (res) errors[key] = res;
  }
  return errors;
};
