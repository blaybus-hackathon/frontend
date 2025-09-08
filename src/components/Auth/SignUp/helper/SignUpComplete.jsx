import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/custom/Button';
import defaultProfile from '/default_profile.png';

export default function SignUpComplete() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/signin');
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <>
      <div className='flex flex-col items-center h-[80vh] justify-between py-5'>
        <div className='rounded-full overflow-hidden w-[12.5rem] h-[12.5rem]'>
          <img src={defaultProfile} alt='logo' className='w-full h-full object-cover' />
        </div>

        <div className='flex flex-col items-center space-y-6'>
          <h3 className='text-[var(--text)] text-xl font-bold'>돌봄워크에 오신 것을 환영합니다!</h3>
          <h6 className='text-[var(--text)] text-base font-normal leading-normal'>
            내 정보를 설정하면
            <br />
            나와 맞는 어르신을 빠르게 매칭받을 수 있어요!
          </h6>
        </div>

        <div className='flex flex-col space-y-4 w-full'>
          <Button onClick={handleLogin} className='w-full'>
            로그인하기
          </Button>
          <Button onClick={handleHome} variant='white' className='w-full'>
            홈으로 이동
          </Button>
        </div>
      </div>
    </>
  );
}
