export const validateCenterAddInfo = (addInfo) => {
  if (!addInfo) return false;

  const { grade = '', openDate = '', introduce = '' } = addInfo;

  return grade?.trim() !== '' && openDate?.trim() !== '' && introduce?.trim() !== '';
};
