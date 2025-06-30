import { Card, CardContent } from '@/components/ui/custom/card';
import { Home, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/custom/Button';
import Logo from '/blaybus_logo_icon_text.svg';

export default function Error() {
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
              일시적인 오류가 발생했습니다
            </h1>
            <p className='text-lg text-gray-600 leading-relaxed'>
              죄송합니다. 서비스 이용 중 문제가 발생했습니다.
              <br />
              잠시 후 다시 시도해 주세요.
            </p>
          </div>

          <Button ton asChild className='text-lg px-8 py-6 border-2 w-]full'>
            <Link to='/'>
              <Home className='mr-3 w-5 h-5' />
              홈으로 돌아가기
            </Link>
          </Button>

          <div className='text-gray-500 text-lg space-y-2'>
            <p>• 잠시 후 다시 시도해 주세요</p>
            <p>• 인터넷 연결 상태를 확인해 주세요</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
