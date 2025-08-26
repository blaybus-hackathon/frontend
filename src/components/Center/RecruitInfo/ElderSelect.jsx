// === Post Recruit Page 1 ===
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/custom/Button';
import { Input } from '@/components/ui/custom/input';
import InfoCard from '@/components/ui/temp/InfoCard';
import patientStore from '@/store/jbStore/patientStore';
import { getElderList, getElderDetail } from '@/services/center';

import serach from '@/assets/images/search.png';

export default function MatchingManage({ handleMatchingPage }) {
  const [selectedSeq, setSelectedSeq] = useState(-1);
  // const [isChecked, setIsChecked] = useState(-1);
  const [searchQuery, setSearchQuery] = useState('');
  const [elders, setElders] = useState([]);

  const { setPatient } = patientStore();

  useEffect(() => {
    fetchElderList();
  }, []);

  const handleCheck = (idx) => {
    setSelectedSeq((prev) => (prev === idx ? -1 : idx));
  };

  const fetchElderList = async () => {
    try {
      const res = await getElderList({ pageNo: 0, pageSize: 100 });
      setElders(res.list);
    } catch (e) {
      console.error(e);
    }
  };

  const renderInfoCard = () => {
    if (elders) {
      return elders
        .filter((x) => x.name.includes(searchQuery))
        .map((filteredUser, idx) => (
          <InfoCard
            key={idx}
            isChecked={selectedSeq === filteredUser.patientSeq}
            onClick={() => {
              handleCheck(filteredUser.patientSeq);
              setPatient(filteredUser);
            }}
            user={filteredUser}
          />
        ));
    }
  };

  const setPatientDetail = async () => {
    try {
      const res = await getElderDetail(selectedSeq);
      setPatient({ ...res, patientSeq: selectedSeq });
      window.scrollTo(0, 0);
      handleMatchingPage((prev) => prev + 1);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className='mx-auto flex flex-col items-center max-w-2xl mb-40'>
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
          className='h-16 max-w-2xl hover:bg-[var(--company-primary)]/90 fixed bottom-[5rem] font-bold'
          disabled={selectedSeq === -1}
          onClick={() => {
            setPatientDetail();
          }}
        >
          {selectedSeq === -1 ? '어르신을 선택해야 넘어갈 수 있어요!' : '다음'}
        </Button>
      </div>
    </>
  );
}
