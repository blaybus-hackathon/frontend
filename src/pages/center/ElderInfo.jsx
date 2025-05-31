import { useEffect } from 'react';
import { Button } from '@/components/ui/custom/Button';
import { useNavigate } from 'react-router-dom';
import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';
import ElderCarousel from '@/components/Center/ElderInfo/ElderCarousel';

export default function ElderInfo() {
  const navigate = useNavigate();
  const setHeaderProps = useHeaderPropsStore((state) => state.setHeaderProps);

  useEffect(() => {
    setHeaderProps({
      type: 'back',
      title: '어르신 관리',
      onBack: () => navigate('/'),
      hasBorder: false,
    });
  }, []);

  return (
    <>
      <div className='my-8'>
        <section className='flex flex-col gap-[1.19rem] mb-[3.1rem]'>
          <div className='flex justify-between items-center'>
            <p className='text-[1.438rem] font-semibold text-[var(--text)]'>어르신 관리</p>
            <Button variant='white' className='w-[9.6rem] h-[2.3rem] text-[0.938rem] font-semibold'>
              요양보호사 매칭하기
            </Button>
          </div>
          <p className='text-[var(--text)] text-base font-normal text-start leading-[1.5rem] break-keep'>
            어르신의 정보를 기반으로 매칭한 요양보호사에요!
          </p>
        </section>

        <section>
          <ElderCarousel />
        </section>
      </div>
    </>
  );
}
