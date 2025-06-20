import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';
import { useCenterRegiStepStore } from '@/store/center/useCenterRegiStepStore';
import { CENTER_REGISTRATION_STEPS } from '@/constants/registrationSteps';

import CenterBasicInfo from '@/components/Center/CenterRegister/CenterBasicInfo';
import CenterAdditionalInfo from '@/components/Center/CenterRegister/CenterAdditionalInfo';
import CenterRegiComplete from '@/components/Center/CenterRegister/CenterRegiComplete';

const COMPONENTS = [CenterBasicInfo, CenterAdditionalInfo, CenterRegiComplete];

function CurrentStepComponent() {
  const currentIndex = useCenterRegiStepStore((state) => state.currentIndex);
  const StepComponent = COMPONENTS[currentIndex];

  return <StepComponent />;
}

export default function CenterRegister() {
  const navigate = useNavigate();
  const setHeaderProps = useHeaderPropsStore((state) => state.setHeaderProps);
  const clearHeaderProps = useHeaderPropsStore((state) => state.clearHeaderProps);

  const { currentIndex, totalSteps, prevStep, isLoading, isError } = useCenterRegiStepStore();
  const isFinalStep = currentIndex === totalSteps - 1;

  const handleBackClick = useCallback(() => {
    if (isFinalStep || currentIndex === 0) {
      navigate('/');
    } else {
      prevStep();
    }
  }, [isFinalStep, currentIndex, navigate, prevStep]);

  useEffect(() => {
    setHeaderProps({
      type: isFinalStep ? 'back' : 'back-progress',
      title: CENTER_REGISTRATION_STEPS[currentIndex].title,
      progress: !isFinalStep ? { current: currentIndex + 1, total: totalSteps - 1 } : null,
      onBack: handleBackClick,
    });

    return () => {
      clearHeaderProps();
    };
  }, [currentIndex, totalSteps, isFinalStep, handleBackClick, setHeaderProps, clearHeaderProps]);

  // TODO: 로딩 UI 수정 필요
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    alert('데이터를 불러오는 중 오류가 발생했습니다.');
    navigate('/');
    return null;
  }

  return (
    <>
      <div className='mb-[2rem]'></div>
      <CurrentStepComponent />
    </>
  );
}
