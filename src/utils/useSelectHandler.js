/**
 * single select handler
 * - update field value with single value
 *
 * @param {string} field - field name
 * @param {function} updateFormData - update form data function
 * @returns {(value: number) => void}
 */
export const createSingleSelectHandler = (field, updateFormData) => (value) => {
  updateFormData((prevData) => ({
    ...prevData,
    [field]: value,
  }));
};

/**
 * multi select handler
 * - update field value with array
 * - add all elements in array
 *
 * @param {string} field - field name
 * @param {function} updateFormData - update form data function
 * @returns {(value: number) => void}
 */
export const createMultiSelectHandler = (field, updateFormData) => (value) => {
  const selectedValuesField = `selected${field.charAt(0).toUpperCase() + field.slice(1)}s`;

  updateFormData((prevData) => {
    const currentSelected = [...(prevData[selectedValuesField] || [])];
    const existingIndex = currentSelected.indexOf(value);

    if (existingIndex === -1) {
      currentSelected.push(value);
    } else {
      currentSelected.splice(existingIndex, 1);
    }

    const total = currentSelected.reduce((sum, val) => sum + val, 0);

    updateFormData((prevData) => ({
      ...prevData,
      [field]: total,
    }));
  });
};

/**
 * Creates handlers for single and multi select fields
 *
 * @param {Function} updateFormData - update form data function
 * @returns {{
 *   multiSelect: (field: string) => (value: number) => void,
 *   singleSelect: (field: string) => (value: number) => void
 * }}
 */
export const createSelectHandlers = (updateFormData) => ({
  multiSelect: (field) => createMultiSelectHandler(field, updateFormData),
  singleSelect: (field) => createSingleSelectHandler(field, updateFormData),
});
