import { request } from '@/api';

export const getDashboardStats = () => request('GET', '/center-manager/statistics-dashboard');
