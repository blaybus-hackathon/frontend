import { useElderRegiStepStore } from '@/store/center/useElderRegiStepStore';
import { useElderRegiStore } from '@/store/center/useElderRegiStore';
import {
  validateBasicInfo,
  validateCareInfo,
  validateAddInfo,
  validateServiceInfo,
} from '@/utils/validators/center';
import { fetchDefaultImage } from '@/utils/fetchDefaultImage';
import NextButton from '@/components/ui/custom/Button/NextButton';
import { ELDER_REGISTRATION_STEPS } from '@/constants/registrationSteps';

export function ElderNextButton() {
  const currentStep = useElderRegiStepStore((state) => state.currentIndex);
  const goNextStep = useElderRegiStepStore((state) => state.nextStep);

  const elderForm = useElderRegiStore((state) => state.registerElder);
  const submitElder = useElderRegiStore((state) => state.submitElder);
  const setPatientSeq = useElderRegiStore((state) => state.setPatientSeq);
  const setPatientImage = useElderRegiStore((state) => state.setPatientImage);
  const uploadProfileImage = useElderRegiStore((state) => state.uploadProfileImage);
  const profileOption = useElderRegiStore((state) => state.profileOption);
  const patientImage = useElderRegiStore((state) => state.patientImage);

  const selectedImage = useElderRegiStore((state) => state.selectedImg); // image selected state on frontend

  // check if last step
  // the length - 1 is the complete page
  const isLastStep =
    ELDER_REGISTRATION_STEPS[ELDER_REGISTRATION_STEPS.length - 2].id === currentStep;

  const handleNext = async () => {
    if (!validateCurrentStep()) {
      // TODO : 세부 에러 내역 작성
      // ex) 생년월일은 8자리
      alert('필수 입력 항목을 확인해주세요.');
      return;
    }

    if (isLastStep) {
      try {
        // submit elder data
        const response = await submitElder();
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
            console.log('프로필 이미지 업로드 완료:', imgResponse);
          }
        }

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
      case 0:
        return validateBasicInfo(elderForm.basicInfo);
      case 1:
        return validateCareInfo(elderForm.careInfo);
      case 2:
        return validateAddInfo(elderForm.addInfo);
      case 3:
        return validateServiceInfo(elderForm.serviceInfo);
      default:
        return true;
    }
  };

  return (
    <div className='flex flex-col items-center gap-4'>
      {patientImage && (
        <img
          src={`/api/images/${patientImage}`}
          alt='프로필 이미지'
          className='w-32 h-32 rounded-full object-cover'
        />
      )}
      <NextButton disabled={!validateCurrentStep()} onClick={handleNext} className='mb-[2rem]' />
    </div>
  );
}
