export const validateAddInfo = (addInfo) => {
  if (!addInfo) return false;

  const { dementiaSymptom = 0, inmateState = 0 } = addInfo;

  return dementiaSymptom > 0 && inmateState > 0;
};
