export const validateBasicInfo = (basicInfo) => {
  if (!basicInfo) return false;

  const {
    name = '',
    gender = null,
    birthDate = '',
    afSeq = null,
    asSeq = null,
    atSeq = null,
    weight = '',
    diseases = '',
    careLevel = null,
  } = basicInfo;

  return (
    name?.trim() !== '' &&
    gender !== null &&
    birthDate?.length === 8 &&
    afSeq !== null &&
    asSeq !== null &&
    atSeq !== null &&
    weight?.trim() !== '' &&
    diseases?.trim() !== '' &&
    careLevel !== null
  );
};
