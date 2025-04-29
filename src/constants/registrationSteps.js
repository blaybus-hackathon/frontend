import ElderBasicInfo from '@/components/Center/ElderRegistration/ElderBasicInfo';
import ElderCareInfo from '@/components/Center/ElderRegistration/ElderCareInfo';
import ElderAdditionalInfo from '@/components/Center/ElderRegistration/ElderAdditionalInfo';
import ElderRegiComplete from '@/components/Center/ElderRegistration/ElderRegiComplete';
import ElderServiceInfo from '@/components/Center/ElderRegistration/ElderServiceInfo';

export const REGISTRATION_STEPS = [
  { id: 1, component: ElderBasicInfo, title: '어르신 등록' },
  { id: 2, component: ElderCareInfo, title: '어르신 등록' },
  { id: 3, component: ElderAdditionalInfo, title: '어르신 등록' },
  { id: 4, component: ElderServiceInfo, title: '어르신 등록' },
  { id: 5, component: ElderRegiComplete, title: '센터 정보' },
];
