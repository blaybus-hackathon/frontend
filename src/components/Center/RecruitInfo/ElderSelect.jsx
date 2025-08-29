// === Post Recruit Page 1 ===
import { useState, useEffect, useRef, useMemo } from 'react';

import { Button } from '@/components/ui/custom/Button';
import { Input } from '@/components/ui/custom/input';
import { handleApiError } from '@/utils/handleApiError';
import { getElderList, getElderDetail } from '@/services/center';

import { usePatientStore } from '@/store/center/usePatientStore';
import { useCareConstantsStore, initializeCareConstants } from '@/store/useCareMappingStore';

import ElderInfoCard from '@/components/ui/InfoCard/ElderInfoCard';
import serach from '@/assets/images/search.png';

export default function ElderSelect({ handleMatchingPage }) {
  const buttonRef = useRef(null);
  const [selectedSeq, setSelectedSeq] = useState(-1);
  const [searchQuery, setSearchQuery] = useState('');
  const [elders, setElders] = useState([]);

  const { setFields, setCareData } = usePatientStore();
  const { getCareNameByIds } = useCareConstantsStore();

  useEffect(() => {
    initializeCareConstants();
    loadElderList();
  }, []);

  const loadElderList = async () => {
    try {
      const response = await getElderList({ pageNo: 0, pageSize: 100 });

      if (response && Array.isArray(response.list)) {
        setElders(response.list);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      handleApiError(
        error,
        {
          4008: '어르신 목록을 찾을 수 없습니다.',
          7000: '조회 권한이 없습니다.',
        },
        '어르신 목록을 불러오는 중 오류가 발생했습니다.',
        true,
        true,
      );
      setElders([]);
    }
  };

  const filteredElders = useMemo(
    () => (Array.isArray(elders) ? elders.filter((x) => x.name.includes(searchQuery)) : []),
    [elders, searchQuery],
  );

  const hasSearchResults = filteredElders.length > 0;

  const handleSelectedCard = (elder) => {
    setSelectedSeq((prev) => (prev === elder.patientSeq ? -1 : elder.patientSeq));

    // 기본 정보 설정
    setFields({
      imgAddress: elder.imgAddress,
      patientSeq: elder.patientSeq,
      name: elder.name,
      gender: elder.genderStr === '남성' ? 1 : 2,
      address: elder.address,
    });

    // 버튼으로 자동 스크롤
    buttonRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  };

  const setPatientDetail = async () => {
    if (selectedSeq === -1) return;

    try {
      const response = await getElderDetail(selectedSeq);
      if (!response) throw new Error('No elder data');

      const careChoice = response.careChoice || {};

      setFields({
        name: response.name,
        afSeq: response.afSeq,
        asSeq: response.asSeq,
        atSeq: response.atSeq,
        birthDate: response.birthDate,
        weight: response.weight,
        diseases: response.diseases,
        timeList: response.timeList || [],
        timeNegotiation: response.timeNegotiation,
      });

      setCareData(careChoice, getCareNameByIds);

      window.scrollTo(0, 0);
      handleMatchingPage((prev) => prev + 1);
    } catch (error) {
      handleApiError(
        error,
        {
          4008: '어르신 목록을 찾을 수 없습니다.',
          7000: '조회 권한이 없습니다.',
        },
        '어르신 목록을 불러오는 중 오류가 발생했습니다.',
        true,
        true,
      );
    }
  };

  const renderInfoCard = () => {
    if (!elders || !Array.isArray(elders)) return <div>어르신 목록을 불러오는 중입니다...</div>;

    return filteredElders.map((elder, idx) => (
      <ElderInfoCard
        key={idx}
        isChecked={selectedSeq === elder.patientSeq}
        onClick={() => handleSelectedCard(elder)}
        user={elder}
      />
    ));
  };

  return (
    <article className='flex flex-col mb-10 w-full min-h-[calc(100vh-10rem)] flex-grow justify-between'>
      <section className='flex flex-col items-center space-y-5'>
        {/* 검색 바 */}
        <div className='w-full pt-3.5 border-b border-[var(--main)] flex items-center pl-1 pr-3'>
          <Input
            placeholder={'어르신 이름을 검색해 보세요'}
            className='border-0 text-lg flex-1 p-0 text-[#6C6C6C] focus:outline-none'
            width='100%'
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <img src={serach} alt='search' className='size-6' />
        </div>

        {renderInfoCard()}
      </section>

      {hasSearchResults && (
        <Button
          ref={buttonRef}
          variant={selectedSeq === -1 ? 'disabled' : 'default'}
          className='h-16 w-full hover:bg-[var(--main)]/90 font-bold'
          disabled={selectedSeq === -1}
          onClick={setPatientDetail}
        >
          {selectedSeq === -1 ? '어르신을 선택해야 넘어갈 수 있어요!' : '다음'}
        </Button>
      )}
    </article>
  );
}
