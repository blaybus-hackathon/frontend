import { request } from '@/api';

export const getDashboardStats = async () => {
  const response = await request('GET', '/center-manager/statistics-dashboard');
  return response;
};
