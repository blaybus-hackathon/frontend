import useAuthStore from '@/store/useAuthStore';
import { getRedirectPath } from '@/utils/authUtils';

/**
 * 사용자 권한에 따른 홈 경로를 반환하는 유틸리티 함수
 * @returns {string} 사용자 권한에 맞는 홈 경로
 */
export const getHomeLink = () => {
  const clientRole = useAuthStore.getState().getClientRole();
  return clientRole ? getRedirectPath(clientRole) : '/';
};

/**
 * 사용자 권한에 따른 홈으로 네비게이션하는 함수
 * @param {function} navigate - React Router의 navigate 함수
 */
export const navigateToHome = (navigate) => {
  const homeLink = getHomeLink();
  navigate(homeLink);
};
