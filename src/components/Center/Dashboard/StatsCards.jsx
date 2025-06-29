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
}
