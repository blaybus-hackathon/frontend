import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Header from '@/components/ui/temp/Header';
import useHelperLocationStore from '@/store/suho/useHelperLocationStore';

const LOCATION_DATA = {
  서울: { 은평구: ["불광", "응암", "역촌"], 강남구: ["삼성", "대치", "역삼"] },
  충청남도: { 천안시: ["불당동", "성정동"], 아산시: ["온양1동", "온양2동"] }
};

export default function LocationSelector() {
  const { selectedDistricts, addDistrict, removeDistrict, resetDistricts, getTotalSelectedCount } =
    useHelperLocationStore();
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  return (
    <main className='max-w-md mx-auto flex flex-col items-center gap-4 p-4'>
      <div className='w-full flex items-center justify-between'>
        <Header title='선호 지역 선택' />
        <Button variant='ghost' onClick={resetDistricts} className='text-gray-500 hover:text-gray-700'>
          초기화
        </Button>
      </div>

      {/* 1단계: 도시 선택 */}
      {!selectedCity ? (
        <div className='w-full grid grid-cols-3 gap-2'>
          {Object.keys(LOCATION_DATA).map((city) => (
            <Button
              key={city}
              onClick={() => setSelectedCity(city)}
              className='h-[4.1875rem] text-lg rounded-[0.625rem]'
            >
              {city}
            </Button>
          ))}
        </div>
      ) : null}

      {/* 2단계: 구/군 선택 */}
      {selectedCity && !selectedDistrict ? (
        <div className='w-full grid grid-cols-3 gap-2'>
          {Object.keys(LOCATION_DATA[selectedCity]).map((district) => (
            <Button
              key={district}
              onClick={() => setSelectedDistrict(district)}
              className='h-[3.5rem] text-base rounded-lg'
            >
              {district}
            </Button>
          ))}
        </div>
      ) : null}

      {/* 3단계: 동 선택 */}
      {selectedCity && selectedDistrict ? (
        <div className='w-full grid grid-cols-3 gap-2'>
          {LOCATION_DATA[selectedCity][selectedDistrict].map((subDistrict) => {
            const isSelected =
              selectedDistricts[selectedCity]?.[selectedDistrict]?.includes(subDistrict);
            return (
              <Button
                key={subDistrict}
                onClick={() =>
                  isSelected
                    ? removeDistrict(selectedCity, selectedDistrict, subDistrict)
                    : addDistrict(selectedCity, selectedDistrict, subDistrict)
                }
                className={`h-[3.5rem] text-base rounded-lg ${
                  isSelected ? 'bg-blue-500 text-white' : 'bg-white text-black border border-gray-300'
                }`}
              >
                {subDistrict}
              </Button>
            );
          })}
        </div>
      ) : null}

      {/* 선택된 지역 출력 */}
      <div className='w-full text-left space-y-2'>
        <span className='block'>나의 선호지역</span>
        <span className='block'>({getTotalSelectedCount()}/5)</span>
        <span className='block'>
          {Object.entries(selectedDistricts)
            .flatMap(([city, districts]) =>
              Object.entries(districts).flatMap(([district, subDistricts]) =>
                subDistricts.map((sub) => `${city} - ${district} (${sub})`)
              )
            )
            .join(', ') || '선택된 지역이 없습니다'}
        </span>
      </div>

      {/* 뒤로가기 버튼 */}
      {(selectedCity || selectedDistrict) && (
        <Button className='w-full' onClick={() => (selectedDistrict ? setSelectedDistrict(null) : setSelectedCity(null))}>
          선택하기
        </Button>
      )}
    </main>
  );
}
