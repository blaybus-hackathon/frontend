export const formatBirthDate = (birthDate) => {
  if (!birthDate || birthDate.length !== 8) return '알 수 없음';

  const year = birthDate.slice(0, 4);
  const month = birthDate.slice(4, 6);
  const day = birthDate.slice(6, 8);

  return `${year}년 ${month}월 ${day}일`;
};
