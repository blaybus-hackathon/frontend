import { Button } from '@/components/ui/button';
import InfoCard from '@/components/InfoCard';
import { useState } from 'react';

export default function MatchingManage({ handleMatchingPage }) {
  // const [checkCount, setCheckCount] = useState(0);
  const [selectedCard, setSelectedCard] = useState(-1);

  const handleCheck = (idx) => {
    setSelectedCard((prev) => (prev === idx ? -1 : idx));
  };

  const renderInfoCard = () =>
    [...Array(5)].map((_, idx) => (
      <InfoCard
        key={idx}
        isChecked={selectedCard === idx}
        onCheck={() => handleCheck(idx)}
        checkFunc={setSelectedCard}
      />
    ));

  return (
    <>
      <div className='mx-auto px-[1.5rem] flex flex-col items-center max-w-2xl'>
        <p className='font-bold text-xl tracking-[-0.1rem] py-8 w-full mx-auto text-center'>
          매칭이 필요한 어르신을 선택해주세요!
        </p>
        {renderInfoCard()}
        <Button
          className={`h-16 w-4/5 ${
            selectedCard === -1
              ? 'bg-[#B8B8B8] text-base !opacity-100'
              : 'bg-[var(--company-primary)] text-xl'
          } hover:bg-[var(--company-primary)]/90 fixed bottom-8 font-bold`}
          disabled={selectedCard === -1}
          onClick={() => {
            handleMatchingPage((prev) => {
              return prev + 1;
            });
          }}
        >
          {selectedCard === -1 ? '어르신을 선택해야 넘어갈 수 있어요!' : '다음'}
        </Button>
      </div>
    </>
  );
}
