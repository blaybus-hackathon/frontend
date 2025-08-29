export const calculateAge = (birth) => {
  if (!birth || birth.length !== 8) return 0;

  if (birth.length === 8 && !birth.includes('-')) {
    birth = `${birth.slice(0, 4)}-${birth.slice(4, 6)}-${birth.slice(6, 8)}`;
  }

  const birthDate = new Date(birth);
  if (isNaN(birthDate)) return 0;

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  const pastBirthday =
    today.getMonth() > birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() >= birthDate.getDate());

  return pastBirthday ? age : age - 1;
};

export const formatBirthToAge = (birth) => {
  const age = calculateAge(birth);
  return age === 0 ? '알 수 없음' : `${age}`;
};
