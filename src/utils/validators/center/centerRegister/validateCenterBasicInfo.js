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
    carYn !== '' &&
    basicAddress?.trim() !== '' &&
    detailAddress?.trim() !== '' &&
    postcode?.trim() !== '' &&
    extraAddress?.trim() !== ''
  );
};
