import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/store/useAuthStore';
import { getRedirectPath } from '@/utils/authUtils';

/**
 * 권한 기반 redirect custom hook
 * - 로그인 후 권한에 따른 자동 redirect
 */
const useRedirectByRole = () => {
  const navigate = useNavigate();
  const { user, getClientRole, isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn()) {
      const clientRole = getClientRole();
      const redirectPath = getRedirectPath(clientRole);

      // if the current route is not authorized, redirect
      const currentPath = window.location.pathname;
      if (!currentPath.startsWith(redirectPath.split('/').slice(0, 2).join('/'))) {
        navigate(redirectPath, { replace: true });
      }
    }
  }, [user, navigate, getClientRole, isLoggedIn]);
};

export default useRedirectByRole;
