import { memo } from 'react';
import { StatCard } from '@/components/Center/Dashboard/StatCard';
import { DonutChart } from '@/components/Center/Dashboard/DonutChart';
import { BarChart } from '@/components/Center/Dashboard/BarChart';

export default memo(function StatsCard({ statsData }) {
  if (!statsData) {
    return (
      <div className='text-center p-8'>
        <p className='text-[var(--placeholder-gray)]'>표시할 데이터가 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Layout */}
      <div className='lg:hidden flex flex-col space-y-4 h-full'>
        {/* Top */}
        <div className='grid grid-cols-2 grid-rows-2 gap-4'>
          <StatCard title='신규 매칭 건수' value={statsData.newMatches} className='p-3' />

          <DonutChart
            title='매칭 비율'
            acceptRate={statsData.matching.acceptanceRate}
            rejectRate={statsData.matching.rejectionRate}
            className='row-span-2 p-3'
          />

          {/* 전체 매칭 건수 - 좌하단 */}
          <StatCard title='전체 매칭 건수' value={statsData.totalMatches} className='p-3' />
        </div>

        {/* Bottom */}
        <div className='flex-1 min-h-[30vh]'>
          <BarChart
            title='상태별 매칭 건수'
            data={statsData.statusData}
            showGrid={true}
            showLegend={true}
            showXAxis={true}
            showYAxis={false}
            gridInterval={50}
            className='h-full p-3'
          />
        </div>
      </div>

      {/* Desktop Layout */}
      <div className='hidden lg:grid lg:gap-8 lg:h-full lg:grid-rows-[auto_1fr] lg:grid-cols-[1fr_1fr_auto]'>
        <StatCard title='신규 매칭 건수' value={statsData.newMatches} className='p-6' />
        <StatCard title='전체 매칭 건수' value={statsData.totalMatches} className='p-6' />
        <DonutChart
          title='매칭 비율'
          acceptRate={statsData.matching.acceptanceRate}
          rejectRate={statsData.matching.rejectionRate}
          className='row-span-2 p-6 min-h-[20vh] min-w-[50vh]'
        />
        <div className='col-span-2 flex-1 min-h-[30vh]'>
          <BarChart
            title='상태별 매칭 건수'
            data={statsData.statusData}
            showGrid={true}
            showLegend={true}
            showYAxis={true}
            className='h-full p-6 min-h-[20vh]'
          />
        </div>
      </div>
    </>
  );
});
