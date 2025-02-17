import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import InfoCard from '@/components/InfoCard';
import { useState } from 'react';

export default function MatchingManage() {
  const [checkCount, setCheckCount] = useState(0);

  const handleCheckCount = (change) => {
    setCheckCount((prev) => prev + change);
  };
  return (
    <>
      <Header title={'공고 올리기'} />
      <div className='mx-[1.5rem] flex flex-col items-center'>
        <p className='font-bold text-xl tracking-[-0.1rem] py-8 w-full mx-auto text-center'>
          매칭이 필요한 어르신을 선택해주세요!
        </p>
        <InfoCard checkFunc={handleCheckCount} />
        <InfoCard checkFunc={handleCheckCount} />
        <InfoCard checkFunc={handleCheckCount} />
        <InfoCard checkFunc={handleCheckCount} />
        <Button
          className={`h-16 w-4/5 ${
            checkCount === 0
              ? 'bg-[#B8B8B8] text-base !opacity-100'
              : 'bg-[var(--company-primary)] text-xl'
          } hover:bg-[var(--company-primary)]/90 fixed bottom-8 font-bold`}
          disabled={checkCount === 0}
        >
          {checkCount === 0 ? '어르신을 선택해야 넘어갈 수 있어요!' : '다음'}
        </Button>
      </div>
      {/* <ButtonGroup /> */}
    </>
  );
}
