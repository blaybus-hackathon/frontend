import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/custom/Button';
import { Input } from '@/components/ui/custom/input';
import { User, LockKeyholeOpen } from 'lucide-react';
import Kakao from '/kakao_login_medium_wide.png';
import Logo from '/blaybus_logo_icon_text.svg';
import { AUTH_TYPE } from '@/constants/authType';

const AuthForm = ({ type, onSubmit, setLoginType }) => {
  const navigate = useNavigate();

  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile_nickname,profile_image,account_email`;

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email')?.trim();
    const password = formData.get('password')?.trim();

    if (!email || !password) {
      alert('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }
    onSubmit({ email, password });
  }

  // 회원가입이 되어있지 않으면 navigate
  function handleSignUpNavigation() {
    navigate(type === 'helper' ? '/helper/signup' : '/center/signup');
  }

  function handleKakaoLogin() {
    const roleType = AUTH_TYPE[type];
    const redirectUri = `${KAKAO_AUTH_URL}&state=${roleType}`;

    window.location.href = redirectUri;
  }

  // TODO: 이메일/비밀번호 찾기
  function handleFindAccount(e) {
    e.preventDefault();
    alert('기능이 곧 추가될 예정입니다.');
  }

  return (
    <div className='bg-white rounded-lg'>
      <img src={Logo} alt='blaybus logo' className='w-1/2 mx-auto py-8' />

      {/* 로그인 타입 선택 */}
      <div className='grid grid-cols-2 mb-8 gap-4'>
        <Button
          onClick={() => setLoginType('center')}
          className={`w-full h-[3.44rem] font-medium text-lg rounded-[0.31rem] border-none ${
            type === 'center'
              ? 'bg-[var(--main)] text-white'
              : 'bg-[var(--button-inactive)] text-[var(--placeholder-gray)]'
          }`}
        >
          관리자용
        </Button>
        <Button
          onClick={() => setLoginType('helper')}
          className={`w-full h-[3.44rem] font-medium text-lg rounded-[0.31rem] border-none ${
            type === 'helper'
              ? 'bg-[var(--main)] text-white'
              : 'bg-[var(--button-inactive)] text-[var(--placeholder-gray)]'
          }`}
        >
          요양보호사용
        </Button>
      </div>

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
          {/* TODO: 아이디 - 비밀번호 찾기 추가 필요. */}
          <button
            className='text-[1.06rem] font-medium text-[var(--placeholder-gray)] border-b border-[var(--outline)]'
            onClick={handleFindAccount}
          >
            아이디 비밀번호 찾기
          </button>
        </div>

        <Button className={'w-full h-[3.4rem] rounded-[0.31rem] text-lg font-medium'} type='submit'>
          로그인
        </Button>
      </form>

      <Button
        variant='white'
        onClick={handleSignUpNavigation}
        className={'mt-2 w-full h-[3.4rem] rounded-[0.31rem] text-lg  font-medium'}
      >
        돌봄워크 회원가입
      </Button>
      {/* 아이콘 추가 Label로 수정 필요. */}

      {/* TODO: 카카오 로그인 psd 파일 편집 불가인 관계로 */}
      <button className={`w-full h-[3.4rem] mt-2`} onClick={handleKakaoLogin} type='button'>
        <img src={Kakao} alt='kakao' className='w-full h-full object-fit' />
      </button>
    </div>
  );
};

export default AuthForm;
