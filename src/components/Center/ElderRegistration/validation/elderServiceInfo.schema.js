import { chain, rules } from '@/utils/validators';

export const elderServiceInfoSchema = {
  serviceMeal: chain(rules.required('최소 1개의 식사보조 서비스를 선택해주세요.')),
  serviceToilet: chain(rules.required('최소 1개의 화장실보조 서비스를 선택해주세요.')),
  serviceMobility: chain(rules.required('최소 1개의 이동보조 서비스를 선택해주세요.')),
  serviceDaily: chain(rules.required('최소 1개의 일상생활보조 서비스를 선택해주세요.')),
  profileOption: chain(rules.required('프로필 등록 방법을 선택해주세요.')),
  patientImage: (value, values) => {
    if (values.profileOption === '1' && !value) {
      return '프로필 사진을 선택해주세요.';
    }
    return null;
  },
};
