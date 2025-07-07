export const GENDER_CODE = { MALE: 1, FEMALE: 2 };
export const WORK_TYPE_TEXT = {
  1: '방문요양',
  2: '입주요양',
  4: '방문목욕',
  8: '주야간보호',
  16: '요양원',
  32: '병원',
  64: '병원동행',
};
export const CARE_LEVEL_TEXT = {
  1: '등급없음',
  2: '1등급',
  4: '2등급',
  8: '3등급',
  16: '4등급',
  32: '5등급',
  64: '인지지원 등급',
};

export const birthToAge = (birth) => {
  if (!birth) return 0;
  if (birth.length === 8 && !birth.includes('-')) {
    birth = `${birth.slice(0, 4)}-${birth.slice(4, 6)}-${birth.slice(6, 8)}`;
  }
  const birthDate = new Date(birth);
  if (isNaN(birthDate)) return 0;
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  if (
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

/**
 * 주소 포맷팅
 * @param {*} address 주소
 * @returns 주소
 *
 * 만약 '전체'가 나오면 중단
 */
export const formatAddress = (first, second, third) => {
  if (first && first.includes('전체')) return first;
  if (second && second.includes('전체')) {
    return [first, second].filter(Boolean).join(' ');
  }
  // third에는 전체x
  return [first, second, third].filter(Boolean).join(' ');
};

export const transformData = (data) => ({
  patientSeq: data.patientSeq,
  name: data.name,
  gender: data.gender === GENDER_CODE.MALE ? '남성' : '여성',
  age: birthToAge(data.birthDate),
  birthDate: data.birthDate,
  workTypeText: WORK_TYPE_TEXT[data.workType],
  fullAddress: formatAddress(data.tblAddressFirst, data.tblAddressSecond, data.tblAddressThird),
  careLevelText: CARE_LEVEL_TEXT[data.careLevel],
  matchedHelperInfos: Array.isArray(data.matchedHelperInfos)
    ? data.matchedHelperInfos.map((helper) => ({
        helperSeq: helper.helperSeq,
        helperName: helper.name,
        helperGender: helper.gender === GENDER_CODE.MALE ? '남성' : '여성',
        helperAge: birthToAge(helper.age),
      }))
    : [],
});
