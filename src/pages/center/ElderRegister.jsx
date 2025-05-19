import Header from '@/components/ui/temp/Header';
import { useElderRegiStepStore } from '@/store/center/useElderRegiStepStore.js';
import { REGISTRATION_STEPS } from '@/constants/registrationSteps';
import { useElderFormData } from '@/hooks/center/service/useElderFormData';

function CurrentStepComponent({ formOptions }) {
  const currentStep = useElderRegiStepStore((state) => state.currentStep);
  const config = REGISTRATION_STEPS.find((step) => step.id === currentStep);

  if (!config) return null;

  const StepComponent = config.component;
  return <StepComponent formOptions={formOptions} />;
}

export default function ElderRegister() {
  const { data: formOptions, isLoading, isError } = useElderFormData();

  // TODO: 로딩 UI 수정 필요
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return alert('설문 데이터를 불러오는 중 오류가 발생했습니다.');
  }

  return (
    <div className='h-screen max-w-2xl mx-auto'>
      <Header title={'어르신 등록'} />
      <CurrentStepComponent formOptions={formOptions} />
    </div>
  );
}
