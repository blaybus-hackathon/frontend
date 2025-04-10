import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 임시 토큰 생성 함수 (개발용)
const generateTempToken = () => {
  return 'temp-' + Math.random().toString(36).substring(2, 15);
};

// 토큰 관리를 위한 유틸리티
export const tokenManager = {
  setTokens: (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  },

  getAccessToken: () => localStorage.getItem('accessToken'),

  getRefreshToken: () => localStorage.getItem('refreshToken'),

  clearTokens: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  },

  hasToken: () => !!localStorage.getItem('accessToken'),
};

api.interceptors.request.use(
  (config) => {
    const token = tokenManager.getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// axios 응답 인터셉터 추가
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 401 에러이고 재시도하지 않은 요청인 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // refresh 토큰으로 새로운 access 토큰 발급
        const refreshToken = tokenManager.getRefreshToken();
        const response = await api.get('/api/sign/token/access-token', {
          data: { refreshToken },
        });

        const { accessToken } = response.data;

        // 새로운 토큰 저장
        tokenManager.setTokens(accessToken, refreshToken);

        // 원래 요청의 헤더에 새 토큰 설정
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

        // 원래 요청 재시도
        return api(originalRequest);
      } catch (refreshError) {
        // refresh 토큰도 만료된 경우
        console.error('토큰 갱신 실패:', refreshError);
        tokenManager.clearTokens();

        // 임시 로그인 시도
        try {
          const loginResponse = await authAPI.tempLogin();
          originalRequest.headers['Authorization'] = `Bearer ${loginResponse.accessToken}`;
          return api(originalRequest);
        } catch (loginError) {
          console.error('임시 로그인 실패:', loginError);
          return Promise.reject(loginError);
        }
      }
    }

    return Promise.reject(error);
  },
);

export const authAPI = {
  // 임시 로그인 (테스트용)
  tempLogin: async () => {
    try {
      // 실제 refresh 토큰이 있다면 이를 사용하여 새 access 토큰 발급 시도
      const existingRefreshToken =
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJibGF5YnVzIiwiaWF0IjoxNzM5NjU2MzQ2LCJleHAiOjE3NDIyNDgzNDYsInN1YiI6Im1hbnVuYTUzMDFAZ21haWwuY29tIn0.WloTkwvi6unuwaxlpRYFMW_KcPY0ULBeGK6p61jhUAc'; // 실제 refresh 토큰 값을 넣어주세요

      if (existingRefreshToken) {
        try {
          const response = await api.get('/api/sign/token/access-token', {
            data: { refreshToken: existingRefreshToken },
          });

          // 새로운 access 토큰 저장
          tokenManager.setTokens(response.data.accessToken, existingRefreshToken);
          return response.data;
        } catch (refreshError) {
          console.warn('리프레시 토큰으로 갱신 실패:', refreshError);
          // 리프레시 토큰이 실패하면 일반 로그인 시도로 넘어감
        }
      }

      // 리프레시 토큰이 없거나 실패한 경우 일반 로그인 시도
      const response = await api.post('/api/sign/in', {
        userId: 'testManagerFirst@email.com',
        userPw: '1234',
      });

      if (response.data.accessToken) {
        tokenManager.setTokens(response.data.accessToken, response.data.refreshToken);
        return response.data;
      }

      // 모든 시도가 실패하면 임시 토큰 생성
      const tempResponse = {
        chatSenderId: 1,
        email: 'testManagerFirst@email.com',
        userAuth: 'ROLE_MANAGER',
        accessToken: generateTempToken(),
        refreshToken: existingRefreshToken || generateTempToken(), // 기존 리프레시 토큰 유지
      };

      tokenManager.setTokens(tempResponse.accessToken, tempResponse.refreshToken);
      return tempResponse;
    } catch (error) {
      console.warn('로그인 실패:', error);
      throw error;
    }
  },

  // refresh 토큰으로 access 토큰 갱신
  refreshToken: async (refreshToken) => {
    try {
      const response = await api.get('/api/sign/token/access-token', {
        data: { refreshToken },
      });
      return response.data;
    } catch (error) {
      console.error('토큰 갱신 실패:', error);
      throw error;
    }
  },
};

export default api;
