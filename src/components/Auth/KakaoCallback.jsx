import { useSearchParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { kakaoApi } from '@/services/kakaoService';
import useAuthStore from '@/store/useAuthStore';
import { useSignUpStore as useCenterSignUpStore } from '@/store/auth/center/useSignUpStore';
import { useSignUpStore as useHelperSignUpStore } from '@/store/auth/helper/useSignUpStore';
import { navigateToHome } from '@/routes/homeNavigation';

const ALERT_MESSAGES = {
  CASE1: '카카오 계정이 연동되었습니다. 자동 로그인됩니다.',
  CASE2: '사이트 내 회원 정보가 존재하지 않습니다.\n회원가입 페이지로 이동합니다.',
  CASE3: '회원 가입이 완료되지 않았습니다.\n회원가입 페이지로 이동합니다.',
  CASE4: '로그인되었습니다.',
  DEFAULT: '알 수 없는 인증 케이스입니다.\n관리자에게 문의하세요.',
};

const KakaoCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // URL 파라미터 추출
  const code = searchParams.get('code');
  const roleType = searchParams.get('state');
  const errorParam = searchParams.get('error');

  // zustand actions
  const login = useAuthStore((s) => s.login);
  const setCenterKakaoUser = useCenterSignUpStore((s) => s.setKakaoUser);
  const setHelperKakaoUser = useHelperSignUpStore((s) => s.setKakaoUser);

  // TODO: 추후 에러, 로딩 처리 필요
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('카카오 로그인 정보를 확인하고 있습니다...');
  const [error, setError] = useState('');

  // 중복 실행 방지
  const hasInitialized = useRef(false);

  const redirectToHome = (delay = 3000) => {
    setTimeout(() => navigate('/', { replace: true }), delay);
  };

  const handleKakaoLogin = async () => {
    try {
      console.log('[KAKAO CALLBACK] 카카오 로그인 처리 시작:', { code, roleType });
      setLoadingMessage('서버와 통신 중입니다...');

      // login api 호출
      const response = await kakaoApi.login(code, roleType);
      console.log('[KAKAO CALLBACK] 서버 응답:', response);

      const { caseType, email, nickName, roleType: resRole } = response || {};

      // 필수 응답 검증
      if (!caseType || !email) {
        console.error('[KAKAO CALLBACK] 서버 응답 검증 실패:', response);
        throw new Error('서버 응답이 올바르지 않습니다.');
      }

      console.log(
        '[KAKAO CALLBACK] 케이스 타입:',
        caseType,
        '이메일:',
        email,
        '응답 역할:',
        resRole,
      );
      setLoadingMessage('로그인 정보를 처리하고 있습니다...');

      const message = ALERT_MESSAGES[caseType] || ALERT_MESSAGES.DEFAULT;

      // 케이스 별 라우팅 처리
      if (['CASE1', 'CASE4'].includes(caseType)) {
        if (roleType !== resRole) {
          alert(
            '로그인 유형을 확인해주세요.\n선택한 로그인 유형과 카카오 계정이 일치하지 않습니다.',
          );
          setError('로그인 유형 불일치');
          setIsLoading(false);
          redirectToHome();
          return;
        }

        // 기존 회원 로그인 처리
        await login({ email, userAuth: resRole, nickname: nickName });
        alert(message);
        navigateToHome(navigate);
      } else if (['CASE2', 'CASE3'].includes(caseType)) {
        // 회원가입이 필요한 경우 처리
        const kakaoUser = { email, nickName, userAuth: resRole };

        if (resRole === 'MANAGER') {
          setCenterKakaoUser(kakaoUser);
        } else if (resRole === 'MEMBER') {
          setHelperKakaoUser(kakaoUser);
        } else {
          throw Error('지원하지 않는 로그인 유형입니다.');
        }

        alert(message);
        navigate(resRole === 'MANAGER' ? '/center/signup' : '/helper/signup', { replace: true });
      } else {
        throw new Error('알 수 없는 인증 케이스입니다.');
      }
    } catch (e) {
      console.error('[KAKAO CALLBACK] 에러 발생:', {
        message: e.message,
        status: e.response?.status,
        data: e.response?.data,
        stack: e.stack,
      });
      setError(e.message);
      setIsLoading(false);
      redirectToHome();
    }
  };

  useEffect(() => {
    // 이미 실행되었으면 early return
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // 카카오 로그인 에러 처리
    if (errorParam) {
      setError(
        errorParam === 'access_denied'
          ? '카카오 로그인 권한이 거부되었습니다.'
          : '카카오 로그인이 취소되었습니다.',
      );
      setIsLoading(false);
      redirectToHome();
      return;
    }

    if (!code || !roleType) {
      setError('잘못된 접근입니다. 카카오 로그인을 다시 시도해주세요.');
      setIsLoading(false);
      redirectToHome();
      return;
    }

    handleKakaoLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return (
      <>
        <h2>카카오 로그인 처리 중</h2>
        {loadingMessage && <p>{loadingMessage}</p>}
        <p>잠시만 기다려주세요...</p>
      </>
    );
  }

  if (error) {
    return (
      <>
        <h2>로그인 처리 실패</h2>
        <p>{error}</p>
      </>
    );
  }

  return null;
};
export default KakaoCallback;
