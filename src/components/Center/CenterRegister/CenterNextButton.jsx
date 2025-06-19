import { useNavigate } from 'react-router-dom';
import { useCenterRegiStepStore } from '@/store/center/useCenterRegiStepStore';
import useCenterRegiStore from '@/store/center/useCenterRegiStore';
import { validateCenterBasicInfo, validateCenterAddInfo } from '@/utils/validators/center';
import NextButton from '@/components/ui/custom/Button/NextButton';
import { CENTER_REGISTRATION_STEPS } from '@/constants/registrationSteps';

export function CenterNextButton() {
  const navigate = useNavigate();
  const currentStep = useCenterRegiStepStore((state) => state.currentIndex);
  const goNextStep = useCenterRegiStepStore((state) => state.nextStep);
  const isLastStep =
    CENTER_REGISTRATION_STEPS[CENTER_REGISTRATION_STEPS.length - 2].id === currentStep;

  const centerForm = useCenterRegiStore((state) => state.registerCenter);
  const submitCenter = useCenterRegiStore((state) => state.submitCenter);

  const handleNext = async () => {
    if (!validateCurrentStep()) {
      alert('필수 입력 항목을 확인해주세요.');
      return;
    }

    if (isLastStep) {
      try {
        // submit center data
        await submitCenter();
        goNextStep();
      } catch (error) {
        console.error('센터 등록 실패: ', error);
        const ERROR_MESSAGES = {
          4004: '이미 같은 주소의 센터가 등록되어있습니다.',
          403: '센터 등록에 필요한 정보가 누락되었습니다.',
        };
        alert(ERROR_MESSAGES[error.code] || error.message);
        navigate('/center/register');
      }
    } else {
      goNextStep();
    }
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return validateCenterBasicInfo(centerForm.basicInfo);
      case 1:
        return validateCenterAddInfo(centerForm.addInfo);
      default:
        return true;
    }
  };
  return (
    <div className='flex flex-col items-center gap-4'>
      <NextButton
        disabled={!validateCurrentStep()}
        onClick={handleNext}
        className='mb-[2rem]'
        label={isLastStep ? '등록' : '다음'}
      />
    </div>
  );
}
