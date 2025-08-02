import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '@/store/useAuthStore';
import { getRedirectPath } from '@/utils/authUtils';

/**
 * route guard check login and role
 * @param {'center'|'helper'} role
 */

export default function RequireAuth({ children, role }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn());
  const clientRole = useAuthStore((s) => s.getClientRole());

  useEffect(() => {
    const currentPath = location.pathname;

    if (!isLoggedIn) {
      alert('로그인이 필요한 페이지입니다.');
      navigate('/signin', { replace: true });
      return;
    }

    // if user's auth is not match with role -> redirect to the correct path
    if (role && clientRole !== role) {
      const redirectPath = getRedirectPath(clientRole);
      alert(`해당 페이지에 대한 접근 권한이 없습니다.\n권한에 맞는 페이지로 이동합니다.`);
      navigate(redirectPath, { replace: true });
      return;
    }

    // if user is logged in and current path is home -> redirect to the correct path
    if (currentPath === '/' && isLoggedIn) {
      const redirectPath = getRedirectPath(clientRole);
      navigate(redirectPath, { replace: true });
      return;
    }
  }, [isLoggedIn, clientRole, role, navigate, location]);

  if (!isLoggedIn || (role && clientRole !== role)) return null;

  return children;
}
