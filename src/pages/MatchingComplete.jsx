import InfoCard from '@/components/InfoCard';
import patientStore from '@/store/patientStore';

import { Button } from '@/components/ui/button';

export default function MatchingComplete() {
  const { patientData } = patientStore();
  return (
    <div className='mx-auto max-w-2xl px-[1.5rem]'>
      <p className='font-medium text-xl mt-23 mb-7'>(박순자)님 구인 완료</p>
      <div className='mb-15'>
        <p className='font-bold text-2xl'>매칭 결과를 기다려주세요!</p>
        <p className='text-lg'>가입한 이메일로 결과 알림을 보내드려요</p>
      </div>
      <InfoCard showCheck={false} user={patientData} />
      <div className='fixed bottom-8 left-1/2 -translate-x-1/2 w-4/5'>
        <p className='text-xl'>매칭 관리에서 내역을 확인해요</p>
        <Button className='h-16 w-full bg-[var(--company-primary)] text-xl hover:bg-[var(--company-primary)]/90  font-bold mt-6'>
          매칭 현황 바로가기
        </Button>
      </div>
    </div>
  );
}
