export const validateHelperInfo = (info) => {
  if (!info) return false;

  const name = info.name?.trim() ?? '';
  const phone = info.phone?.trim() ?? '';
  const gender = info.gender ?? null;
  const birthday = info.birthday?.trim() ?? '';
  const addressDetail = info.addressDetail?.trim() ?? '';
  const carOwnYn = info.carOwnYn ?? null;
  const eduYn = info.eduYn ?? null;
  const profilePic = info.profilePic ?? null;

  return name && phone && gender && birthday && addressDetail && carOwnYn && eduYn && profilePic;
};
