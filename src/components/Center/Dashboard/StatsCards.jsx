import { StatCard } from './StatCard';
import { DonutChart } from './DonutChart';
import { BarChart } from './BarChart';

export function StatsCards() {
  // dummy data
  const statsData = {
    newMatches: 20,
    totalMatches: 380,
    // 도넛 차트용 매칭 비율 데이터
    matching: {
      acceptanceRate: 70,
      rejectionRate: 30,
    },
    // 막대 차트용 상태별 데이터 (ReChart 형식에 맞게 변경)
    statusData: [
      { name: '대기', value: 140, color: '#c9c1de' },
      { name: '진행중', value: 278, color: '#8976C0' },
      { name: '완료', value: 380, color: '#522e9a' },
    ],
  };

  return (
    <>
      {/* Mobile Layout */}
      <div className='lg:hidden flex flex-col h-full space-y-4'>
        {/* Top */}
        <div className='grid grid-cols-2 grid-rows-2 gap-4 h-64'>
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
            className='h-full p-3'
          />
        </div>
      </div>
      {/* Desktop Layout */}
      <div className='hidden lg:grid lg:grid-cols-3 lg:grid-rows-2 lg:gap-6 lg:h-full'>
        <StatCard title='신규 매칭 건수' value={statsData.newMatches} className='' />
        <StatCard title='전체 매칭 건수' value={statsData.totalMatches} className='' />
        <DonutChart
          title='매칭 비율'
          acceptRate={statsData.matching.acceptanceRate}
          rejectRate={statsData.matching.rejectionRate}
          className='row-span-2'
        />
        <BarChart
          title='상태별 매칭 건수'
          data={statsData.statusData}
          showGrid={true}
          showLegend={true}
          className='col-span-2'
        />
      </div>
    </>
  );
}
