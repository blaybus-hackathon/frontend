import { TabsTrigger } from '@/components/ui/custom/tabs';

export default function TabTrigger({ value, label, count }) {
  return (
    <TabsTrigger value={value}>
      {/* tab label */}
      <span className='mr-2'>{label}</span>

      {/* count badge */}
      <span className='text-[0.8rem] font-semibold w-[1.375rem] h-[1.375rem] flex items-center justify-center text-white bg-[var(--main)] rounded-full'>
        {count}
      </span>
    </TabsTrigger>
  );
}
