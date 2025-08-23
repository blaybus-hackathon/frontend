import { request } from '@/api';

// 어르신 매칭 대기 리스트 조회
export const getMatchingWaitingList = () => {
  return request('GET', '/patient-match-status/waiting-patient-list').then(
    (response) => response?.list || [],
  );
};

// 어르신 매칭 진행중 리스트
export const getMatchingInProgressList = () => {
  return request('GET', '/patient-match-status/matching-patient-list').then(
    (response) => response?.list || [],
  );
};

// 어르신 매칭 완료 리스트
export const getMatchingCompletedList = () => {
  return request('GET', '/patient-match-status/matched-patient-list').then(
    (response) => response?.list || [],
  );
};

// 매칭 상태 변경
export const changeMatchingStatus = (patientLogSeq, helperSeq, matchState) => {
  return request('POST', '/patient-match-status', {
    patientLogSeq,
    helperSeq,
    matchState,
  });
};
