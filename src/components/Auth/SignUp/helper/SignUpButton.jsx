import { useSignUpStore } from '@/store/auth/helper/useSignUpStore';
import { validateEmail, validateHelperInfo, validateLicenseInfo } from '@/utils/validators/auth';
import { useSignUpStepStore } from '@/store/auth/helper/useSignUpStepStore';
import { HELPER_SIGNUP_STEPS } from '@/constants/registrationSteps';
import { handleApiError } from '@/utils/handleApiError';
import NextButton from '@/components/ui/custom/Button/NextButton';

const LICENSE_OPTIONS = [
  { key: 'essentialCertNo', label: '요양보호사 자격증' },
  { key: 'careCertNo', label: '간병사 자격증' },
  { key: 'nurseCerNo', label: '병원동행매니저 자격증' },
  { key: 'postPartumCertNo', label: '산후관리사 자격증' },
  { key: 'helperOtherCerts', label: '기타 자격증' },
];

export default function SignUpButton() {
  const currentStep = useSignUpStepStore((state) => state.currentIndex);
  const goNextStep = useSignUpStepStore((state) => state.nextStep);
  const isLastStep = HELPER_SIGNUP_STEPS[HELPER_SIGNUP_STEPS.length - 2].id === currentStep;

  const signUpForm = useSignUpStore((state) => state.signUpForm);
  const submitSignUp = useSignUpStore((state) => state.submitHelper);
  const setIsFirstCheck = useSignUpStore((state) => state.setIsFirstCheck);
  const setIsEmailFirstCheck = useSignUpStore((state) => state.setIsEmailFirstCheck);
  // const { setIsFirstCheck, setIsEmailFirstCheck } = useSignUpStore();

  const handleNext = async () => {
    if (currentStep === 0) {
      setIsEmailFirstCheck(false);
    } else if (currentStep === 1) setIsFirstCheck(false);

    if (currentStep === 2) {
      // 만약 선택된 자격증이 있다면, 그 항목 하위의 모든 필드가 입력되었는지 체크
      const incomplete = Object.entries(signUpForm.licenseInfo).find(([key, certData]) => {
        // 기타 자격증일 경우 certName 체크도 포함
        if (!certData.certNum || !certData.certDateIssue || !certData.certSerialNum) return true;
        if (key === 'helperOtherCerts' && !certData.certName) return true;
        return false;
      });
      if (incomplete) {
        const [key] = incomplete;
        const label = LICENSE_OPTIONS.find((o) => o.key === key)?.label ?? '자격증';
        alert(`${label}의 모든 정보를 입력해 주세요.`);
        return;
      }
    }

    if (!validateCurrentStep()) return alert('필수 입력 항목을 확인해주세요.');

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
        return validateHelperInfo(signUpForm.helperInfo);
      case 2:
        return validateLicenseInfo(signUpForm.licenseInfo);
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
