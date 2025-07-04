import { request } from '@/api';

// 어르신 매칭 대기 리스트
export const getMatchingWaitingList = async () => {
  const response = await request('GET', '/patient-match-status/waiting-patient-list');
  return response?.matchingPatientInfoList || [];
};

// 어르신 매칭 진행중 리스트
export const getMatchingInProgressList = async () => {
  const response = await request('GET', '/patient-match-status/matching-patient-list');
  return response?.matchingPatientInfoList || [];
};

// 어르신 매칭 완료 리스트
export const getMatchingCompletedList = async () => {
  const response = await request('GET', '/patient-match-status/matched-patient-list');
  return {
    matched: response?.matchedPatientInfoList || [],
    rejected: response?.matchingRejectedPatientInfoList || [],
  };
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
