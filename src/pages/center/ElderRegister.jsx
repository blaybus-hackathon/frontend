import CareRequirements from '@/components/Center/ElderRegistration/CareRequirements';
import Header from '@/components/ui/temp/Header';

export default function ElderRegister() {
  return (
    <div className='h-screen max-w-2xl mx-auto'>
      <Header title={'어르신 등록'} />
      <div className='pt-[2.31rem] w-[88.35%] mx-auto'>
        <CareRequirements />
      </div>
    </div>
  );
}
