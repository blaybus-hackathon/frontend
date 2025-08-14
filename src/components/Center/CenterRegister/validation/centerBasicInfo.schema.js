import { chain, rules } from '@/utils/validators';

export const centerBasicInfoSchema = {
  name: chain(rules.required('센터 이름을 입력해주세요.')),
  tel: chain(rules.required('전화번호를 입력해주세요.'), rules.phoneNumber()),
  carYn: chain(rules.required('목욕 차량 소유 여부를 선택해주세요.')),
  postcode: chain(rules.required('우편번호를 입력해주세요.')),
  detailAddress: chain(rules.required('상세 주소를 입력해주세요.')),
};
