import Logo from '@/assets/images/logo.svg';
import { ChevronLeft, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../custom/Button';

function LogoHeader({ hasBorder = true }) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <header
      className={`flex items-center px-7 w-full h-[5.625rem] ${hasBorder ? 'border-b border-b-[#C8C8C8]' : ''}`}
    >
      <img src={Logo} alt='logo' className='w-[12.625rem] h-auto' onClick={handleLogoClick} />
    </header>
  );
}

function HeaderBackOrProgress({ type, title, progress, onBack, hasBorder = true }) {
  return (
    <header
      className={`flex justify-between items-center px-6 h-[4.875rem] ${hasBorder ? 'border-b border-b-[#C8C8C8]' : ''}`}
    >
      <div className='flex items-center gap-[0.625rem]'>
        {(type === 'back' || type === 'back-progress') && (
          <Button variant='ghost' onClick={onBack} className='w-[1.625rem] h-[1.625rem]'>
            <ChevronLeft />
          </Button>
        )}
        <p className='font-semibold text-[1.5rem] lg:text-[1.625rem]'>{title}</p>
      </div>
      <div className='flex items-center'>
        {type === 'back-progress' && (
          <p className='text-[1.5rem] lg:text-[1.625rem] font-semibold text-[var(--main)]'>
            {progress.current}/{progress.total}
          </p>
        )}
      </div>
    </header>
  );
}

export function DesktopHeader() {
  const getCurrentDate = () => {
    return new Date().toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <header className='hidden lg:flex lg:items-center lg:justify-between lg:px-8 lg:py-4 bg-white border-b border-b-[#C8C8C8] h-[5.625rem]'>
      <div className='flex items-center gap-6'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-[#b2b2b2] w-5 h-5' />
          <input
            type='text'
            placeholder='검색하기'
            className='pl-10 pr-4 py-2 w-120 border border-[#b2b2b2] rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--main)] focus:border-transparent transition-all duration-200 text-lg text-[#2f2f2f] placeholder:text-[#767676]'
          />
        </div>
      </div>

      <div className='flex items-center gap-4'>
        <span className='text-[#2f2f2f ] font-medium text-lg'>{getCurrentDate()}</span>

        <button
          className='flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors duration-200'
          aria-label='사용자 메뉴'
        >
          <span className='text-[#2f2f2f] font-medium text-lg'>강동구청 어르신케어센터</span>
        </button>
      </div>
    </header>
  );
}

export default function Header({
  type = 'logo',
  title = '',
  progress = null,
  onBack = null,
  hidden = false,
  hasBorder = true,
}) {
  if (hidden || type === 'none') return null;

  if (type === 'logo') {
    return <LogoHeader hasBorder={hasBorder} />;
  }

  return (
    <HeaderBackOrProgress
      type={type}
      title={title}
      progress={progress}
      onBack={onBack}
      hasBorder={hasBorder}
    />
  );
}
