import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/custom/Button';
import { useNavigate } from 'react-router-dom';
import { useElderRegiStore } from '@/store/center/useElderRegiStore';
import { useElderRegiStepStore } from '@/store/center/useElderRegiStepStore';
import defaultProfile from '/default_profile.png';

export default function ElderRegiComplete() {
  const navigate = useNavigate();
  const { registerElder, reset, selectedImg } = useElderRegiStore();
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const { profileOption, patientImage } = registerElder;
  const resetStep = useElderRegiStepStore((s) => s.reset);

  // set profile img
  useEffect(() => {
    if (profileOption === '1' && (selectedImg || patientImage)) {
      const imageFile = selectedImg || patientImage;
      if (imageFile && typeof imageFile === 'object') {
        const imageUrl = URL.createObjectURL(imageFile);
        setProfileImageUrl(imageUrl);

        // revoke object url when component unmounts
        return () => URL.revokeObjectURL(imageUrl);
      }
    }
  }, [selectedImg, patientImage, profileOption]);

  const handleHome = () => {
    reset();
    resetStep();
    navigate('/center');
  };

  const handleMatching = () => {
    reset();
    resetStep();
    navigate('/center/matching');
  };

  return (
    <section className='flex flex-col items-center justify-center mt-8 lg:mt-12'>
      <div className='rounded-full overflow-hidden w-52 h-52'>
        <img
          src={profileImageUrl || defaultProfile}
          alt='프로필 이미지'
          className='w-full h-full object-cover'
        />
      </div>

      <div className='my-8 flex flex-col gap-4'>
        <p className='text-[var(--text)] text-lg lg:text-xl font-medium'>
          {registerElder.basicInfo.name} 어르신
        </p>
        <p className='text-[var-(--text)] text-xl lg:text-3xl font-bold'>
          어르신이 등록되었습니다!
        </p>
      </div>

      <div className='flex flex-col w-full gap-4'>
        <Button className='w-full h-[4.0625rem]' onClick={handleMatching}>
          요양사 매칭하러 가기
        </Button>
        <Button variant={'white'} className='w-full h-[4.0625rem]' onClick={handleHome}>
          홈으로 가기
        </Button>
      </div>
    </section>
  );
}
