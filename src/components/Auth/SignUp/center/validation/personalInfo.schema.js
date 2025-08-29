import { chain, rules } from '@/utils/validators';

export const personalInfoSchema = {
  centerName: chain(rules.required('소속 센터를 입력해주세요.')),
  name: chain(rules.required('이름을 입력해주세요.')),
  position: chain(rules.required('직책을 입력해주세요.')),
  profileOption: chain(rules.required('프로필 이미지를 선택해주세요.'), (value, formData) => {
    if (value === '1' && !formData.photoFile) {
      return '프로필 이미지를 업로드해주세요.';
    }
    return '';
  }),
};
