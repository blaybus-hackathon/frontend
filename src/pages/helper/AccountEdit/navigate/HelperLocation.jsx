import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/custom/Button';
import { useNavigate } from 'react-router-dom';
import location_icon from '@/assets/images/location.png';
import useHelperLocationStore from '@/store/suho/useHelperLocationStore';
import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';
import backarrow from '@/assets/images/back-arrow.png';
import { request } from '@/api';

export default function LocationSelector() {
  const navigate = useNavigate();
  const { selectedDistricts, addDistrict, removeDistrict, resetDistricts, getTotalSelectedCount } =
    useHelperLocationStore();
  const setHeaderProps = useHeaderPropsStore((state) => state.setHeaderProps);
  const clearHeaderProps = useHeaderPropsStore((state) => state.clearHeaderProps);

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState({});
  const [subDistricts, setSubDistricts] = useState({});

  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedSubDistrict, setselectedSubDistrict] = useState(null);

  useEffect(() => {
    // 도/시 가져오기
    // axios
    //   .get('http://localhost:8080/api/get-first-addr', {
    //     withCredentials: true,
    //   })
    request('get', '/get-first-addr')
      .then((res) => setCities(res))
      .catch((err) => console.error('도시 목록 불러오기 실패', err));

    // header 정보 저장
    setHeaderProps({ type: 'back', title: '선호 지역', resetFunc: resetAll });
    return () => {
      clearHeaderProps();
    };
  }, []);

  // 구/군 가져오기
  const fetchDistricts = async (cityId) => {
    request('get', `/second/${cityId}`)
      .then((res) => {
        setDistricts((prev) => ({ ...prev, [cityId]: res }));
      })
      .catch((error) => {
        console.error('구/군 목록 불러오기 실패', error);
      });
  };

  // 동 가져오기
  const fetchSubDistricts = async (districtId) => {
    request('get', `/third/${districtId}`)
      .then((res) => {
        setSubDistricts((prev) => ({ ...prev, [districtId]: res }));
      })
      .catch((error) => {
        console.error('동 목록 불러오기 실패', error);
      });
  };

  const handleClick = () => {
    if (!selectedCity && !selectedDistrict) {
      navigate('/helper/account/edit');
    } else if (selectedDistrict) {
      setSelectedDistrict(null); // 구/군 선택 상태 -> 도시 선택으로 돌아감
    } else {
      setSelectedCity(null); // 도시 선택 상태 -> 도시 선택 해제
    }
  };

  // 모든 주소 선택 초기화
  const resetAll = () => {
    resetDistricts();
  };

  return (
    <main className='max-w-md mx-auto flex flex-col items-center gap-4 py-10'>
      <section className=''>
        <div className='flex flex-col items-start gap-2.5 self-stretch mb-14'>
          <span className='helper-title text-left'>나의 선호하는 지역을 설정해 주세요!</span>
          <span className='helper-subtitle text-left '>
            돌봄워크가 나에게 맞는 일자리를 소개시켜 드릴게요. (최대 5개 지역 선택 가능)
          </span>
        </div>
        <div className='space-y-4 mb-22.5'>
          {!selectedCity && (
            <div className='w-full grid grid-cols-3 gap-5'>
              {cities.map((city) => (
                <Button
                  variant='black'
                  key={city.id}
                  onClick={() => {
                    setSelectedCity(city);
                    fetchDistricts(city.id);
                  }}
                  className={`font-normal rounded-[0.625rem] mb-0 w-full border border-[var(--outline)] ${
                    city.name.length > 5 ? 'text-sm' : 'text-lg'
                  }`}
                >
                  {city.name}
                </Button>
              ))}
            </div>
          )}

          {selectedCity && !selectedDistrict && (
            <div className='w-full grid grid-cols-3 gap-2'>
              {Object.values(districts[selectedCity.id] || []).map((district) => {
                const isWholeButton = district.id === parseInt(`${selectedCity.id}000`, 10);

                const selectedDistrictsOfCity = selectedDistricts[selectedCity.name] || {};
                const isWholeAlreadySelected = Object.keys(selectedDistrictsOfCity).some((name) =>
                  name.includes('전체'),
                );

                const isSelected =
                  selectedDistricts[selectedCity.name]?.[district.name]?.includes(district.name) &&
                  !isWholeButton;

                const isDisabled = !isWholeButton && isWholeAlreadySelected;

                return (
                  <Button
                    variant='black'
                    key={district.id}
                    disabled={isDisabled}
                    onClick={() => {
                      if (isDisabled) {
                        return; // disabled 상태면 아무것도 하지 않음
                      }

                      //전체버튼 선택시
                      if (isWholeButton) {
                        if (!isWholeAlreadySelected) {
                          //전체 버튼 이미 선택 됨
                          const cityToUpdate = selectedCity.name;

                          // 해당 도시의 모든 구/군 선택 정보 삭제
                          const updatedSelectedDistricts = {
                            ...selectedDistricts,
                          };
                          if (updatedSelectedDistricts[cityToUpdate]) {
                            delete updatedSelectedDistricts[cityToUpdate];
                            useHelperLocationStore.setState({
                              selectedDistricts: updatedSelectedDistricts,
                            });
                          }
                          addDistrict(selectedCity.name, district.name, district.name);
                        } else {
                          removeDistrict(selectedCity.name, district.name, district.name);
                        }
                      } else {
                        setSelectedDistrict(district);
                        fetchSubDistricts(district.id);
                      }
                    }}
                    className={`text-lg rounded-[0.625rem] mb-0 w-full font-normal 
                        ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''} ${
                      district.name.length <= 5 && 'text-lg'
                    }
                      `}
                    style={
                      district.name.length > 5 ? { fontSize: `${21 - district.name.length}px` } : {}
                    }
                  >
                    {district.name}
                  </Button>
                );
              })}
            </div>
          )}

          {selectedCity && selectedDistrict && (
            <div className='w-full grid grid-cols-3 gap-2'>
              {Object.values(subDistricts[selectedDistrict.id] || []).map((sub) => {
                const selectedDistrictsArray =
                  selectedDistricts[selectedCity.name]?.[selectedDistrict.name] || [];

                const isSelected = selectedDistrictsArray.includes(sub.name);

                const isWholeSelected = selectedDistricts[selectedCity.name]?.[
                  selectedDistrict.name
                ]?.some((district) => district.includes('전체'));

                const isSubDistrictDisabled = isWholeSelected && !isSelected;
                const isWholeSubDistrictButton = sub.name.includes('전체');

                const isCityWholeSelectButton =
                  sub.id === parseInt(`${selectedDistrict.id}000`, 10);

                return (
                  <Button
                    variant='black'
                    key={sub.id}
                    disabled={isSubDistrictDisabled}
                    onClick={() => {
                      console.log(isSubDistrictDisabled);
                      if (!isSubDistrictDisabled) {
                        if (isWholeSubDistrictButton) {
                          // "동 전체" 버튼 클릭 시
                          const cityToRemoveFrom = selectedCity.name;
                          const districtToRemoveFrom = selectedDistrict.name;

                          // 기존 선택된 동들 모두 제거
                          const updatedSelectedDistricts = {
                            ...selectedDistricts,
                          };
                          if (
                            updatedSelectedDistricts[cityToRemoveFrom] &&
                            updatedSelectedDistricts[cityToRemoveFrom][districtToRemoveFrom]
                          ) {
                            delete updatedSelectedDistricts[cityToRemoveFrom][districtToRemoveFrom];
                            useHelperLocationStore.setState({
                              selectedDistricts: updatedSelectedDistricts,
                            });
                          }
                        }
                        if (isSelected) {
                          removeDistrict(selectedCity.name, selectedDistrict.name, sub.name);
                        } else {
                          addDistrict(selectedCity.name, selectedDistrict.name, sub.name);
                        }
                      }
                    }}
                    className={`text-lg rounded-[0.625rem] mb-0 w-full font-normal ${
                      isSelected
                        ? 'bg-[var(--main)] text-white'
                        : isSubDistrictDisabled
                        ? 'opacity-50 cursor-not-allowed'
                        : 'text-black'
                    }`}
                    style={sub.name.length > 5 ? { fontSize: `${21 - sub.name.length}px` } : {}}
                  >
                    {sub.name}
                  </Button>
                );
              })}
            </div>
          )}
        </div>
        {/* 선택된 지역 출력 */}
        <div className='flex flex-col items-start gap-2.5 self-stretch mb-10'>
          <span className='helper-title text-left'>
            나의 선호 지역 <span className='helper-subtitle'>({getTotalSelectedCount()}/5)</span>
          </span>
          <span className='helper-subtitle text-left'>나의 선호지역을 선택해 주세요.</span>
        </div>

        <div className='profile-section__content-box mb-10'>
          <img className='w-[24px] h-[24px]' src={location_icon} alt='location_icon' />

          <div className='flex items-center gap-1 py-1'>
            {Object.entries(selectedDistricts).length > 0 ? (
              <span className='flex flex-col  gap-2'>
                {Object.entries(selectedDistricts).map(([city, districts]) =>
                  Object.entries(districts).map(([district, subDistricts]) => (
                    <div key={`${city}-${district}`} className='flex gap-4 text-xs'>
                      {city}
                      <img
                        src={backarrow}
                        alt='backarrow'
                        className='w-4 h-4 rotate-180 inline-block mx-1'
                      />
                      {district} ({subDistricts.join(', ')})
                    </div>
                  )),
                )}
              </span>
            ) : (
              <span className='profile-section__content-text'>미설정</span>
            )}
          </div>
        </div>

        {/* 뒤로가기 버튼 */}
        <Button
          className='w-full'
          onClick={handleClick}
          disabled={getTotalSelectedCount() > 5 && !(selectedCity || selectedDistrict)}
        >
          선호지역 저장하기
        </Button>
        {getTotalSelectedCount() > 5 && (
          <p className='text-red-500 text-sm text-center'>최대 5개까지만 선택할 수 있습니다.</p>
        )}
      </section>
    </main>
  );
}
