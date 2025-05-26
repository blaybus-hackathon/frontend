import { request } from '@/api';

// 어르신 매칭 목록 조회
export const getElderMatchedList = async () => {
  const response = await request('GET', '/patient/get-matched-patient-list');
  return response;
};
