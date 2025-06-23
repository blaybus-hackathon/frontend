import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '@/components/Auth/Authform';
import useProfileStore from '@/store/useProfileStore';
import { signIn } from '@/services/signInService';

export default function SignIn() {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState('helper');
  const { updateAuth } = useProfileStore();

  const handleSubmit = async ({ email, password }) => {
    try {
      const response = await signIn({ email, password });

      if (response) {
        const { chatSenderId, email, userAuth } = response;
        //Zustand에 저장
        updateAuth({
          chatSenderId,
          email,
          userAuth,
        });
        //zustand 프로필 내용도 저장 (세션에)
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
