import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';
import { useSignUpStepStore } from '@/store/auth/helper/useSignUpStepStore';
import { useSignUpStore } from '@/store/auth/helper/useSignUpStore';
import { HELPER_SIGNUP_STEPS } from '@/constants/registrationSteps';

import EmailAuth from '@/components/Auth/SignUp/helper/EmailAuth';
import HelperInfo from '@/components/Auth/SignUp/helper/HelperInfo';
import LicenseInfo from '@/components/Auth/SignUp/helper/LicenseInfo';
import SignUpComplete from '@/components/Auth/SignUp/helper/SignUpComplete';

const COMPONENTS = [EmailAuth, HelperInfo, LicenseInfo, SignUpComplete];

function CurrentStepComponent({ formOptions }) {
  const currentIndex = useSignUpStepStore((state) => state.currentIndex);
  // const currentIndex = 1;
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
      title: HELPER_SIGNUP_STEPS[currentIndex].title,
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
      {console.log(useSignUpStore.getState().signUpForm)}
      <div className='mt-8'>
        <CurrentStepComponent />
      </div>
    </>
  );
}
