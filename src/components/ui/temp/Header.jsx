import { useNavigate } from 'react-router-dom';
import backBtn from '@/assets/images/back-arrow.png';
import Progress from './Progress';

export default function Header({ title, currentPage = 1, totalPage = 5 }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  return (
    <header className='flex items-center px-6 h-[3.375rem] justify-between border-b border-b-[#C8C8C8]'>
      <button className='w-[1.625rem] h-auto cursor-pointer' onClick={handleBack}>
        <img src={backBtn} alt='back button' />
      </button>
      <p className='text-[var(--header-gray)] font-semibold text-xl'>{title}</p>
      <Progress currentPage={currentPage} TotalPages={totalPage} />
    </header>
  );
}
