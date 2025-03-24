import patientStore from '@/store/patientStore';
import profile from '@/assets/images/default-profile.png';

import { Button } from '@/components/ui/custom/Button';

export default function MatchingComplete() {
  const { patientData } = patientStore();
  return (
    <div className='mx-auto max-w-2xl px-[1.5rem]'>
      {/* <p className='font-medium text-xl mt-23 mb-7'>{`(${patientData.name})님 구인 완료`}</p> */}
      <p className='mt-32 mb-12 font-bold text-2xl'>{patientData.name} 어르신</p>
      {/* <p className='text-lg'>가입한 이메일로 결과 알림을 보내드려요</p> */}
      {/* <InfoCard showCheck={false} user={patientData} /> */}
      <div className='flex justify-center items-center bg-[#F6F6F6] size-56 rounded-[50%] mx-auto mb-12'>
        <img src={profile} className='size-20' />
      </div>
      <div className='flex flex-col gap-7 mb-12'>
        <p className='font-bold text-xl'>어르신의 구인공고를 올렸어요</p>
        <p className='text-lg'>가입한 이메일로 매칭 결과를 알려드려요!</p>
      </div>
      <div className=''>
        <Button className='h-16 w-full'>매칭 현황 바로가기</Button>
      </div>
    </div>
  );
}
