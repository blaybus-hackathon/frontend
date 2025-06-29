import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { request } from '../../api';
// import useProfileStore from '@/store/useProfileStore';
import useAuthStore from '@/store/auth/useAuthStore';

const KakaoCallback = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { updateAuth } = useAuthStore();

  useEffect(() => {
    const kakaoLogin = async () => {
      const code = params.get('code');
      const roleType = sessionStorage.getItem('roleType');

      if (!code) {
        alert('카카오 로그인 실패: 코드가 없습니다.');
        navigate('/signin');
        return;
      }

      try {
        const response = await request('POST', '/oauth/kakao-signup', { code, roleType });

        // 신규회원 가입 안내 (case 2, 3)
        if (response.description?.includes('회원가입')) {
          updateAuth({
            email: response.email,
            userAuth: response.roleType,
            loginType: 'kakao',
          });
          alert('회원 정보가 존재하지 않습니다.\n회원가입을 진행해주세요.');

          response.roleType === 'MEMBER' ? navigate('/helper/signup') : navigate('/center/signup');
        } else {
          updateAuth({
            email: response.email,
          });
        }
      } catch (error) {
        console.error('카카오 로그인 실패:', error);
      }
    };

    kakaoLogin();
  }, [params]);

  return <p>로그인 중...</p>;
};

export default KakaoCallback;
