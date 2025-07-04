import { request, requestMultipart } from '@/api';

export const getElderForm = async () => {
  const response = await request('GET', '/cmn/all-care-list');
  return response;
};

export const submitElderData = async (data) => {
  const response = await request('POST', '/patient/save', data);
  return response;
};

export const uploadElderProfile = async (formData) => {
  const response = await requestMultipart('POST', '/cmn/upload-img/PATIENT', formData);
  return response;
};

export const getElderList = async ({ pageNo = '0', pageSize = '10' }) => {
  const response = await request('GET', '/patient/list', {
    pageNo,
    pageSize,
  });
  return response;
};
