import { useState } from 'react';
import { Button } from '@/components/ui/Button/Button';

export default function SingleSelect({ options, onSelect, className }) {
  const [selected, setSelected] = useState('');

  const handleSelect = (option) => {
    setSelected(option);
    onSelect?.(option);
  };

  return (
    <>
      {options.map((option) => (
        <Button
          key={option}
          variant='outline'
          className={`h-[4.1875rem] w-full transition-all m-0 ${
            selected == option && 'bg-[var(--main)] text-white'
          } ${className}`}
          onClick={() => handleSelect(option)}
        >
          {option}
        </Button>
      ))}
    </>
  );
}
