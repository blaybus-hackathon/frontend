import { chain, rules } from '@/utils/validators';

export const emailAuthSchema = {
  email: chain(rules.required('이메일을 입력해주세요.'), (value) => {
    if (!value) return null;
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
      return '올바른 이메일 형식이 아닙니다.';
    }
    return null;
  }),
  emailCode: chain(rules.required('이메일 인증을 완료해주세요.')),
  password: chain(rules.required('비밀번호를 입력해주세요.')),
  passwordConfirm: chain(rules.required('비밀번호를 한 번 더 입력해주세요.'), (value, formData) => {
    if (!value) return null;
    if (!formData?.passwordCheck) return null;
    if (value !== formData?.password) return '비밀번호가 일치하지 않습니다.';
    return null;
  }),
};
