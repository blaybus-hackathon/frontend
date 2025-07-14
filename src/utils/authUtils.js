import { SERVER_ROLE, CLIENT_ROLE } from '@/constants/authType';

/**
 * 사용자 정보 유효성 검증
 * @param {Object} userInfo
 * @returns {boolean} 유효성 검증 결과
 */

export const validateUserInfo = (userInfo) => {
  if (!userInfo || typeof userInfo !== 'object') return false;

  const { chatSenderId, email, userAuth, cmSeq, helperSeq } = userInfo;

  // validate require field
  if (!chatSenderId || !email || !userAuth) return false;

  // validate server auth
  if (!Object.values(SERVER_ROLE).includes(userAuth)) return false;

  // validate require field per auth
  if (userAuth === SERVER_ROLE.MANAGER && !cmSeq) return false;
  if (userAuth === SERVER_ROLE.MEMBER && !helperSeq) return false;

  return true;
};

/**
 * 클라이언트 권한에 따른 redirect 경로 반환
 * @param {string} clientRole - 클라이언트 권한
 * @returns {string} redirect 경로
 */
export const getRedirectPath = (clientRole) => {
  switch (clientRole) {
    case CLIENT_ROLE.CENTER:
      return '/center';
    case CLIENT_ROLE.HELPER:
      return '/helper';
    default:
      return '/signin';
  }
};
