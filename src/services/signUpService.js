import { request } from '@/api';

export const signUpCenter = async (data) => {
  const response = await request('POST', '/sign-up/manager', data);
  return response;
};

export const getCenterList = async ({ pageNo, pageSize, searchName }) => {
  const response = await request('GET', '/sign-up/center-list', {
    pageNo,
    pageSize,
    searchName,
  });
  return response;
};

// send email code
export const requestEmailAuth = async (email) => {
  const response = await request('POST', '/sign-up/authentication-mail', { email });
  return response;
};

// verify email code
export const verifyEmailAuth = async ({ mailSeq, email, code }) => {
  const response = await request('POST', '/sign-up/check-code', {
    mailSeq,
    email,
    code,
  });
  return response;
};
