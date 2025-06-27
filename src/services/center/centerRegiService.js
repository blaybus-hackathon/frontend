import { request } from '@/api/index';

export const centerRegister = async ({ data }) => {
  const response = await request('POST', '/sign-up/center-register', data);
  return response;
};
