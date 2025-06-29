import { Button } from '@/components/ui/custom/Button';

export default function NextButton({ className, disabled, onClick, label = '다음' }) {
  return (
    <Button
      className={`w-[100%] h-[4.0625rem] ${disabled ? 'bg-[#B8B8B8] cursor-not-allowed' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </Button>
  );
}
