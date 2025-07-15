// ✅ 1. 외부 라이브러리 (React 및 패키지)
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ✅ 2. 상태 관리 (스토어, 컨텍스트 등)
import useProfileStore from '@/store/useProfileStore';
import useHelperLocationStore from '@/store/suho/useHelperLocationStore';
import useScheduleStore from '@/store/suho/useScheduleStore';
import usePayStore from '@/store/suho/usePayStore';
import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';

// ✅ 3. UI 컴포넌트 (공통 UI → 커스텀 컴포넌트 순)
import { Button } from '@/components/ui/custom/Button';

// ✅ 4. 레이아웃 컴포넌트 (Header, Footer 등)
import CareTypeSection from '@/pages/helper/AccountEdit/CareTypeSection ';
import CareExperienceSelector from '@/pages/helper/AccountEdit/CareerSection';
import IntroductionInput from '@/pages/helper/AccountEdit/IntroSection';
import LocationSection from '@/pages/helper/AccountEdit/LocationSection';
import BaseSection from '@/pages/helper/AccountEdit/BaseSection';
import CertificateSection from '@/pages/helper/AccountEdit/CertificateSection';
import PaySection from '@/pages/helper/AccountEdit/PaySection';
import ScheduleSection from './ScheduleSection';

export default function AccountEdit() {
  const navigate = useNavigate();

  const { updateProfile, syncLocation } = useProfileStore();
  const { selectedDistricts } = useHelperLocationStore(); // 상태만 가져옴
  const { schedule, consult, optimizedSchedule } = useScheduleStore();
  const { pay } = usePayStore();
  const setHeaderProps = useHeaderPropsStore((state) => state.setHeaderProps);
  const clearHeaderProps = useHeaderPropsStore((state) => state.clearHeaderProps);

  useEffect(() => {
    setHeaderProps({ type: 'back', title: '나의 계정' });
    return () => {
      clearHeaderProps();
    };
  });
  // TODO : subscribe 변경 고민
  useEffect(() => {
    syncLocation();
  }, [selectedDistricts, schedule, pay, consult]);

  const handleSave = async () => {
    try {
      // 모든 Store의 현재 상태로 새 프로필 생성
      const newProfile = {
        // ...editedProfile,
        // pay: {
        //   amount: selectedPay,
        //   type: payType,
        // },
        // careTypes: selectedTypes,
        // locations: selectedDistricts,
        // schedules: schedules,
      };

      console.log('저장할 프로필 정보:', newProfile); // 저장될 정보 확인

      // 한 번에 저장
      updateProfile(newProfile);
      navigate('/helper/account');
    } catch (error) {
      console.error('프로필 저장 실패:', error);
    }
  };

  const handleCancel = () => {
    navigate('/helper/account');
  };

  return (
    <main className='max-w-md mx-auto flex flex-col  '>
      {/* 프로필 섹션 */}
      <section className='flex flex-col items-stretch gap-12 mt-6'>
        {/* 기본 정보 섹션 */}
        <BaseSection />

        {/* 자기소개 섹션 */}
        <IntroductionInput />

        {/* 간병 경력 섹션 */}
        <CareExperienceSelector />

        {/* 나의 선호 지역 섹션 */}
        <LocationSection selectedDistricts={selectedDistricts} />

        {/* 나의 근무 가능 일정 섹션 */}
        {/* 클릭이벤트 */}
        <ScheduleSection optimize={optimizedSchedule} consult={consult} />

        {/* 급여 섹션 */}
        {/* 클릭이벤트 */}
        <PaySection pay={pay} />

        {/* 돌봄 유형 섹션*/}
        <CareTypeSection />

        {/* 자격증 등록 섹션*/}
        <CertificateSection />

        {/* 저장/취소 버튼 */}
        <div className='flex gap-2 mb-6'>
          <Button type='button' variant='default' onClick={handleSave} className='flex-1'>
            저장
          </Button>
          <Button type='button' variant='white' className='flex-1' onClick={handleCancel}>
            취소
          </Button>
        </div>
        {/* <Button type='button' onClick={handleTest} /> */}
      </section>
    </main>
  );
}
