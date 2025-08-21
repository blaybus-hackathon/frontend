import { chain, rules } from '@/utils/validators';

const isValidBirthdate = (value) => {
  if (!/^\d{8}$/.test(value)) return '생년월일은 8자리 숫자(YYYYMMDD)여야 합니다.';
  const y = Number(value.slice(0, 4));
  const m = Number(value.slice(4, 6));
  const d = Number(value.slice(6, 8));
  const date = new Date(y, m - 1, d);
  if (date.getFullYear() !== y || date.getMonth() + 1 !== m || date.getDate() !== d) {
    return '유효한 날짜가 아닙니다.';
  }
  return '';
};

const isValidWeight = (value) => {
  if (value == null || String(value).trim() === '') return '몸무게를 입력해주세요.';
  if (!/^\d+(\.\d{1,2})?$/.test(String(value)))
    return '숫자 형식(소수점 2자리까지)만 입력해주세요.';
  const num = Number(value);
  if (Number.isNaN(num)) return '올바른 숫자를 입력해주세요.';
  if (num <= 0) return '몸무게는 0보다 커야 합니다.';
  if (num < 10) return '몸무게는 10kg 이상이어야 합니다.';
  if (num > 200) return '몸무게는 200kg 이하여야 합니다.';
  return '';
};

export const elderBasicInfoSchema = {
  name: chain(rules.required('이름을 입력해주세요.')),
  gender: chain(rules.required('성별을 선택해주세요.')),
  addressLabel: chain(rules.required('주소를 입력해주세요.')),
  birthDate: chain(rules.required('생년월일을 입력해주세요. (YYYYMMDD)'), isValidBirthdate),
  weight: chain(rules.required('몸무게를 입력해주세요.'), isValidWeight),
  diseases: chain(rules.required('보유 질병/질환을 입력해주세요.')),
  careLevel: chain(rules.required('장기요양등급을 선택해주세요.')),
};
