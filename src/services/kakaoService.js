import { request } from '@/api';

export const kakaoApi = {
  login: async (code, roleType) => {
    try {
      const response = await request('POST', '/oauth/kakao-signup', {
        code,
        roleType,
      });
      return response;
    } catch (error) {
      console.error('[KAKAO API] 로그인 요청 실패:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
        method: error.config?.method,
      });
      throw error;
    }
  },
};
