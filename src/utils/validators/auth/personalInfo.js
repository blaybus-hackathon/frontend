export const validatePersonalInfo = (info) => {
  if (!info) return false;

  const centerName = info.centerName?.trim() ?? '';
  const name = info.name?.trim() ?? '';
  const position = info.position?.trim() ?? '';
  const profileOption = info.profileOption;
  const photoFile = info.photoFile;

  const basicInfoValid = centerName && name && position;
  const profileValid = profileOption === '2' || (profileOption === '1' && photoFile);

  return basicInfoValid && profileValid;
};
