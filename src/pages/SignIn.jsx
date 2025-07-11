import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '@/services/signInService';
import { AUTH_TYPE } from '@/constants/authType';
import AuthForm from '@/components/Auth/Authform';
import useAuthStore from '@/store/useAuthStore';

export default function SignIn() {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState('helper');
  const { login } = useAuthStore();

  const handleSubmit = async ({ email, password }) => {
    try {
      const response = await signIn({ email, password });

      if (response) {
        const { chatSenderId, email, userAuth } = response;

        // userAuth와 로그인 타입 일치하지 않으면
        if (userAuth !== AUTH_TYPE[loginType]) {
          alert('로그인 유형을 확인해주세요.\n해당 이메일과 로그인 유형이 일치하지 않습니다.');
          return;
        }

        login({
          chatSenderId,
          email,
          userAuth,
        });

        alert('로그인 되었습니다.');
        navigate('/');
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <main className='flex h-screen items-center'>
      <div className='container mx-auto'>
        <div className='flex'>
          <AuthForm type={loginType} onSubmit={handleSubmit} setLoginType={setLoginType} />
        </div>
      </div>
    </main>
  );
}
