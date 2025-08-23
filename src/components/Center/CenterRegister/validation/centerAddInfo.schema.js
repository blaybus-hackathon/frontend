import { chain, rules } from '@/utils/validators';

export const centerAddInfoSchema = {
  grade: chain(rules.required('센터 등급을 선택해주세요.')),
  openDate: chain(rules.required('센터 개소일을 선택해주세요.'), (value) => {
    if (!value) return null;
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      return '센터 개소일은 현재 날짜를 넘을 수 없습니다.';
    }
    return null;
  }),
  introduce: chain(rules.required('한 줄 소개를 입력해주세요.')),
};
