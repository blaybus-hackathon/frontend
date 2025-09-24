import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signIn } from '@/services/signInService';
import { CLIENT_ROLE, ROLE_MAP } from '@/constants/authType';
import AuthForm from '@/components/Auth/Authform';
import useAuthStore from '@/store/useAuthStore';
import { getRedirectPath } from '@/utils/authUtils';

export default function SignIn() {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState(CLIENT_ROLE.HELPER);
  const { login } = useAuthStore();

  const handleSubmit = async ({ email, password, loginType: selectedLoginType }) => {
    try {
      const response = await signIn({ email, password });

      if (!response) {
        alert('로그인에 실패했습니다. 다시 시도해주세요.');
        return;
      }

      const { chatSenderId, email: userEmail, userAuth, cmSeq, helperSeq } = response;

      // validate userAuth
      const expectedServerRole = ROLE_MAP.toServer[selectedLoginType];

      if (userAuth !== expectedServerRole) {
        alert(
          `로그인 유형을 확인해주세요.\n해당 이메일은 ${userAuth === 'MANAGER' ? '관리자' : '요양보호사'} 계정입니다.`,
        );
        return;
      }

      // // validate require data
      // if (userAuth === 'MANAGER' && !cmSeq) {
      //   console.error('Manager role requires cmSeq');
      //   alert('관리자 정보가 올바르지 않습니다.');
      //   return;
      // }

      // if (userAuth === 'MEMBER' && !helperSeq) {
      //   console.error('Member role requires helperSeq');
      //   alert('요양보호사 정보가 올바르지 않습니다.');
      //   return;
      // }

      login({
        chatSenderId,
        email: userEmail,
        userAuth,
        cmSeq,
        helperSeq,
      });

      alert('로그인 되었습니다.');

      // redirect page by userAuth
      const clientRole = ROLE_MAP.toClient[userAuth];
      const redirectPath = getRedirectPath(clientRole);
      navigate(redirectPath, { replace: true });
    } catch (error) {
      console.error('Login failed:', error);
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
