import { useState, useEffect } from 'react';

import { request } from '@/api';
import { Button } from '@/components/ui/custom/Button';
import { Input } from '@/components/ui/custom/input';
import InfoCard from '@/components/ui/temp/InfoCard';
import patientStore from '@/store/jbStore/patientStore';

import serach from '@/assets/images/search.png';

export default function MatchingManage({ handleMatchingPage }) {
  const tempUsers = [
    {
      patientSeq: 1,
      imgAddress: null,
      name: '박순자',
      genderStr: '여성',
      age: 50,
      workType: '방문 요양',
      address: '서울 강남구 멍멍동',
      careLevelStr: '등급 없음',
      inmateStateStr: '배우자와 동거, 돌봄 시간 중 집에 있음',
    },
    {
      patientSeq: 5,
      name: '박양자',
      genderStr: '남성',
      age: 80,
      workType: '병원 동행',
      address: '서울 강남구 댕댕동',
      careLevelStr: '등급 위험',
    },
    {
      patientSeq: 9,
      name: '박군자',
      genderStr: '여성',
      age: 90,
      workType: '주야간 보호',
      address: '서울 강남구 왕왕동',
      careLevelStr: '등급 없음',
    },
    {
      patientSeq: 11,
      name: '박임자',
      genderStr: '여성',
      age: 102,
      workType: '입주 요양',
      address: '서울 강남구 야옹동',
      careLevelStr: '등급 없음',
    },
  ];

  const [selectedSeq, setSelectedSeq] = useState(-1);
  const [searchQuery, setSearchQuery] = useState('');
  // const [elders, setElders] = useState([]);
  const [elders, setElders] = useState(tempUsers);

  const { setPatient } = patientStore();

  // useEffect(() => {
  //   getElderList;
  // }, []);

  const handleCheck = (idx) => {
    setSelectedSeq((prev) => (prev === idx ? -1 : idx));
  };

  const getElderList = () =>
    request('get', `/patient/list?pageNo=${1}&pageSize=${10}`)
      .then((res) => {
        setElders(res.list);
      })
      .catch((e) => console.error(e));

  const renderInfoCard = () => {
    if (elders) {
      return elders
        .filter((x) => x.name.includes(searchQuery))
        .map((filteredUser, idx) => (
          <InfoCard
            key={idx}
            isChecked={selectedSeq === filteredUser.patientSeq}
            onCheck={() => {
              handleCheck(filteredUser.patientSeq);
              setPatient(filteredUser);
            }}
            // checkFunc={setSelectedCard}
            user={filteredUser}
          />
        ));
    }
  };

  const setPatientDetail = () => {
    request('get', `/patient/${selectedSeq}/detail`)
      .then((res) => {
        setPatient({ ...res, patientSeq: selectedSeq });
        window.scrollTo(0, 0);
        handleMatchingPage((prev) => prev + 1);
      })
      .catch((e) => console.error(e));
  };

  return (
    <>
      <div className='mx-auto px-[1.5rem] flex flex-col items-center max-w-2xl mb-40'>
        <div className='w-full py-3.5 border-b border-[var(--main)] flex items-center pr-6'>
          <Input
            placeholder={'어르신 이름을 검색해 보세요'}
            className='border-0 text-xl flex-1 p-0 text-[#6C6C6C] focus:outline-none'
            width='100%'
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <img src={serach} alt='search' className='size-6' />
        </div>
        <p className='font-bold text-xl tracking-[-0.1rem] py-8 w-full mx-auto text-start pl-1'>
          매칭이 필요한 어르신을 선택해주세요!
        </p>
        {renderInfoCard()}
        <Button
          variant={selectedSeq === -1 ? 'disabled' : 'default'}
          className='h-16 w-9/10 hover:bg-[var(--company-primary)]/90 fixed bottom-8 font-bold'
          disabled={selectedSeq === -1}
          onClick={() => {
            // setPatientDetail();
            handleMatchingPage((prev) => {
              window.scrollTo(0, 0);
              return prev + 1;
            });
          }}
        >
          {selectedSeq === -1 ? '어르신을 선택해야 넘어갈 수 있어요!' : '다음'}
        </Button>
      </div>
    </>
  );
}
