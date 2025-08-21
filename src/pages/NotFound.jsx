import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/custom/Button';
import { Card, CardContent } from '@/components/ui/custom/card';
import { Home, Search } from 'lucide-react';
import { getHomeLink } from '@/routes/homeNavigation';
import Logo from '/blaybus_logo_icon_text.svg';

export default function NotFound() {
  const homeLink = getHomeLink();

  return (
    <div className='min-h-screen bg-gradient-to-br from-[var(--main)]/5 to-[var(--main)]/10 flex items-center justify-center px-4'>
      <Card className='w-full max-w-2xl shadow-xl border-0'>
        <CardContent className='p-8 sm:p-12 text-center space-y-8'>
          <div className='flex justify-center mb-6'>
            <Link to={homeLink}>
              <img src={Logo} alt='돌봄워크 로고' className='h-16 w-auto' />
            </Link>
          </div>

          {/* 404 아이콘 */}
          <div className='flex justify-center'>
            <div className='w-20 h-20 bg-[var(--main)]/10 rounded-full flex items-center justify-center'>
              <Search className='w-10 h-10 text-[var(--main)]' />
            </div>
          </div>

          {/* 404 메시지 */}
          <div className='space-y-4'>
            <h1 className='text-2xl lg:text-3xl font-bold text-gray-900'>
              페이지를 찾을 수 없습니다
            </h1>
            <p className='text-lg lg:text-xl text-gray-600 leading-relaxed break-keep'>
              죄송합니다.
              <br />
              요청하신 페이지가 존재하지 않습니다.
            </p>
          </div>

          <Button
            asChild
            className='bg-[var(--main)] hover:bg-[var(--main)]/90 text-lg py-6 w-[100%] mx-auto'
          >
            <Link to={homeLink}>
              <Home className='mr-3 w-5 h-5' />
              홈으로 돌아가기
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
