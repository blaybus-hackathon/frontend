import { Outlet, useLocation } from 'react-router-dom';
import Header from './temp/Header';
import Footer from './temp/Footer';
import useAuthStore from '@/store/useAuthStore';
import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';

function SafeAreaView({ children }) {
  return (
    <div
      style={{
        paddingTop: 'env(safe-area-inset-top, 0px)',
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
        paddingLeft: 'env(safe-area-inset-left, 0px)',
        paddingRight: 'env(safe-area-inset-right, 0px)',
        minHeight: '100dvh',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </div>
  );
}

export default function Layout() {
  const location = useLocation();
  const headerProps = useHeaderPropsStore((state) => state.headerProps);
  const isManager = useAuthStore((state) => state.isCenter());

  const hideHeaderRoutes = ['/signin', '/chatrooms'];
  const hideFooterRoutes = [
    '/search-center',
    '/helper/signup',
    '/center/signup',
    '/center/elder-register',
    '/signin',
    '/center/register',
    '/center/caregiver-info',
    '/center/recruit-detail',
    '/center/modify-info',
    '/center/matching',
    '/helper/address',
    '/find-account',
    '/center/address',
  ];

  // 특정 prefix로 시작하는 모든 하위 경로에서 footer 숨김
  const hideFooterPrefixRoutes = ['/helper/detail', '/chatroom', '/center/recruit/modify'];
  const hidePaddingRoutes = ['/center/matching-info', '/helper'];
  const hidePaddingPrefixRoutes = ['/helper/detail', '/center/recruit/detail'];

  const isHeaderVisible = !hideHeaderRoutes.some((route) => location.pathname.startsWith(route));
  const isFooterVisible =
    !hideFooterRoutes.some((route) => location.pathname === route) &&
    !hideFooterPrefixRoutes.some((route) => location.pathname.startsWith(route));
  const isFullWidth =
    hidePaddingRoutes.some((route) => location.pathname === route) ||
    hidePaddingPrefixRoutes.some((route) => location.pathname.startsWith(route));

  return (
    <SafeAreaView>
      <div className='min-h-[100dvh] flex flex-col max-w-2xl mx-auto'>
        {isHeaderVisible && <Header {...headerProps} />}
        <main className={isFullWidth ? 'flex-grow' : 'w-[88%] mx-auto flex-grow'}>
          <Outlet />
        </main>
        {isFooterVisible && <Footer isManager={isManager} />}
      </div>
    </SafeAreaView>
  );
}
