// rule chain
// return error message sequence
// return '' if valid
export const chain =
  (...rules) =>
  (value, formData) => {
    for (const rule of rules) {
      const msg = rule?.(value, formData);
      if (msg) return msg;
    }
    return '';
  };

export const validateWithSchema = (values, schema) => {
  const errors = {};
  for (const key in schema) {
    const res = schema[key]?.(values[key], values);
    if (res) errors[key] = res;
  }
  return errors;
};
