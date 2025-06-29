import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// 요청 인터셉터
api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
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

    console.log('API 응답: ', {
      message: response.data.message,
      status: response.status,
      data: response.data,
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
