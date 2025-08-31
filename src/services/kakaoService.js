import { request } from '@/api';

export const kakaoApi = {
  login: async (code, roleType) => {
    try {
      console.log('[KAKAO API] 요청 시작:', { code, roleType });

      const response = await request('POST', '/api/oauth/kakao-signup', {
        code,
        roleType,
      });

      console.log('[KAKAO API] 응답 성공:', response);
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
