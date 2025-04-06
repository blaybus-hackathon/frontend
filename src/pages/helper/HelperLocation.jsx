import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

import Header from '@/components/ui/temp/Header';
import useHelperLocationStore from '@/store/suho/useHelperLocationStore';

const CITY_OPTIONS = [
  '서울',
  '인천',
  '부산',
  '대구',
  '대전',
  '광주',
  '울산',
  '경기',
  '강원',
  '충북',
  '충남',
  '전북',
  '전남',
  '경북',
  '경남',
  '제주',
  '세종',
];

export default function HelperLocation() {
  const navigate = useNavigate();
  const { selectedDistricts } = useHelperLocationStore(); //선택한 지역 가져오기
  const { resetLocations } = useHelperLocationStore(); //지역 초기화

  // 전체 선택된 구/군 개수
  const getTotalSelectedCount = () => {
    return Object.values(selectedDistricts).reduce(
      (total, districts) => total + districts.length,
      0,
    );
  };

  return (

    <main className='max-w-md mx-auto flex flex-col items-center gap-4 p-4'>
      <div className='w-full flex items-center justify-between'>
        <Header title='선호 지역' />
        <Button
          variant='ghost'
          onClick={resetLocations}
          className='text-gray-500 hover:text-gray-700'
        >
          초기화
        </Button>
      </div>

      <div className='text-left space-y-2'>
        <span className='block'>나의 선호 지역을 설정해 주세요!</span>
        <span className='block'>돌봄워크가 나에게 맞는 일자리를 소개시켜 드릴게요.</span>
        <span className='block'>(최대 5개 지역 선택 가능)</span>
      </div>

      <div className='w-full grid grid-cols-3 gap-2'>
        {CITY_OPTIONS.map((city) => (
          <Button
            key={city}
            onClick={() => navigate(`/helper/location/${city}`)}
            className='h-[4.1875rem] text-lg tracking-[-0.0125rem] rounded-[0.625rem]'
          >
            {city}
          </Button>
        ))}
      </div>

      <div className='w-full text-left space-y-2'>
        <span className='block'>나의 선호지역</span>
        <span className='block'>({getTotalSelectedCount()}/5)</span>
        <span className='block'>
          {Object.entries(selectedDistricts)
            .map(([city, districts]) =>
              districts.length > 0 ? `${city}(${districts.join(', ')})` : null,
            )
            .filter(Boolean)
            .join(', ') || '선택된 지역이 없습니다'}
        </span>
      </div>

      <Button
        className='w-full'
        disabled={getTotalSelectedCount() === 0}
        onClick={() => navigate('/helper/account/edit')}
      >
        선호지역 저장하기
      </Button>
    </main>
  );
}
