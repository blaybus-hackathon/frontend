import { Outlet, useLocation } from 'react-router-dom';
import Header from './temp/Header';
import Footer from './temp/Footer';
import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';

export default function Layout() {
  const location = useLocation();
  const headerProps = useHeaderPropsStore((state) => state.headerProps);

  const hideHeaderRoutes = ['/signin', '/chatrooms'];
  const hideFooterRoutes = [
    '/center/elder-register',
    '/center/mypage',
    '/signin',
    '/center/register',
    '/chatroom',
    '/center/caregiver-info',
    '/center/recruit-detail',
    '/center/modify-info',
    '/center/matching',
  ];

  const isHeaderVisible = !hideHeaderRoutes.some((route) => location.pathname.startsWith(route));
  const isFooterVisible = !hideFooterRoutes.some((route) => location.pathname.startsWith(route));

  return (
    <div className='min-h-screen flex flex-col max-w-2xl mx-auto'>
      {isHeaderVisible && <Header {...headerProps} />}
      <main className='w-[88%] mx-auto flex-grow'>
        <Outlet />
      </main>
      {isFooterVisible && <Footer />}
    </div>
  );
}
