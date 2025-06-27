import { useSignUpStore } from '@/store/auth/center/useSignUpStore';
import { validateEmail, validatePersonalInfo } from '@/utils/validators/auth';
import { useSignUpStepStore } from '@/store/auth/center/useSignUpStepStore';
import { CENTER_SIGNUP_STEPS } from '@/constants/registrationSteps';
import { handleApiError } from '@/utils/handleApiError';
import NextButton from '@/components/ui/custom/Button/NextButton';

export default function SignUpButton() {
  const currentStep = useSignUpStepStore((state) => state.currentIndex);
  const goNextStep = useSignUpStepStore((state) => state.nextStep);
  const isLastStep = CENTER_SIGNUP_STEPS[CENTER_SIGNUP_STEPS.length - 2].id === currentStep;

  const signUpForm = useSignUpStore((state) => state.signUpForm);
  const submitSignUp = useSignUpStore((state) => state.submitManager);

  const handleNext = async () => {
    const isValid = validateEmail(signUpForm.emailAuth);
    if (!isValid) return alert('필수 입력 항목을 확인해주세요.');

    if (isLastStep) {
      try {
        await submitSignUp();
        goNextStep();
      } catch (error) {
        handleApiError(error);
      }
    } else {
      goNextStep();
    }
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return validateEmail(signUpForm.emailAuth);
      case 1:
        return validatePersonalInfo(signUpForm.personalInfo);
      default:
        return true;
    }
  };

  return (
    <div className='flex flex-col items-center gap-4'>
      <NextButton disabled={!validateCurrentStep()} className='mb-[2rem]' onClick={handleNext} />
    </div>
  );
}
