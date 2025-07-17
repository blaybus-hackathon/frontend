// ✅ 1. 외부 라이브러리 (React 및 패키지)
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

// ✅ 2. 상태 관리 (스토어, 컨텍스트 등)
import useScheduleStore from '@/store/suho/useScheduleStore';
import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';

// ✅ 3. UI 컴포넌트 (공통 UI → 커스텀 컴포넌트 순)
import { Button } from '@/components/ui/custom/Button';

// ✅ 4. 이미지 및 정적 파일
import location_icon from '@/assets/images/location.png';
import overview from '@/assets/images/overview.png';
import backarrow from '@/assets/images/back-arrow.png';
import homecontrols from '@/assets/images/home-controls.png';

//temp
import useProfileStore from '@/store/useProfileStore';

export default function Account() {
  const { optimizedSchedule } = useScheduleStore();
  const PAY_TYPES = [
    { id: 'hourly', label: '시급' },
    { id: 'daily', label: '일급' },
    { id: 'weekly', label: '주급' },
    { id: 'monthly', label: '월급' },
  ];

  const navigate = useNavigate();

  const { profileEdit } = useProfileStore();
  const setHeaderProps = useHeaderPropsStore((state) => state.setHeaderProps);
  const clearHeaderProps = useHeaderPropsStore((state) => state.clearHeaderProps);

  useEffect(() => {
    setHeaderProps({
      type: 'back',
      title: '나의 계정',
      onBack: () => {
        navigate(-1);
      },
    });
    return () => {
      clearHeaderProps();
    };
  }, []);

  const handleEdit = () => {
    navigate('/helper/account/edit', {
      state: { from: '/helper/account' },
    });
  };

  return (
    <>
      <main className='max-w-md mx-auto flex flex-col '>
        {/* 기본 정보 */}
        <section className='flex flex-col items-stretch gap-12 mt-6'>
          {/* 프로필 이미지 */}
          <section className='flex items-center gap-12 '>
            <div className='relative w-24 h-24'>
              <img
                src={profileEdit.profileImage || '/defaultProfile.png'}
                alt='profile_image'
                className='w-24 h-24 rounded-full bg-[#DCDCDC]'
              />
            </div>
            <div className='flex flex-col gap-5 items-start'>
              <span className='text-[#191919] text-[23px] font-bold leading-none h-auto '>
                {profileEdit.name || '알수 없음'}
              </span>
              <span className='text-[#191919] font-pretendard text-[20px] font-medium leading-none '>
                {profileEdit.address || '주소 불명'}
              </span>
            </div>
          </section>

          {/* 자기 소개 섹션 */}
          <section className='helper-section'>
            <span className='helper-title'>자기소개</span>
            <div
              className='
  text-left
    resize-none overflow-hidden min-h-[4rem] self-stretch
    p-[26px_17px]
    rounded-[10px] border border-[#C8C8C8] bg-white
  '
            >
              <span
                className={`
      ${profileEdit.introduction ? 'text-[#191919]' : 'text-[#C8C8C8]'}
       profile-section__content-text 
    `}
              >
                {profileEdit.introduction || '소개 없음'}
              </span>
            </div>
          </section>

          {/* 간병 경력 섹션 */}
          <section className='helper-section'>
            <span className='helper-title'>간병경력이 있으신가요?</span>

            <div className='profile-section__content-box justify-center'>
              <span className='profile-section__content-text'>
                {profileEdit.careExperience || '신입'}
              </span>
            </div>
          </section>

          {/* 선호 지역 섹션 */}
          <section className='helper-section'>
            <span className='helper-title'>선호지역</span>

            <div className='profile-section__content-box'>
              <img className='w-[24px] h-[24px]' src={location_icon} alt='location_icon' />
              <div className='flex items-center gap-1 py-1'>
                {Object.entries(profileEdit.location).length > 0 ? (
                  <span className='flex flex-col  gap-2'>
                    {Object.entries(profileEdit.location).map(([city, districts]) =>
                      Object.entries(districts).map(([district, subDistricts]) => (
                        <div
                          key={`${city}-${district}`}
                          className='flex profile-section__content-text gap-4'
                        >
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
          </section>

          {/* 나의 근무 가능 일정 섹션 */}
          <section className='helper-section'>
            <span className='helper-title'>나의 근무 가능 일정</span>
            <div className='profile-section__content-box'>
              <img className='w-[24px] h-[24px] ' src={location_icon} alt='location_icon' />

              <div>
                {optimizedSchedule().length > 0 ? (
                  optimizedSchedule().map((item, index) => (
                    <div key={index} className='flex items-center gap-4 py-1'>
                      <span className='profile-section__content-text'>{item.days}</span>
                      <img src={backarrow} alt='backarrow' className='w-4 h-4 rotate-180' />
                      <span className='profile-section__content-text'>{item.time}</span>
                    </div>
                  ))
                ) : (
                  <span className='profile-section__content-text'>
                    설정된 근무 가능 시간이 없습니다.
                  </span>
                )}
              </div>
            </div>
          </section>

          {/* 급여 섹션 */}
          <section className='helper-section'>
            <span className='helper-title'>나의 희망급여</span>
            <div className='profile-section__content-box'>
              <img className='w-[24px] h-[24px]' src={overview} alt='overview_icon' />
              <span className='profile-section__content-text'>
                {PAY_TYPES.find((t) => t.id === profileEdit.pay.type)?.label || ''}
              </span>
              <img src={backarrow} alt='backarrow' className='w-4 h-4 rotate-180' />
              <span className='profile-section__content-text'>{profileEdit.pay.amount}원</span>
            </div>
          </section>

          {/* 돌봄 유형 섹션*/}
          <section className='helper-section'>
            <span className='helper-title'>나의 희망 돌봄유형</span>

            <div className='profile-section__content-box'>
              <img className='w-[24px] h-[24px]' src={homecontrols} alt='homeControls_icon' />
              <span className='profile-section__content-text'>
                {profileEdit.careTypes.workTypes.length > 0
                  ? profileEdit.careTypes.workTypes.map((item) => item.label).join(', ')
                  : '설정되지 않음'}
              </span>
            </div>
          </section>

          {/* 자격증 등록 섹션*/}
          <section className='helper-section'>
            <span className='helper-title'>나의 소지 자격증</span>

            <div className='profile-section__content-box'>
              <img className='w-[24px] h-[24px]' src={homecontrols} alt='homeControls_icon' />
              <span className='profile-section__content-text'>
                {Object.entries(profileEdit.selectedOptions || {})
                  .filter(([_, value]) => value)
                  .map(([key]) => key)
                  .join(', ') || '설정되지 않음'}
              </span>
            </div>
          </section>
        </section>
        <Button variant='white' onClick={handleEdit} className='m-6'>
          수정하기
        </Button>
      </main>
    </>
  );
}
