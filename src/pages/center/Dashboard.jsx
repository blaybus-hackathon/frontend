import Header, { DesktopHeader } from '@/components/ui/temp/Header';
import Footer from '@/components/ui/temp/Footer';
import { StatsCards } from '@/components/Center/Dashboard/StatsCards';
import { Sidebar } from '@/components/ui/custom/Sidebar';

export default function Dashboard() {
  return (
    <>
      {/* Mobile Layout */}
      <div className='flex flex-col h-screen lg:hidden'>
        <Header hasBorder={false} />
        <main className='flex-1 bg-[var(--button-inactive)] p-5 min-h-0'>
          <StatsCards />
        </main>
        <Footer isManager={true} />
      </div>

      {/* Desktop Layout */}
      <div className='hidden lg:flex lg:h-screen'>
        <Sidebar />

        <div className='flex-1 flex flex-col'>
          <DesktopHeader onSidebarToggle={() => {}} isSidebarCollapsed={false} />

          <main className='flex-1 bg-[var(--button-inactive)] lg:bg-[#f6f8fc] px-8 py-5 lg:py-20 lg:px-14 min-h-0'>
            <StatsCards />
          </main>
        </div>
      </div>
    </>
  );
}
