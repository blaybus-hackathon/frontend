import { request } from '@/api';

export const checkEmail = async (email) => {
  return await request('GET', `/sign/find-email/${email}`);
};

export const setTempPassword = async (email) => {
  return await request('GET', `/sign/find-pwd/${email}`);
};
