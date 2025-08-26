import { request, requestMultipart } from '@/api';

// 센터 등록
export const centerRegister = ({ data }) => request('POST', '/sign-up/center-register', data);

// 매니저 프로필 조회/수정
export const getManagerProfile = () => request('GET', '/center-manager/find');

export const updateManagerProfile = ({
  cmSeq,
  cmPosition,
  photoFile,
  profileOption,
  imgChangeYn,
}) => {
  const fd = new FormData();
  fd.append('cmSeq', cmSeq);
  fd.append('cmPosition', cmPosition);
  if (profileOption === '1' && photoFile && photoFile instanceof File) {
    fd.append('photoFile', photoFile);
  }
  fd.append('imgChangeYn', imgChangeYn);

  return requestMultipart('POST', '/center-manager/update', fd);
};
