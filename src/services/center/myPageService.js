import { request, requestMultipart } from '@/api';

export const getManagerProfile = async () => {
  const response = await request('GET', '/center-manager/find');
  return response;
};

export const updateManagerProfile = async (formData) => {
  const response = await requestMultipart('POST', '/center-manager/update', formData);
  return response;
};
