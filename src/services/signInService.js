import { request } from '@/api';

export const signIn = async ({ email, password }) => {
  const response = await request('POST', '/sign/in', {
    userId: email,
    userPw: password,
  });
  return response;
};
