export const validatePersonalInfo = (info) => {
  if (!info) return false;

  const centerName = info.centerName?.trim() ?? '';
  const name = info.name?.trim() ?? '';
  const position = info.position?.trim() ?? '';

  return centerName && name && position;
};
