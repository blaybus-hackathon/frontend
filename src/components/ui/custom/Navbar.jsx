import { Button } from '@/components/ui/custom/Button';
import { useNavigate } from 'react-router-dom';
import { Phone, Menu } from 'lucide-react';
import useProfileStore from '@/store/useProfileStore';
import Logo from '/blaybus_logo_icon_text.svg';

export default function Navbar() {
  const navigate = useNavigate();
  const { profile, clearProfile } = useProfileStore();

  return (
    <header className='bg-white shadow-sm border-b sticky top-0 z-50'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-10 flex justify-between items-center py-4'>
        <div className='flex justify-between items-center py-2 lg:py-4'>
          <div className='flex items-center space-x-3'>
            <img src={Logo} alt='logo' className='h-10 lg:h-12 w-auto' />
          </div>
        </div>

        <nav className='hidden md:flex items-center space-x-16 text-lg pl-40'>
          <a
            href='#service'
            className='text-gray-700 hover:text-[var(--main)] transition-colors font-medium'
          >
            서비스 소개
          </a>
          <a
            href='#how-to-use'
            className='text-gray-700 hover:text-[var(--main)] transition-colors font-medium'
          >
            이용방법
          </a>
          <a
            href='#contact'
            className='text-gray-700 hover:text-[var(--main)] transition-colors font-medium'
          >
            문의하기
          </a>
        </nav>

        <div className='flex items-center space-x-4'>
          <div className='hidden sm:flex items-center space-x-2 text-[var(--main)] font-bold text-lg'>
            <Phone className='w-5 h-5' />
            <span>1588-1234</span>
          </div>
          <div>
            {profile && profile.email !== '' ? (
              <Button
                className='text-lg px-6 py-3'
                onClick={() => {
                  clearProfile();
                  navigate('/signIn');
                }}
              >
                로그아웃
              </Button>
            ) : (
              <Button className='text-lg px-10 py-3' onClick={() => navigate('/signIn')}>
                로그인
              </Button>
            )}
          </div>

          <Button variant='ghost' size='icon' className='md:hidden'>
            <Menu className='w-6 h-6' />
          </Button>
        </div>
      </div>
    </header>
  );
}
