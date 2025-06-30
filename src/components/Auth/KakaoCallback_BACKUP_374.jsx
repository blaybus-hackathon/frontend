import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { request } from '../../api';

const KakaoCallback = () => {
  const [params] = useSearchParams();
  const code = params.get('code');
  const navigate = useNavigate();

  useEffect(() => {
    if (!code) {
      console.warn('카카오 로그인 실패: 코드가 없습니다.');
      return;
    }

    const fetchToken = async () => {
      try {
        const response = await request('POST', '/oauth/kakao-signup', { code });
        console.log(response);
        console.log('카카오 로그인 응답: ', response);
      } catch (error) {
        console.error('Kakao 토큰 발급 실패:', error);
        navigate('/');
      }
    };

    fetchToken();
  }, [code]);

  return <p>로그인 중...</p>;
};

export default KakaoCallback;
