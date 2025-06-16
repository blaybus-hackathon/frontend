import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/custom/Button';
import { Input } from '@/components/ui/custom/Input';
import { User, LockKeyholeOpen } from 'lucide-react';
import Kakao from '/kakao_login_medium_wide.png';
import Logo from '/blaybus_logo_icon_text.svg';
import PropTypes from 'prop-types';

const AuthForm = ({ type, onSubmit, setLoginType }) => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    onSubmit({
      email: email.value,
      password: password.value,
    });
  };

  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div className='bg-white rounded-lg'>
      <img src={Logo} alt='logo' className='w-1/2 mx-auto py-8' />

      {/* 로그인 타입 선택 */}
      <div className='grid grid-cols-2 mb-8 gap-4'>
        <Button
          onClick={() => setLoginType('company')}
          className={`w-full h-[3.44rem] font-medium text-lg rounded-[0.31rem] border-none ${
            type === 'company'
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
        <div className='relative text-[var(--placeholder-gray)]'>
          <User className='absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--placeholder-gray)] z-1' />
          <Input
            id='email'
            type='email'
            placeholder='아이디를 입력해주세요.'
            className='w-full h-12 pl-12 placeholder:text-[var(--placeholder-gray)]'
          />
        </div>

        <div className='relative text-[var(--placeholder-gray)]'>
          <LockKeyholeOpen className='absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--placeholder-gray)] z-1' />
          <Input
            id='password'
            type='password'
            placeholder='비밀번호를 입력해주세요. '
            className='w-full h-12 pl-12 placeholder:text-[var(--placeholder-gray)]'
          />
        </div>

        <div className='flex justify-end mb-8'>
          {/* TODO: 아이디 - 비밀번호 찾기 추가 필요. */}
          <button className='text-[1.06rem] font-medium text-[var(--placeholder-gray)] border-b border-[var(--outline)]'>
            아이디 비밀번호 찾기
          </button>
        </div>

        <Button className='w-full h-[3.4rem] rounded-[0.31rem] text-lg font-medium' type='submit'>
          로그인
        </Button>
      </form>

      <Button
        variant='white'
        onClick={() => navigate('/helpler/signUp')}
        className='mt-2 w-full h-[3.4rem] rounded-[0.31rem] text-lg  font-medium'
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

AuthForm.propTypes = {
  type: PropTypes.oneOf(['helper', 'company']).isRequired,
  onSubmit: PropTypes.func.isRequired,
  setLoginType: PropTypes.func.isRequired,
};

export default AuthForm;
