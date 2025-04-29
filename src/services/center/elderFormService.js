import { request } from '@/api';

export const getElderForm = async () => {
  const response = await request('GET', '/cmn/all-care-list');
  return response;
};

export const submitElderData = async (data) => {
  const response = await request('POST', '/patient/save', data);
  return response;
};
