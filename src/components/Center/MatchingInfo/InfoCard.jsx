import profile from '@/assets/images/elder-basic-profile.png';
import { Button } from '@/components/ui/custom/Button';
import MatchingCard from '@/components/ui/custom/MatchingCard/MatchingCard';

export default function InfoCard() {
  return (
    <MatchingCard>
      {/* 매칭 정보 */}
      <div className='border-b-1 border-[var(--outline)] pb-[1.19rem]'>
        <h1 className='flex justify-start text-[1.125rem] font-semibold text-[var(--text)]'>
          요양보호사 2명 매칭
        </h1>
      </div>
      <div className='flex flex-col mt-[2.31rem] items-start overflow-y-auto h-[8.38rem] overflow-x-hidden'>
        <section className='flex w-full h-[3.56rem] sm: justify-between  xl:gap-[1.88rem]'>
          <img src={profile} alt='어르신 이미지' className='w-[3.5rem] h-auto' />
          <div className='flex flex-col justify-between items-start'>
            <p className='text-[1.125rem] font-semibold text-[var(--text)]'>김한나 요양사</p>
            <p className='text-[1.125rem] font-normal text-[var(--text)]'>여성 / 50세</p>
          </div>
          <div className='flex items-center'>
            <Button
              variant='white'
              className={`w-[5.44rem] h-[1.19rem] font-semibold text-[0.88rem] xl:text-[1rem] lg:w-[9rem]`}
            >
              매칭 요청하기
            </Button>
          </div>
        </section>
      </div>
    </MatchingCard>
  );
}
