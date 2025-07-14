import useAuthStore from '@/store/useAuthStore';
import useProfileStore from '@/store/useProfileStore';
import useHelperInfoStore from '@/store/helper/useHelperInfoStore';
import { clearAllQueries } from '@/utils/queryClient';

export const logoutHandler = async () => {
  // TODO: 카카오 로그아웃

  // JWT 토큰 삭제
  sessionStorage.removeItem('accessToken');
  sessionStorage.removeItem('refreshToken');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');

  // react query 캐시 정리
  clearAllQueries();

  // zustand store 초기화
  useAuthStore.getState().reset();
  useProfileStore.getState().resetProfile?.();
  useHelperInfoStore?.getState().reset?.();

  // 저장소 정리
  sessionStorage.removeItem('auth-storage');
  sessionStorage.removeItem('profile-storage');
};
