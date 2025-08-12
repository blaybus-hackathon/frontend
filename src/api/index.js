import axios from 'axios';
import { handleApiError } from '@/utils/handleApiError';
import useAuthStore from '@/store/useAuthStore';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// request interceptor
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// response interceptor - global error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // auto redirect to error page for 500 server error
    const status = error?.response?.status;
    if (status >= 500) {
      handleApiError(error, {}, '서버에 문제가 발생했습니다.', false, true);
    } else if (status === 403) {
      const { logout } = useAuthStore.getState();
      logout();
      alert('로그인 세션이 만료되었습니다. 다시 로그인해주세요.');
      window.location.href = '/signin';
    }

    return Promise.reject(error);
  },
);

export const request = async (method, endpoint, data = {}) => {
  try {
    const response = await api({
      method,
      url: `/api${endpoint}`,
      ...(method === 'GET' ? { params: data } : { data }),
    });

    return response.data;
  } catch (error) {
    console.error('API 요청 오류: ', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw error;
  }
};

export const requestMultipart = async (method, endpoint, formData) => {
  try {
    const response = await api({
      method,
      url: `/api${endpoint}`,
      data: formData,
      headers: {
        ...api.defaults.headers.common,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('API 요청 오류: ', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });
    throw error;
  }
};

export default api;
