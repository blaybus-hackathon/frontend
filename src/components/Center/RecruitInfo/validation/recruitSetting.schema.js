import { chain, rules } from '@/utils/validators';

export const customValidations = {
  days: (selectedDays) =>
    !selectedDays || Object.values(selectedDays).every((v) => !v)
      ? '근무 날짜를 선택해주세요.'
      : null,

  times: (value, formData) => {
    if (!formData?.days) return null;

    const selectedDays = formData.days;
    const { workStartTimes = {}, workEndTimes = {} } = value || {};

    const startErrors = {};
    const endErrors = {};
    let isBothEmpty = false;
    let isAnyError = false;

    const selectedDayIndexes = Object.keys(selectedDays).filter((k) => selectedDays[k]);

    for (const dayIdx of selectedDayIndexes) {
      const start = workStartTimes[dayIdx];
      const end = workEndTimes[dayIdx];

      const hasStart = Number.isFinite(start);
      const hasEnd = Number.isFinite(end);

      if (!hasStart && !hasEnd) {
        isBothEmpty = true;
        continue;
      }

      if (!hasStart) {
        startErrors[dayIdx] = '시작 시간을 선택해주세요.';
        isAnyError = true;
        continue;
      }

      if (!hasEnd) {
        endErrors[dayIdx] = '종료 시간을 선택해주세요.';
        isAnyError = true;
        continue;
      }

      if (start >= end) {
        endErrors[dayIdx] = '종료 시간은 시작 시간보다 늦어야합니다.';
        isAnyError = true;
      }
    }

    if (isBothEmpty && !isAnyError) return { summary: '구인 시간을 선택해주세요.' };

    if (isAnyError) {
      return {
        workStartTimes: startErrors,
        workEndTimes: endErrors,
      };
    }

    return null;
  },

  wage: (value) => {
    if (value == null || value === '') return '희망급여를 입력해주세요.';
    const num = Number(value);
    if (!Number.isFinite(num)) return '급여는 숫자만 입력해주세요.';
    if (num < 10030) return '2025년 최저 시급은 10,030원입니다.';
    return null;
  },
};

export const recruitSettingSchema = {
  workType: chain(rules.required('근무 종류를 선택해주세요.')),
  address: chain(rules.required('근무지 주소를 입력해주세요.')),
  days: chain(rules.required('근무 날짜를 선택해주세요.'), customValidations.days),
  times: chain(rules.required('근무 시간을 설정해주세요.'), customValidations.times),
  wage: chain(rules.required('희망급여를 입력해주세요.'), customValidations.wage),
  welfare: chain(rules.required('최소 1개 이상의 복리후생을 선택해주세요.')),
};
