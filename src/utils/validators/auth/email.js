export const validateEmail = (info) => {
  if (!info) return false;

  const email = info.email?.trim() ?? '';
  const emailCode = info.emailCode?.trim() ?? '';
  const password = info.password?.trim() ?? '';
  const passwordConfirm = info.passwordConfirm?.trim() ?? '';
  const isVerified = info.isVerified ?? false;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return emailRegex.test(email) && emailCode && password && passwordConfirm && isVerified;
};

export const validatePasswordMatch = (info) => {
  if (!info) return false;

  const passwordCheck = info.passwordCheck ?? false;

  return passwordCheck;
};
