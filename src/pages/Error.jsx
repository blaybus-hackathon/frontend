import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/custom/card';
import { Home, AlertTriangle, ArrowLeft, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/custom/Button';
import Logo from '/blaybus_logo_icon_text.svg';

export default function Error({ errorMessage, errorCode }) {
  const navigate = useNavigate();
  const [previousPath, setPreviousPath] = useState(null);
  const [errorInfo, setErrorInfo] = useState({
    code: errorCode,
    message: errorMessage,
  });

  useEffect(() => {
    // check previous page path before redirecting to error page
    const errorRedirectFrom = sessionStorage.getItem('errorRedirectFrom');
    // check prev page is not error to prevent infinite loop
    if (errorRedirectFrom && errorRedirectFrom !== '/error') {
      setPreviousPath(errorRedirectFrom);
    }

    // get error info from sessionStorage if available
    const storedErrorInfo = sessionStorage.getItem('errorInfo');
    if (storedErrorInfo) {
      try {
        const parsedErrorInfo = JSON.parse(storedErrorInfo);
        setErrorInfo({
          code: parsedErrorInfo.code || errorCode,
          message: parsedErrorInfo.message || errorMessage,
        });
        // clear error info from sessionStorage after reading
        sessionStorage.removeItem('errorInfo');
      } catch (e) {
        console.warn('Failed to parse stored error info:', e);
      }
    }
  }, [errorCode, errorMessage]);

  const handleGoBack = () => {
    if (previousPath) {
      navigate(previousPath);
      sessionStorage.removeItem('errorRedirectFrom');
    } else {
      navigate(-1);
    }
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-[var(--main)]/5 to-purple-50 flex items-center justify-center px-4'>
      <Card className='w-full max-w-2xl shadow-xl border-0'>
        <CardContent className='p-8 sm:p-12 text-center space-y-8'>
          <div className='flex justify-center mb-6'>
            <img src={Logo} alt='돌봄워크 로고' className='h-16 w-auto' />
          </div>

          <div className='flex justify-center'>
            <div className='w-20 h-20 bg-[var(--main)]/10 rounded-full flex items-center justify-center'>
              <AlertTriangle className='w-10 h-10 text-[var(--main)]' />
            </div>
          </div>

          <div className='space-y-4'>
            <h1 className='text-xl lg:text-2xl font-bold text-gray-900'>
              {errorInfo.code >= 500 ? '서버 오류가 발생했습니다' : '일시적인 오류가 발생했습니다'}
            </h1>

            {/* custom error message */}
            {errorInfo.message ? (
              <div className='space-y-3'>
                <p className='text-lg text-gray-600 leading-relaxed'>{errorInfo.message}</p>
                <p className='text-base text-gray-500'>잠시 후 다시 시도해 주세요.</p>
              </div>
            ) : (
              <p className='text-lg text-gray-600 leading-relaxed'>
                {errorInfo.code >= 500 ? (
                  <>
                    서버에 일시적인 문제가 발생했습니다.
                    <br />
                    잠시 후 다시 시도해 주세요.
                  </>
                ) : (
                  <>
                    죄송합니다. 서비스 이용 중 문제가 발생했습니다.
                    <br />
                    잠시 후 다시 시도해 주세요.
                  </>
                )}
              </p>
            )}

            {errorInfo.code && <p className='text-sm text-gray-500'>오류 코드: {errorInfo.code}</p>}
          </div>

          <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
            <Button onClick={handleRetry} className='text-lg px-6 py-4 flex-1'>
              <RotateCcw className='mr-2 w-5 h-5' />
              다시 시도
            </Button>

            {previousPath && (
              <Button onClick={handleGoBack} variant='outline' className='text-lg px-6 py-4 flex-1'>
                <ArrowLeft className='mr-2 w-5 h-5' />
                이전 페이지로
              </Button>
            )}

            <Button asChild variant='white' className='text-lg px-6 py-4 flex-1'>
              <Link to='/'>
                <Home className='mr-2 w-5 h-5' />
                홈으로
              </Link>
            </Button>
          </div>

          <div className='text-gray-500 text-base space-y-1'>
            <p>• 잠시 후 다시 시도해 주세요</p>
            <p>• 인터넷 연결 상태를 확인해 주세요</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
