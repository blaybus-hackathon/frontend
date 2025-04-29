import { useElderRegiStepStore } from '@/store/center/useElderRegiStepStore';
import { useElderRegiStore } from '@/store/center/useElderRegiStore';
import {
  validateBasicInfo,
  validateCareInfo,
  validateAddInfo,
  validateServiceInfo,
} from '@/utils/validators/center/elderRegister';
import NextButton from '@/components/ui/custom/Button/NextButton';
import { REGISTRATION_STEPS } from '@/constants/registrationSteps';

export function ElderNextButton() {
  const currentStep = useElderRegiStepStore((state) => state.currentStep);
  const goNextStep = useElderRegiStepStore((state) => state.nextStep);
  const elderForm = useElderRegiStore((state) => state.registerElder);
  const submitElder = useElderRegiStore((state) => state.submitElder);

  // check if last step
  // the length - 1 is the complete page
  const isLastStep = REGISTRATION_STEPS[REGISTRATION_STEPS.length - 2].id === currentStep;

  const handleNext = async () => {
    if (!validateCurrentStep()) {
      // TODO : 세부 에러 내역 작성
      // ex) 생년월일은 8자리
      alert('필수 입력 항목을 확인해주세요.');
      return;
    }

    if (isLastStep) {
      try {
        await submitElder();
        console.log('어르신 등록 완료');
        goNextStep();
      } catch (error) {
        console.error('어르신 등록 실패:', error);
        alert('어르신 등록에 실패했습니다. 다시 시도해주세요.');
      }
    } else {
      goNextStep();
    }
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return validateBasicInfo(elderForm.basicInfo);
      case 2:
        return validateCareInfo(elderForm.careInfo);
      case 3:
        return validateAddInfo(elderForm.addInfo);
      case 4:
        return validateServiceInfo(elderForm.serviceInfo);
      default:
        return true;
    }
  };

  return (
    <NextButton disabled={!validateCurrentStep()} onClick={handleNext} className={`mb-[2rem]`} />
  );
}
