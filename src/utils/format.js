export const getGenderLabel = (gender) => {
  return gender === 1 ? '남성' : '여성';
};

export const getAgeFromBirth = (birth) => {
  const birthYear = parseInt(birth.slice(0, 4), 10);
  const currentYear = new Date().getFullYear();
  return currentYear - birthYear;
};
