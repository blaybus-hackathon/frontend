import { useNavigate } from 'react-router-dom';
import { useSignUpStore } from '@/store/auth/center/useSignUpStore';
import { useSignUpStepStore } from '@/store/auth/center/useSignUpStepStore';
import { fetchDefaultImage } from '@/utils/fetchDefaultImage';
import { validateEmail, validatePersonalInfo } from '@/utils/validators/auth';
import { handleApiError } from '@/utils/handleApiError';
import { CENTER_SIGNUP_STEPS } from '@/constants/registrationSteps';
import NextButton from '@/components/ui/custom/Button/NextButton';

export function SignUpButton({ isValid }) {
  const navigate = useNavigate();

  const currentStep = useSignUpStepStore((state) => state.currentIndex);
  const goNextStep = useSignUpStepStore((state) => state.nextStep);

  // check if it is the last step(except the complete step)
  const isLastStep = CENTER_SIGNUP_STEPS[CENTER_SIGNUP_STEPS.length - 2].id === currentStep;

  // trigger validation for the current step's every field
  const triggerValidation = useSignUpStepStore((state) => state.triggerValidation);

  // zustand store
  const signUpForm = useSignUpStore((state) => state.signUpForm);
  const submitSignUp = useSignUpStore((state) => state.submitManager);
  const setManagerSeq = useSignUpStore((state) => state.setManagerSeq);
  const setManagerImage = useSignUpStore((state) => state.setManagerImage);
  const uploadProfileImage = useSignUpStore((state) => state.uploadProfileImage);
  const reset = useSignUpStore((state) => state.reset);

  const handleNext = async () => {
    // validate every field in current step if next button is disabled
    if (!isValid || !validateCurrentStep()) {
      triggerValidation();
      return;
    }

    // if it is the last step, submit the sign up form
    if (isLastStep) {
      try {
        // api call
        const response = await submitSignUp();
        const managerSeq = response.cmSeq;
        setManagerSeq(managerSeq);

        let fileToUpload = null;

        if (signUpForm.selectedImg) {
          fileToUpload = signUpForm.selectedImg;
        } else if (signUpForm.profileOption === '2') {
          fileToUpload = await fetchDefaultImage();
        }

        if (fileToUpload) {
          const imgResponse = await uploadProfileImage(fileToUpload, managerSeq);
          if (imgResponse?.imgSeq) {
            setManagerImage(imgResponse.imgSeq);
            console.log('프로필 이미지 업로드 완료:', imgResponse);
          }
        }

        goNextStep();
      } catch (error) {
        const result = handleApiError(
          error,
          {
            4000: '사용중인 이메일입니다.',
            4003: '센터 정보가 올바르지 않습니다.',
            4010: '인증되지 않은 이메일입니다.',
          },
          '회원가입 중 오류가 발생하였습니다.',
          false,
          true,
        );

        if (result.code === 4000 || result.code === 4003 || result.code === 4010) {
          reset();
          navigate('/center/signup', { replace: true });
        }
      }
    } else {
      goNextStep();
    }
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return validateEmail(signUpForm?.emailAuth);
      case 1:
        return validatePersonalInfo(signUpForm?.personalInfo);
      default:
        return true;
    }
  };

  return (
    <div className='flex flex-col items-center gap-4'>
      <NextButton
        disabled={!isValid || !validateCurrentStep()}
        className='mb-[2rem]'
        onClick={handleNext}
      />
    </div>
  );
}
