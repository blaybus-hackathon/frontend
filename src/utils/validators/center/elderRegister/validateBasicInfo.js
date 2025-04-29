export const validateBasicInfo = (basicInfo) => {
  if (!basicInfo) return false;

  const {
    name = '',
    gender = 0,
    birthDate = '',
    // afSeq = 0,
    // asSeq = 0,
    // atSeq = 0,
    weight = 0,
    disease = '',
    careLevel = 0,
  } = basicInfo;

  return (
    name?.trim() !== '' &&
    gender !== 0 &&
    birthDate?.length === 8 &&
    // afSeq !== 0 &&
    // asSeq !== 0 &&
    // atSeq !== 0 &&
    weight > 0 &&
    disease?.trim() !== '' &&
    careLevel !== 0
  );
};
