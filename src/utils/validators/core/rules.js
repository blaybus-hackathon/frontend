export const required =
  (msg = '필수 입력 항목입니다.') =>
  (value) => {
    if (Array.isArray(value)) return value.length ? '' : msg;
    if (typeof value === 'boolean') return value ? '' : msg;
    if (value == null) return msg;
    return String(value).trim() ? '' : msg;
  };

export const rules = {
  required,
  minLength:
    (minLength, msg = `${minLength}자 이상 입력해주세요.`) =>
    (value) => {
      const s = String(value ?? '');
      return s && s.length < minLength ? msg : '';
    },
  phoneNumber:
    (
      emptyMsg = '전화번호를 입력해주세요.',
      invalidMsg = '형식이 올바르지 않습니다. (예: 01012345678)',
      hyphenMsg = '하이픈(-)을 입력할 수 없습니다.',
    ) =>
    (value) => {
      const s = String(value ?? '').trim();
      if (!s) return emptyMsg;

      if (s.includes('-')) return hyphenMsg;

      return /^0[0-9]/.test(s) ? '' : invalidMsg;
    },
  boolRequired:
    (msg = '필수 선택 항목입니다.') =>
    (value) =>
      value ? '' : msg,
};
