import { Button } from '@/components/ui/custom/Button';

export default function NextButton({ className, disabled, onClick, label = '다음' }) {
  return (
    <Button
      className={`w-[100%] h-[4.0625rem] text-white ${disabled ? 'bg-[var(--disabled)] hover:bg-[var(--disabled)] active:bg-[var(--disabled)]' : ''} ${className}`}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
