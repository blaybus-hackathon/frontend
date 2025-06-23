import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';
import { useSignUpStepStore } from '@/store/auth/center/useSignUpStepStore';
import { CENTER_SIGNUP_STEPS } from '@/constants/registrationSteps';

import EmailAuth from '@/components/Auth/SignUp/Center/EmailAuth';
import PersonalInfo from '@/components/Auth/SignUp/Center/PersonalInfo';
import SignUpComplete from '@/components/Auth/SignUp/Center/SignUpComplete';

const COMPONENTS = [EmailAuth, PersonalInfo, SignUpComplete];

function CurrentStepComponent({ formOptions }) {
  const currentIndex = useSignUpStepStore((state) => state.currentIndex);
  const StepComponent = COMPONENTS[currentIndex];

  return <StepComponent formOptions={formOptions} />;
}

export default function SignUp() {
  const navigate = useNavigate();
  const setHeaderProps = useHeaderPropsStore((state) => state.setHeaderProps);
  const clearHeaderProps = useHeaderPropsStore((state) => state.clearHeaderProps);

  const { currentIndex, totalSteps, prevStep, isLoading, isError } = useSignUpStepStore();
  const isFinalStep = currentIndex === totalSteps - 1;

  const handleBackClick = useCallback(() => {
    if (isFinalStep || currentIndex === 0) {
      navigate('/');
    } else {
      prevStep();
    }
  }, [isFinalStep, currentIndex, prevStep, navigate]);

  useEffect(() => {
    setHeaderProps({
      type: isFinalStep ? 'back' : 'back-progress',
      title: CENTER_SIGNUP_STEPS[currentIndex].title,
      progress: !isFinalStep ? { current: currentIndex + 1, total: totalSteps - 1 } : null,
      onBack: handleBackClick,
    });

    return () => {
      clearHeaderProps();
    };
  }, [currentIndex, isFinalStep, clearHeaderProps, handleBackClick, setHeaderProps, totalSteps]);

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
      <div className='mt-8'>
        <CurrentStepComponent />
      </div>
    </>
  );
}
