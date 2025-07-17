import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, User } from 'lucide-react';
import { Button } from '@/components/ui/custom/Button';

export default function EmailCheckResult({ result, onReset }) {
  const navigate = useNavigate();

  const { email, code } = result;

  const isRegistered = code === 200;
  const isKakao = code === 201;
  const isNotRegistered = code === 404;

  const getMessage = (code) => {
    switch (code) {
      case 200:
        return '해당 이메일은 이미 가입된 이메일입니다.';
      case 201:
        return '해당 이메일은 카카오 가입 이메일입니다.';
      case 404:
        return '해당 이메일은 가입되지 않은 이메일입니다.';
      default:
        return '이메일 확인 중 오류가 발생했습니다.';
    }
  };

  const handleGoToLogin = () => {
    navigate('/signin');
  };

  return (
    <section className='px-2 py-8 lg:py-30 flex flex-col items-center justify-center flex-grow'>
      <div className='flex flex-col items-center justify-center w-full gap-5'>
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center ${isRegistered ? 'bg-green-100' : isKakao ? 'bg-yellow-100' : 'bg-red-100'}`}
        >
          {isRegistered ? (
            <CheckCircle className='w-8 h-8 text-green-600' />
          ) : isKakao ? (
            <AlertCircle className='w-8 h-8 text-yellow-600' />
          ) : (
            <User className='w-8 h-8 text-red-600' />
          )}
        </div>
        <div className='flex flex-col items-center justify-center px-7 gap-3'>
          <h2 className='text-lg font-semibold break-keep whitespace-pre-wrap'>
            {getMessage(code)}
          </h2>
          <p className='text-sm text-gray-500'>{email}</p>
          <Button onClick={handleGoToLogin} className='w-full text-lg font-normal p-3 mt-5'>
            로그인 페이지로 이동
          </Button>
          {isNotRegistered && (
            <Button variant='white' onClick={onReset} className='w-full text-lg font-normal p-3'>
              이메일 다시 찾기
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
