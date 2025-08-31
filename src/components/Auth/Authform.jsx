import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/custom/Button';
import { Input } from '@/components/ui/custom/input';
import { Alert } from '@/components/ui/custom/alert';
import { User, LockKeyholeOpen } from 'lucide-react';
import { navigateToHome } from '@/routes/homeNavigation';
import Kakao from '/kakao_login_medium_wide.svg';
import Logo from '/blaybus_logo_icon_text.svg';
import { CLIENT_ROLE, ROLE_MAP } from '@/constants/authType';

const AuthForm = ({ type, onSubmit, setLoginType }) => {
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState('');

  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  // const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=https://dolbom-work.co.kr/login/oauth2/code/kakao&response_type=code`;

  function handleSubmit(e) {
    e.preventDefault();
    setAlertMessage('');

    const formData = new FormData(e.target);
    const email = formData.get('email')?.trim();
    const password = formData.get('password')?.trim();

    if (!email || !password) {
      setAlertMessage('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    onSubmit({ email, password, loginType: type });
  }

  function handleSignUpNavigation() {
    navigate(type === 'helper' ? '/helper/signup' : '/center/signup');
  }

  function handleKakaoLogin() {
    const serverRole = ROLE_MAP.toServer[type];
    const redirectUri = `${KAKAO_AUTH_URL}&state=${serverRole}`;

    window.location.href = redirectUri;
  }

  function handleFindAccount(e) {
    e.preventDefault();
    navigate('/find-account');
  }

  return (
    <div className='bg-white rounded-lg mx-auto'>
      <button
        onClick={() => navigateToHome(navigate)}
        className='w-1/2 mx-auto py-8 cursor-pointer'
      >
        <img src={Logo} alt='blaybus logo' className='w-full' />
      </button>

      {/* select login type */}
      <div className='grid grid-cols-2 mb-8 gap-4'>
        <Button
          onClick={() => setLoginType(CLIENT_ROLE.CENTER)}
          className={`w-full h-[3.44rem] font-medium text-lg rounded-[0.31rem] border-none ${
            type === CLIENT_ROLE.CENTER
              ? 'bg-[var(--main)] text-white'
              : 'bg-[var(--button-inactive)] text-[var(--placeholder-gray)]'
          }`}
        >
          관리자용
        </Button>
        <Button
          onClick={() => setLoginType(CLIENT_ROLE.HELPER)}
          className={`w-full h-[3.44rem] font-medium text-lg rounded-[0.31rem] border-none ${
            type === CLIENT_ROLE.HELPER
              ? 'bg-[var(--main)] text-white'
              : 'bg-[var(--button-inactive)] text-[var(--placeholder-gray)]'
          }`}
        >
          요양보호사용
        </Button>
      </div>

      {/* Alert 메시지 표시 */}
      {alertMessage && <Alert description={alertMessage} color='red' className='mb-4' />}

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='relative'>
          <User className='absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--placeholder-gray)] z-1' />
          <Input
            id='email'
            name='email'
            type='email'
            placeholder='아이디를 입력해주세요.'
            className='w-full h-12 pl-12 placeholder:text-[var(--placeholder-gray)]'
            required
            autoComplete='email'
          />
        </div>

        <div className='relative'>
          <LockKeyholeOpen className='absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--placeholder-gray)] z-1' />
          <Input
            id='password'
            name='password'
            type='password'
            placeholder='비밀번호를 입력해주세요.'
            className='w-full h-12 pl-12 placeholder:text-[var(--placeholder-gray)]'
            required
            autoComplete='current-password'
          />
        </div>

        <div className='flex justify-end mb-8'>
          <button
            type='button'
            className='text-base lg:text-[1.06rem] font-medium text-[var(--placeholder-gray)] border-b border-[var(--outline)] hover:bg-accent'
            onClick={handleFindAccount}
          >
            아이디 비밀번호 찾기
          </button>
        </div>

        <Button
          className={'w-full h-[3.4rem] rounded-[0.31rem] text-base lg:text-lg font-medium'}
          type='submit'
        >
          로그인
        </Button>
      </form>

      <Button
        variant='white'
        onClick={handleSignUpNavigation}
        className={
          'mt-2 w-full h-[3.4rem] rounded-[0.31rem] text-base lg:text-lg font-medium hover:brightness-90 transition-all'
        }
      >
        돌봄워크 회원가입
      </Button>

      <div className='rounded-[0.31rem] overflow-hidden h-[3.4rem] w-full bg-[#fee500] flex items-center justify-center mt-2 cursor-pointer hover:brightness-90 transition-all'>
        <button
          className='h-full rounded-[0.31rem] overflow-hidden cursor-pointer'
          onClick={handleKakaoLogin}
          type='button'
        >
          <img src={Kakao} alt='kakao' className='w-full h-full object-fit' />
        </button>
      </div>
    </div>
  );
};

export default AuthForm;
