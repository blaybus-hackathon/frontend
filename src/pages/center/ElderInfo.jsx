import Header from '../../components/ui/temp/Header';
import { Button } from '@/components/ui/custom/Button';
import FormattedText from '@/components/ui/custom/FormattedText';
import { useNavigate } from 'react-router-dom';
import ElderInfoCard from '@/components/Center/ElderInfo/ElderInfoCard';

export default function ElderInfo() {
  const navigate = useNavigate();

  return (
    <div>
      <Header type='back' title='어르신 관리' onBack={() => navigate('/')} hasBorder={false} />
      {/* container */}
      <div className='my-8'>
        <section className='flex flex-col gap-[1.19rem] w-[88%] mx-auto mb-[3.1rem]'>
          <div className='flex justify-between items-center'>
            <p className='text-[1.438rem] font-semibold text-[var(--text)]'>어르신 관리</p>
            <Button variant='white' className='w-[9.6rem] h-[2.3rem] text-[0.938rem] font-semibold'>
              요양보호사 매칭하기
            </Button>
          </div>
          <FormattedText
            className='text-[var(--text)] text-base font-normal text-start leading-[1.5rem]'
            text='어르신의 정보를 기반으로 매칭한 요양보호사에요!'
            threshold={10}
            splitIndex={13}
          />
        </section>

        <section>
          <ElderInfoCard />
        </section>
      </div>
    </div>
  );
}
