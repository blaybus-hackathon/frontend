import InfoCard from '@/components/ui/InfoCard/InfoCard';
import ElderProfile from '@/components/ui/InfoCard/ElderProfile';
import HelperProfile from '@/components/ui/InfoCard/HelperProfile';
import { Button } from '@/components/ui/custom/Button';

export default function ElderCard({ data }) {
  return (
    <InfoCard className='flex flex-col w-full items-center pt-5 min-lg:pt-10 pb-3 2xl:pb-10'>
      <ElderProfile elderInfo={data} />
      <h3 className='mt-6 2xl:mt-10 mb-3 text-start text-xl font-semibold text-[var(--text)]'>
        요양보호사
      </h3>
      <hr className='w-full h-[0.063rem] bg-[var(--outline)] mb-3 2xl:mb-8' />
      <HelperProfile helperInfo={data.matchedHelperInfos[0]} />
      <div className='flex justify-end'>
        <Button
          variant='link'
          className='w-fit text-[var(--text)] cursor-pointer font-medium text-base hover:text-[var(--main)]'
        >
          어르신 정보 수정하기
        </Button>
      </div>
    </InfoCard>
  );
}
