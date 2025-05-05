import Logo from '@/assets/images/logo.svg';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../custom/Button';

// TODO: 레이아웃 조정 필요
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

export default function Header({
  type = 'logo',
  title = '',
  progress = null,
  onBack = null,
  hidden = false,
}) {
  if (hidden || type === 'none') return null;

  if (type === 'logo') {
    return <LogoHeader />;
  }

  return <HeaderBackOrProgress type={type} title={title} progress={progress} onBack={onBack} />;
}
