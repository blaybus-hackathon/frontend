import { useNavigate } from 'react-router-dom';
import { useSignUpStore } from '@/store/auth/center/useSignUpStore';
import { Button } from '@/components/ui/custom/Button';
import defaultProfile from '/default_profile.png';

export default function SignUpComplete() {
  const navigate = useNavigate();
  const { signUpForm } = useSignUpStore();
  const { name, position, centerName } = signUpForm.personalInfo;

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className='flex flex-col items-center h-[80vh] justify-between'>
      <h1 className='text-[var(--text)] text-3xl font-bold leading-[1.5]'>
        돌봄워크에
        <br />
        가입되었습니다!
      </h1>

      <div className='flex flex-col space-y-5'>
        <div className='rounded-full overflow-hidden w-[10.5rem] h-[10.5rem]'>
          <img src={defaultProfile} alt='logo' />
        </div>
        <span className='text-[var(--text)] text-xl font-semibold'>
          {name} {position}님
        </span>
        <span className='text-[var(--text)] text-lg font-normal'>{centerName}</span>
      </div>

      <Button onClick={handleHome} className='w-full my-10'>
        홈으로 가기
      </Button>
    </div>
  );
}
