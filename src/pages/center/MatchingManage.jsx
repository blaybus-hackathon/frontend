import { Button } from '@/components/ui/custom/Button';
import InfoCard from '@/components/ui/temp/InfoCard';
import { useState } from 'react';
import patientStore from '@/store/patientStore';

export default function MatchingManage({ handleMatchingPage }) {
  const tempUsers = [
    {
      name: '박순자',
      gender: '여성',
      age: 50,
      workType: '방문 요양',
      address: '서울 강남구 멍멍동',
      grade: '등급 없음',
    },
    {
      name: '박양자',
      gender: '남성',
      age: 80,
      workType: '병원 동행',
      address: '서울 강남구 댕댕동',
      grade: '등급 위험',
    },
    {
      name: '박군자',
      gender: '여성',
      age: 90,
      workType: '주야긴 보호',
      address: '서울 강남구 왕왕동',
      grade: '등급 없음',
    },
    {
      name: '박임자',
      gender: '여성',
      age: 102,
      workType: '입주 요양',
      address: '서울 강남구 야옹동',
      grade: '등급 없음',
    },
  ];

  const [selectedCard, setSelectedCard] = useState(-1);
  const { setPatientName, setPatient } = patientStore();

  const handleCheck = (idx) => {
    setSelectedCard((prev) => (prev === idx ? -1 : idx));
  };

  // const renderInfoCard = () =>
  //   [...Array(5)].map((_, idx) => (
  //     <InfoCard
  //       key={idx}
  //       isChecked={selectedCard === idx}
  //       onCheck={() => handleCheck(idx)}
  //       checkFunc={setSelectedCard}
  //     />
  //   ));
  const renderInfoCard = () =>
    tempUsers.map((_, idx) => (
      <InfoCard
        key={idx}
        isChecked={selectedCard === idx}
        onCheck={() => handleCheck(idx)}
        checkFunc={setSelectedCard}
        user={tempUsers[idx]}
      />
    ));

  return (
    <>
      <div className='mx-auto px-[1.5rem] flex flex-col items-center max-w-2xl mb-40'>
        <p className='font-bold text-xl tracking-[-0.1rem] py-8 w-full mx-auto text-start pl-1'>
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
              setPatientName(tempUsers[selectedCard].name);
              setPatient(tempUsers[selectedCard]);
              window.scrollTo(0, 0);
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
