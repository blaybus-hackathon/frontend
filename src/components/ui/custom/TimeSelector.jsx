import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/custom/select';
import { TIMES } from '@/constants/times';

export const TimeSelector = (
  {
    value,
    onChange,
    placeholder,
    className = '',
    useIndex = false, // 시간 인덱스 사용 여부
    onOpenChange,
  },
  ref,
) => {
  return (
    <Select onValueChange={onChange} value={value} onOpenChange={onOpenChange} ref={ref}>
      <SelectTrigger
        className={`w-[45%] h-[4.06rem] text-xl font-normal text-[var(--text)] ${className}`}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {TIMES.map((time, index) => (
          <SelectItem key={time} value={useIndex ? index : time}>
            {time}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
