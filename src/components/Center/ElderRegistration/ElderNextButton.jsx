import { useElderRegiStore } from '@/store/center/useElderRegiStore';
import { useElderRegiStepStore } from '@/store/center/useElderRegiStepStore';
import {
  validateBasicInfo,
  validateCareInfo,
  validateAddInfo,
  validateServiceInfo,
} from '@/utils/validators/center';
import { fetchDefaultImage } from '@/utils/fetchDefaultImage';
import { handleApiError } from '@/utils/handleApiError';
import NextButton from '@/components/ui/custom/Button/NextButton';
import { ELDER_REGISTRATION_STEPS } from '@/constants/registrationSteps';

export function ElderNextButton({ isValid }) {
  const currentStep = useElderRegiStepStore((s) => s.currentIndex);
  const goNextStep = useElderRegiStepStore((s) => s.nextStep);

  // check if it's the last step(except the complete step)
  const isLastStep =
    ELDER_REGISTRATION_STEPS[ELDER_REGISTRATION_STEPS.length - 2].id === currentStep;

  // trigger validation for the current step's every field
  const triggerValidation = useElderRegiStepStore((s) => s.triggerValidation);

  // store
  const elderFormData = useElderRegiStore((s) => s.registerElder);
  const submitElderRegi = useElderRegiStore((s) => s.submitElderRegi);
  const setPatientSeq = useElderRegiStore((s) => s.setPatientSeq);
  const setPatientImage = useElderRegiStore((s) => s.setPatientImage);
  const uploadProfileImage = useElderRegiStore((s) => s.uploadProfileImage);
  // const patientImage = useElderRegiStore((s) => s.patientImage);
  const profileOption = useElderRegiStore((s) => s.profileOption);
  const reset = useElderRegiStore((s) => s.reset);

  // image selecte on frontend
  const selectedImage = useElderRegiStore((s) => s.selectedImg); // image selecte on frontend

  const handleNext = async () => {
    if (!isValid || !validateCurrentStep()) {
      triggerValidation();
      return;
    }

    if (isLastStep) {
      try {
        // submit elder data
        const response = await submitElderRegi();
        const patientSeq = response.patientSeq;
        setPatientSeq(patientSeq);

        // upload image
        let fileToUpload = null;

        if (selectedImage) {
          fileToUpload = selectedImage;
        } else if (profileOption === '2') {
          fileToUpload = await fetchDefaultImage();
        }

        if (fileToUpload) {
          const imgResponse = await uploadProfileImage(fileToUpload, patientSeq);
          if (imgResponse?.imgSeq) {
            setPatientImage(imgResponse.imgSeq);
          }
        }

        goNextStep();
      } catch (error) {
        reset();
        handleApiError(
          error,
          {
            7000: '어르신 등록 권한이 없습니다.',
            4005: '접근 권한이 없습니다.',
          },
          '어르신 등록 중 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.',
          true,
          true,
        );
      }
    } else {
      goNextStep();
    }
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return validateBasicInfo(elderFormData?.basicInfo);
      case 1:
        return validateCareInfo(elderFormData?.careInfo);
      case 2:
        return validateAddInfo(elderFormData?.addInfo);
      case 3:
        return validateServiceInfo(elderFormData?.serviceInfo);
      default:
        return true;
    }
  };

  return (
    <div className='flex flex-col items-center gap-4'>
      <NextButton
        className='mb-[2rem]'
        label={isLastStep ? '등록' : '다음'}
        onClick={handleNext}
        disabled={!isValid || !validateCurrentStep()}
      />
    </div>
  );
}
