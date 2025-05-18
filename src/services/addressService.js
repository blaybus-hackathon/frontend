import { request } from '@/api';

// list of provinces (e.g., metropolitan cities)
export const getFirstAddr = async () => {
  const response = await request('GET', '/get-first-addr');
  return response;
};

// list of cities/districts within a province
export const getSecondAddr = async (afSeq) => {
  const response = await request('GET', `/second/${afSeq}`);
  return response;
};

// list of towns/villages within a city/district
export const getThirdAddr = async (asSeq) => {
  const response = await request('GET', `/third/${asSeq}`);
  return response;
};
