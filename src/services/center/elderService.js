import { request, requestMultipart } from '@/api';

// 어르신 목록/상세 정보 조회
export const getElderList = ({ pageNo = 0, pageSize = 10 } = {}) =>
  request('GET', `/patient/list?pageNo=${pageNo}&pageSize=${pageSize}`);

export const getElderDetail = (patientSeq) => request('GET', `/patient/${patientSeq}/detail`);

// 어르신 등록 / 프로필 업로드
export const registerElder = (data) => request('POST', '/patient/save', data);

export const uploadElderProfile = (formData) =>
  requestMultipart('POST', '/cmn/upload-img/PATIENT', formData);

// ===== 상수 조회 =====
export const getFormConstants = () => request('GET', '/cmn/all-care-list');

export const getCareItems = (careTopEnumList) =>
  request('POST', '/cmn/part-request-care-list', {
    careTopEnumList,
  });

// ===== 구인 공고 관련 =====
export const createRecruitPost = (data) => request('POST', '/patient-recruit/helper', data);

export const updateRecruitPost = (data) => request('POST', '/patient-recruit/update', data);

export const getRecruitDetail = (patientLogSeq) =>
  request('GET', `/patient-recruit/${patientLogSeq}/detail`);
