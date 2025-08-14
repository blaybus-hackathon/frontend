import { useNavigate } from 'react-router-dom';
import { useCenterRegiStepStore } from '@/store/center/useCenterRegiStepStore';
import useCenterRegiStore from '@/store/center/useCenterRegiStore';
import { validateCenterBasicInfo, validateCenterAddInfo } from '@/utils/validators/center';
import NextButton from '@/components/ui/custom/Button/NextButton';
import { CENTER_REGISTRATION_STEPS } from '@/constants/registrationSteps';

export function CenterNextButton({ isValid }) {
  const navigate = useNavigate();
  const currentStep = useCenterRegiStepStore((state) => state.currentIndex);
  const goNextStep = useCenterRegiStepStore((state) => state.nextStep);
  const triggerValidation = useCenterRegiStepStore((state) => state.triggerValidation);
  const isLastStep =
    CENTER_REGISTRATION_STEPS[CENTER_REGISTRATION_STEPS.length - 2].id === currentStep;

  const registerCenter = useCenterRegiStore((state) => state.registerCenter);
  const submitCenter = useCenterRegiStore((state) => state.submitCenter);
  const reset = useCenterRegiStore((state) => state.reset);

  const handleNext = async () => {
    if (!isValid || !validateCurrentStep()) {
      triggerValidation();
      return;
    }

    if (isLastStep) {
      try {
        // submit center data
        await submitCenter();
        goNextStep();
      } catch (error) {
        if (error.code === 4004 || error.code === 403) {
          reset();
          navigate('/center/register');
        }
      }
    } else {
      goNextStep();
    }
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return validateCenterBasicInfo(registerCenter?.basicInfo);
      case 1:
        return validateCenterAddInfo(registerCenter?.addInfo);
      default:
        return true;
    }
  };

  return (
    <div className='flex flex-col items-center gap-4'>
      <NextButton
        onClick={handleNext}
        className='mb-[2rem]'
        label={isLastStep ? '등록' : '다음'}
        disabled={!isValid || !validateCurrentStep()}
      />
    </div>
  );
}
