import { chain, rules } from '@/utils/validators';

const timeList = (value) => {
  if (!Array.isArray(value) || value.length === 0) {
    return '근무 시간을 선택해주세요.';
  }

  for (const timeItem of value) {
    if (!timeItem.ptStartTime || !timeItem.ptEndTime) {
      return '시작 시간과 종료 시간을 모두 선택해주세요.';
    }
  }

  for (const timeItem of value) {
    if (timeItem.ptStartTime >= timeItem.ptEndTime) {
      return '시작 시간은 종료 시간보다 빨라야 합니다.';
    }
  }

  return '';
};

export const elderCareInfoSchema = {
  workType: chain(rules.required('근무 종류를 선택해주세요.')),
  timeList: chain(rules.required('근무 시간을 선택해주세요.'), timeList),
};
