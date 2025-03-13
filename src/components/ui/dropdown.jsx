import { useState } from 'react';

const Dropdown = ({ changeRecruit }) => {
  const [isOpen, setIsOpen] = useState(false); // 드롭다운 상태 관리
  const [wageStr, setWageStr] = useState('시급');

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // 드롭다운 열기/닫기 토글
  };

  const handleOptionClick = (option, wageName) => {
    setWageStr(wageName);
    changeRecruit((prev) => ({ ...prev, wageState: option }));
    // setSelectedOption(option); // 옵션 선택
    setIsOpen(false); // 선택 후 드롭다운 닫기
  };

  return (
    <div className='relative inline-block flex-1 items-center'>
      <button
        onClick={toggleDropdown}
        className='px-4 py-2 bg-[var(--button-inactive)] text-black rounded h-full rounded-md w-full text-lg'
      >
        {wageStr}
        <span className='absolute right-4 top-3'>⌵</span>
      </button>

      {isOpen && (
        <ul className='absolute mt-2 w-full bg-white border border-gray-300 rounded shadow-lg'>
          <li
            onClick={() => handleOptionClick(1, '시급')}
            className='px-4 py-2 cursor-pointer hover:bg-gray-100'
          >
            시급
          </li>
          <li
            onClick={() => handleOptionClick(2, '일급')}
            className='px-4 py-2 cursor-pointer hover:bg-gray-100'
          >
            일급
          </li>
          <li
            onClick={() => handleOptionClick(3, '주급')}
            className='px-4 py-2 cursor-pointer hover:bg-gray-100'
          >
            주급
          </li>
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
