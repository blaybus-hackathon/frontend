import InfoCard from '@/components/ui/InfoCard/InfoCard';
import ElderProfile from '@/components/ui/InfoCard/ElderProfile';
import HelperProfile from '@/components/ui/InfoCard/HelperProfile';
import { memo } from 'react';

export default memo(function MatchingWaiting({ data }) {
  return (
    <InfoCard className='my-5'>
      <ElderProfile elderInfo={data} />

      {/* 요양보호사 */}
      <section className='flex flex-col gap-y-3 pt-10'>
        <h3 className='text-start text-lg font-semibold text-[var(--text)] lg:text-xl'>
          요양보호사 {data.matchedHelperInfos.length}명 매칭
        </h3>
        <hr className='border-[var (--outline)]' />

        <div className='space-y-3'>
          {data.matchedHelperInfos.map((helper, index) => (
            <HelperProfile key={index} helperInfo={helper} buttonText='매칭 요청하기' />
          ))}
        </div>
      </section>
    </InfoCard>
  );
});
