import { AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * @param {{
 *   icon?: React.ReactNode,
 *   description: string,
 *   color?: 'red' | 'blue',
 *   className?: string
 * }} props
 */
export function Alert({ icon, description, color = 'red', className }) {
  const COLOR_MAP = {
    red: {
      icon: 'text-red-600',
      desc: 'text-red-600',
      defaultIcon: <AlertCircle className='w-4 h-4' />,
    },
  };

  const colorClass = COLOR_MAP[color] || COLOR_MAP.red;
  const displayIcon = icon || colorClass.defaultIcon;

  return (
    <div className={cn('flex items-center justify-start gap-2', className)}>
      <div className={`${colorClass.icon} pt-0.5`}>{displayIcon}</div>
      {description && <p className={`text-sm ${colorClass.desc}`}>{description}</p>}
    </div>
  );
}
