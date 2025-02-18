import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // VITE 환경변수 사용

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const request = async (method, endpoint, data = {}) => {
  try {
    const response = await api({
      method,
      url: `/api${endpoint}`,
      data,
    });
    return response.data;
  } catch (error) {
    console.error("API 요청 오류: ", error);
    throw error;
  }
};

export default api;
