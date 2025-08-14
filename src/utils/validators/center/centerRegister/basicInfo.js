export const validateCenterBasicInfo = (basicInfo) => {
  if (!basicInfo) return false;

  const {
    name = '',
    tel = '',
    carYn = '',
    basicAddress = '',
    extraAddress = '',
    detailAddress = '',
    postcode = '',
  } = basicInfo;

  return (
    name?.trim() !== '' &&
    tel?.trim() !== '' &&
    /^[0-9]+$/.test(tel) &&
    carYn !== '' &&
    basicAddress?.trim() !== '' &&
    detailAddress?.trim() !== '' &&
    postcode?.trim() !== '' &&
    extraAddress?.trim() !== ''
  );
};
