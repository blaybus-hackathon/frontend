import { useState } from 'react';
import { Button } from '@/components/ui/Button/Button';

export default function MultiSelect({ options, onSelect }) {
  const [selected, setSelected] = useState([]);

  const handleSelect = (option) => {
    const newSelected = selected.includes(option)
      ? selected.filter((item) => item !== option)
      : [...selected, option];

    setSelected(newSelected);
    onSelect?.(newSelected);
  };

  return (
    <>
      {options.map((option) => (
        <Button
          key={option}
          variant='outline'
          className={`h-[4.1875rem] w-full transition-all m-0 ${
            selected.includes(option) && 'bg-[var(--main)] text-white'
          }`}
          onClick={() => handleSelect(option)}
        >
          {option}
        </Button>
      ))}
    </>
  );
}
