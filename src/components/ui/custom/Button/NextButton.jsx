import { Button } from '@/components/ui/custom/Button';
import { useElderRegiStepStore } from '@/store/center/useElderRegiStepStore.js';

export default function NextButton({ className, disabled, onClick }) {
  const nextStep = useElderRegiStepStore((state) => state.nextStep);

  const handleClick = () => {
    if (!disabled) {
      nextStep();
      onClick?.();
    }
  };

  return (
    <Button
      className={`w-[100%] h-[4.0625rem] ${disabled ? 'bg-[#B8B8B8] cursor-not-allowed' : ''} ${className}`}
      onClick={handleClick}
      disabled={disabled}
    >
      다음
    </Button>
  );
}
