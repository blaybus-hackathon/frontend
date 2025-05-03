import { Button } from '@/components/ui/custom/Button';
import { useNavigate } from 'react-router-dom';
import { useElderRegiStore } from '@/store/center/useElderRegiStore';
import defaultProfile from '/default_profile.png';

export default function ElderRegiComplete() {
  const navigate = useNavigate();
  const { registerElder } = useElderRegiStore();

  // TODO: 이미지 업로드 완료 후 이미지 받아오기
  return (
    <section className='flex flex-col items-center justify-center mt-[3.13rem]'>
      {registerElder.patientImage ? (
        <img 
          src={registerElder.patientImage}
          alt='프로필 이미지' 
          className='w-[14.375rem] h-[14.375rem] rounded-full object-cover'
        />
      ) : (
        <img src={defaultProfile} alt='기본 프로필' className='w-[14.375rem] h-auto' />
      )}

      <div className='my-[3.06rem] flex flex-col gap-[1.81rem]'>
        <p className='text-[var(--text)] text-[1.125rem] font-medium'>
          {registerElder.basicInfo.name} 어르신
        </p>
        <p className='text-[var-(--text)] text-xl font-bold'>어르신이 등록되었습니다!</p>
      </div>

      <div className='flex flex-col gap-[1.31rem] w-full'>
        {/* TODO : 페이지 연결 */}
        <Button className='w-full h-[4.0625rem]' onClick={() => navigate('/')}>
          요양사 매칭하러 가기
        </Button>
        <Button variant={'white'} className='w-full h-[4.0625rem]' onClick={() => navigate('/')}>
          홈으로 가기
        </Button>
      </div>
    </section>
  );
}
