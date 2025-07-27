import Header, { DesktopHeader } from '@/components/ui/temp/Header';
import Footer from '@/components/ui/temp/Footer';
import StatsCards from '@/components/Center/Dashboard/StatsCards';
import { Sidebar } from '@/components/ui/custom/Sidebar';
import { useDashboardStats } from '@/hooks/center/service/useDashboardStats';
import { TriangleAlert } from 'lucide-react';

const ErrorFallback = ({ error, onRetry }) => (
  <div className='flex flex-col items-center justify-center min-h-[50vh] p-8'>
    <div className='bg-red-50 border border-red-200 rounded-[1.25rem] p-6 max-w-md text-center'>
      <TriangleAlert className='mx-auto w-15 h-auto text-red-800' />
      <h2 className='text-xl font-semibold text-red-800 mb-2'>오류가 발생했습니다</h2>
      <p className='text-red-600 text-base mb-4'>
        {error?.message || '페이지를 불러오는 중 문제가 발생했습니다.'}
      </p>
      <button
        onClick={onRetry}
        className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-base transition-colors cursor-pointer'
      >
        다시 시도하기
      </button>
    </div>
  </div>
);

const MobileLayout = ({ statsData, isLoading, isError, fallbackProps }) => (
  <div className='flex flex-col h-screen lg:hidden'>
    <header className='flex-shrink-0'>
      <Header hasBorder={false} />
    </header>

    <main className='flex-1 bg-[var(--button-inactive)] p-5 min-h-0 overflow-y-auto'>
      {/* TODO: 추후 로딩 처리 */}
      {isLoading ? (
        <div>로딩중...</div>
      ) : isError ? (
        <ErrorFallback {...fallbackProps} />
      ) : (
        <StatsCards statsData={statsData} />
      )}
    </main>

    <footer className='flex-shrink-0'>
      <Footer isManager={true} />
    </footer>
  </div>
);

const DesktopLayout = ({ statsData, isLoading, isError, fallbackProps }) => {
  return (
    <div className='hidden lg:flex lg:h-screen'>
      <aside className='flex-shrink-0'>
        <Sidebar />
      </aside>

      <div className='flex-1 flex flex-col min-w-0'>
        <header className='flex-shrink-0'>
          <DesktopHeader onSidebarToggle={() => {}} isSidebarCollapsed={false} />
        </header>

        <main className='flex-1 bg-[var(--button-inactive)] lg:bg-[#f6f8fc] px-8 py-5 lg:py-20 lg:px-14 min-h-0 overflow-y-auto'>
          {/* TODO: 추후 로딩 처리 필요 */}
          {isLoading ? (
            <div>로딩중..</div>
          ) : isError ? (
            <ErrorFallback {...fallbackProps} />
          ) : (
            <StatsCards statsData={statsData} />
          )}
        </main>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const { data: statsData, isLoading, isError, error, refetch } = useDashboardStats();

  const fallbackProps = {
    error,
    onRetry: refetch,
  };

  return (
    <>
      <MobileLayout
        statsData={statsData}
        isLoading={isLoading}
        isError={isError}
        fallbackProps={fallbackProps}
      />
      <DesktopLayout
        statsData={statsData}
        isLoading={isLoading}
        isError={isError}
        fallbackProps={fallbackProps}
      />
    </>
  );
}
