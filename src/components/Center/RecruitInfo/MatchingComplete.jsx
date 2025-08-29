import { useState } from 'react';
import { Button } from '@/components/ui/custom/Button';
import { usePatientStore } from '@/store/center/usePatientStore';
import defaultProfile from '@/assets/images/elder-basic-profile.png';

export default function MatchingComplete() {
  const { patientData } = usePatientStore();
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const imageSrc = patientData.imgAddress && !imageError ? patientData.imgAddress : defaultProfile;

  return (
    <div className='mx-auto px-[1.5rem]'>
      <p className='mt-32 mb-12 font-bold text-2xl'>{patientData.name} 어르신</p>
      <div className='flex justify-center items-center bg-[#F6F6F6] size-56 rounded-[50%] mx-auto mb-12'>
        <img
          src={imageSrc}
          alt={`${patientData.name} 어르신 프로필 이미지`}
          className='size-full object-cover rounded-[50%]'
          onError={handleImageError}
        />
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
