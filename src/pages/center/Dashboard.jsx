import Header from '@/components/ui/temp/Header';
import Footer from '@/components/ui/temp/Footer';
import { StatsCards } from '@/components/Center/Dashboard/StatsCards';

export default function Dashboard() {
  return (
    <div className='flex flex-col h-screen'>
      <Header hasBorder={false} />
      <div className='flex-1 bg-[var(--button-inactive)] p-5 min-h-0'>
        <StatsCards />
      </div>
      <Footer />
    </div>
  );
}
