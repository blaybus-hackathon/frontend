import { Outlet, useLocation } from 'react-router-dom';
import Header from './temp/Header';
import Footer from './temp/Footer';
import useAuthStore from '@/store/useAuthStore';
import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';

export default function Layout() {
  const location = useLocation();
  const headerProps = useHeaderPropsStore((state) => state.headerProps);
  const isCenter = useAuthStore((state) => state.isCenter());

  const hideHeaderRoutes = ['/signin', '/chatrooms'];
  const hideFooterRoutes = [
    '/search-center',
    '/helper/signup',
    '/center/signup',
    '/center/elder-register',
    '/center/mypage',
    '/signin',
    '/center/register',
    '/chatroom',
    '/center/caregiver-info',
    '/center/recruit-detail',
    '/center/modify-info',
    '/center/matching',
    '/helper/address',
    '/find-account',
  ];
  const hidePaddingRoutes = ['/center/matching-info', '/helper'];

  const isHeaderVisible = !hideHeaderRoutes.some((route) => location.pathname.startsWith(route));
  const isFooterVisible = !hideFooterRoutes.some((route) => location.pathname === route);
  const isFullWidth = hidePaddingRoutes.some((route) => location.pathname === route);

  return (
    <div className='min-h-screen flex flex-col max-w-2xl mx-auto'>
      {isHeaderVisible && <Header {...headerProps} />}
      <main className={isFullWidth ? 'flex-grow' : 'w-[88%] mx-auto flex-grow'}>
        <Outlet />
      </main>
      {isFooterVisible && <Footer isManger={isCenter} />}
    </div>
  );
}
