import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ButtonLoader({ text = '로딩중...', iconSize = 'w-4 h-4', className }) {
  return (
    <div className={cn('flex items-center justify-center gap-2', className)}>
      <Loader2 className={cn('animate-spin', iconSize)} />
      {text}
    </div>
  );
}
