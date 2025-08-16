import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';
import { useCenterRegiStepStore } from '@/store/center/useCenterRegiStepStore';
import { useCenterRegiStore } from '@/store/center/useCenterRegiStore';
import { CENTER_REGISTRATION_STEPS } from '@/constants/registrationSteps';
import Spinner from '@/components/loading/Spinner';
import { handleApiError } from '@/utils/handleApiError';

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
  const reset = useCenterRegiStore((state) => state.reset);
  const isFinalStep = currentIndex === totalSteps - 1;

  // reset store
  useEffect(() => {
    reset();
  }, [reset]);

  const handleBackClick = useCallback(() => {
    if (isFinalStep || currentIndex === 0) {
      navigate('/search-center');
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

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    const error = new Error('센터 등록 데이터를 불러오는 중 오류가 발생했습니다.');
    error.response = { status: 500 };

    handleApiError(
      error,
      { 500: '센터 등록 정보를 불러오는 중 서버 오류가 발생했습니다.' },
      '센터 등록 데이터를 불러오는 중 오류가 발생했습니다.',
      false,
      true,
    );
    return null;
  }

  return (
    <>
      <div className='mb-[2rem]'></div>
      <CurrentStepComponent />
    </>
  );
}
