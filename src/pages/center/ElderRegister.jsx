import { useEffect, useCallback } from 'react';
import { useElderRegiStepStore } from '@/store/center/useElderRegiStepStore.js';
import { REGISTRATION_STEPS } from '@/constants/registrationSteps';
import { useElderFormData } from '@/hooks/center/service/useElderFormData';
import { useNavigate } from 'react-router-dom';
import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';

function CurrentStepComponent({ formOptions }) {
  const currentIndex = useElderRegiStepStore((state) => state.currentIndex);
  const config = REGISTRATION_STEPS[currentIndex];

  if (!config) return null;

  const StepComponent = config.component;
  return <StepComponent formOptions={formOptions} />;
}

export default function ElderRegister() {
  const navigate = useNavigate();
  const setHeaderProps = useHeaderPropsStore((state) => state.setHeaderProps);
  const clearHeaderProps = useHeaderPropsStore((state) => state.clearHeaderProps);

  const { currentIndex, totalSteps, prevStep } = useElderRegiStepStore();
  const isFinalStep = currentIndex === totalSteps - 1;

  const { data: formOptions, isLoading, isError } = useElderFormData();

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
      title: REGISTRATION_STEPS[currentIndex].title,
      progress: !isFinalStep ? { current: currentIndex + 1, total: totalSteps - 1 } : null,
      onBack: handleBackClick,
    });

    return () => {
      clearHeaderProps();
    };
  }, [currentIndex, isFinalStep, clearHeaderProps, handleBackClick, setHeaderProps, totalSteps]);

  // TODO: 로딩 UI 수정 필요
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    alert('설문 데이터를 불러오는 중 오류가 발생했습니다.');
    navigate('/');
    return null;
  }

  return (
    <>
      <div className='mb-[2.7rem]'></div>
      <CurrentStepComponent formOptions={formOptions} />
    </>
  );
}
