import { request } from '@/api';

export const kakaoApi = {
  login: async (code, roleType) => {
    try {
      const response = await request(
        'POST',
        '/api/oauth/kakao-signup',
        {
          code,
          roleType,
        },
        {
          timeout: 15000,
        },
      );
      return response;
    } catch (error) {
      console.error('[KAKAO API] 로그인 요청 실패:', error);
      throw error;
    }
  },
};
