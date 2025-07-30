import { request } from '@/api';

export const getHelperInfo = async () => {
  return await request('GET', '/get-helper-info');
};

// 요양보호사 매칭 요청 목록 조회
export const getMatchingRequestList = async () => {
  return await request('GET', '/patient-match-status/helper-matching-request-list');
};

// 요양보호사 매칭 완료 목록 조회
export const getMatchingCompleteList = async () => {
  return await request('GET', '/patient-match-status/helper-matching-completed-list');
};

// 어르신 상세 공고 조회
export const getElderLogDetail = async (patientLogSeq) => {
  return await request('GET', `/patient-recruit/${patientLogSeq}/detail-helper`);
};

// 매칭 상태 변경
export const changeMatchingStatus = async (patientLogSeq, helperSeq, matchState) => {
  const response = await request('POST', '/patient-match-status', {
    patientLogSeq,
    helperSeq,
    matchState,
  });
  return response;
};
