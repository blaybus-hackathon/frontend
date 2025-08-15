import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';
import { useSignUpStepStore } from '@/store/auth/center/useSignUpStepStore';
import { CENTER_SIGNUP_STEPS } from '@/constants/registrationSteps';
import { handleApiError } from '@/utils/handleApiError';

import Spinner from '@/components/loading/Spinner';
import EmailAuth from '@/components/Auth/SignUp/center/EmailAuth';
import PersonalInfo from '@/components/Auth/SignUp/center/PersonalInfo';
import SignUpComplete from '@/components/Auth/SignUp/center/SignUpComplete';

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

  const { currentIndex, totalSteps, prevStep, isLoading, reset, isError } = useSignUpStepStore();
  const isFinalStep = currentIndex === totalSteps - 1;

  const handleBackClick = useCallback(() => {
    if (isFinalStep) {
      reset();
      navigate('/', { replace: true });
      return;
    }

    if (currentIndex === 0) {
      navigate(-1);
    }

    prevStep();
  }, [isFinalStep, currentIndex, prevStep, navigate, reset]);

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
    return <Spinner />;
  }
  if (isError) {
    handleApiError(isError);
    reset();
    navigate('/', { replace: true });
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
