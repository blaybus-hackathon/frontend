import Header from '@/components/ui/temp/Header';
import ElderBasicInfo from '@/components/Center/ElderRegistration/ElderBasicInfo';
import CareRequirements from '@/components/Center/ElderRegistration/CareRequirements';
import ElderAdditionalInfo from '@/components/Center/ElderRegistration/ElderAdditionalInfo';
import ElderService from '@/components/Center/ElderRegistration/ElderService';
import ElderRegiComplete from '@/components/Center/ElderRegistration/ElderRegiComplete';
import { useElderRegiStepStore } from '@/store/center/useElderRegiStepStore.js';

// step config list
const REGISTRATION_STEPS = [
  { id: 1, component: ElderBasicInfo, title: '어르신 등록' },
  { id: 2, component: CareRequirements, title: '어르신 등록' },
  { id: 3, component: ElderAdditionalInfo, title: '어르신 등록' },
  { id: 4, component: ElderService, title: '어르신 등록' },
  { id: 5, component: ElderRegiComplete, title: '센터 정보' },
];

const CurrentStepComponent = () => {
  const currentStep = useElderRegiStepStore((state) => state.currentStep);
  const currentStepConfig = REGISTRATION_STEPS.find((step) => step.id === currentStep);

  if (!currentStepConfig) return null;

  const Component = currentStepConfig.component;
  return <Component />;
};

export default function ElderRegister() {
  return (
    <div className='h-screen max-w-2xl mx-auto'>
      <Header title='어르신 등록' />
      <div className='pt-[2.69rem] w-[88.35%] mx-auto'>
        <CurrentStepComponent />
      </div>
    </div>
  );
}
