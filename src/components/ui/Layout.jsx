import { Outlet, useLocation } from 'react-router-dom';
import Header from './temp/Header';
import Footer from './temp/Footer';
import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';

export default function Layout() {
  const location = useLocation();
  const headerProps = useHeaderPropsStore((state) => state.headerProps);

  const hideHeaderRoutes = ['/signin'];
  const hideFooterRoutes = ['/center/elder-register', '/center/mypage', '/signin'];

  const isHeaderVisible = !hideHeaderRoutes.some((route) => location.pathname.startsWith(route));
  const isFooterVisible = !hideFooterRoutes.some((route) => location.pathname.startsWith(route));

  return (
    <div className='h-screen max-w-2xl mx-auto'>
      {isHeaderVisible && <Header {...headerProps} />}
      <main className='w-[88%] mx-auto'>
        <Outlet />
      </main>
      {isFooterVisible && <Footer />}
    </div>
  );
}
