import { chain, rules } from '@/utils/validators';

export const elderAddInfoSchema = {
  dementiaSymptom: chain(rules.required('최소 1개의 증상을 선택해주세요.')),
  inmateState: chain(rules.required('동거인 여부를 선택해주세요.')),
};
