import { useNavigate } from 'react-router-dom';
import backBtn from '@/assets/images/back-arrow.png';
import Progress from './Progress';
import Logo from '@/assets/images/logo.svg';

const DefaultHeader = ({ title, handleBack }) => {
  return (
    <header className='flex items-center px-6 h-[3.375rem] justify-between border-b border-b-[#C8C8C8]'>
      <button className='w-[1.625rem] h-auto cursor-pointer' onClick={handleBack}>
        <img src={backBtn} alt='back button' />
      </button>
      <p className='text-[var(--header-gray)] font-semibold text-xl'>{title}</p>
      <Progress currentPage={1} TotalPages={5} />
    </header>
  );
};

const SimpleHeader = () => {
  return (
    <header className='flex items-center px-[1.75rem] h-[5.625rem] justify-start'>
      <img src={Logo} alt='logo' className='w-[49%]' />
    </header>
  );
};

export default function Header({ title, variant = 'default' }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  switch (variant) {
    case 'simple':
      return <SimpleHeader />;
    case 'default':
    default:
      return <DefaultHeader title={title} handleBack={handleBack} />;
  }
}
