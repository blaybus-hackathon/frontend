import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleApiError } from '@/utils/handleApiError';
import { useElderFormData } from '@/hooks/center/service/useElderFormData';
import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';
import { useElderRegiStepStore } from '@/store/center/useElderRegiStepStore.js';
import { ELDER_REGISTRATION_STEPS } from '@/constants/registrationSteps';

import Spinner from '@/components/loading/Spinner';
import ElderBasicInfo from '@/components/Center/ElderRegistration/ElderBasicInfo';
import ElderCareInfo from '@/components/Center/ElderRegistration/ElderCareInfo';
import ElderAdditionalInfo from '@/components/Center/ElderRegistration/ElderAdditionalInfo';
import ElderServiceInfo from '@/components/Center/ElderRegistration/ElderServiceInfo';
import ElderRegiComplete from '@/components/Center/ElderRegistration/ElderRegiComplete';

const COMPONENTS = [
  ElderBasicInfo,
  ElderCareInfo,
  ElderAdditionalInfo,
  ElderServiceInfo,
  ElderRegiComplete,
];

function CurrentStepComponent({ formOptions }) {
  const currentIndex = useElderRegiStepStore((state) => state.currentIndex);
  const StepComponent = COMPONENTS[currentIndex];

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
      navigate(-1);
    } else {
      prevStep();
    }
  }, [isFinalStep, currentIndex, navigate, prevStep]);

  useEffect(() => {
    setHeaderProps({
      type: isFinalStep ? 'back' : 'back-progress',
      title: ELDER_REGISTRATION_STEPS[currentIndex].title,
      progress: !isFinalStep ? { current: currentIndex + 1, total: totalSteps - 1 } : null,
      onBack: handleBackClick,
    });

    return () => clearHeaderProps();
  }, [currentIndex, isFinalStep, clearHeaderProps, handleBackClick, setHeaderProps, totalSteps]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    const error = new Error('설문 데이터를 불러오는 중 오류가 발생했습니다.');
    error.response = { status: 500 };

    handleApiError(
      error,
      { 500: '설문 데이터를 불러오는 중 서버 오류가 발생했습니다.' },
      '설문 데이터를 불러오는 중 오류가 발생했습니다.',
      false,
      true,
    );
    return null;
  }

  return (
    <div className='my-6 lg:my-8'>
      <CurrentStepComponent formOptions={formOptions} />
    </div>
  );
}
