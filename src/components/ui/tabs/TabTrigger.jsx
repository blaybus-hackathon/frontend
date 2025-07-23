import { TabsTrigger } from '@/components/ui/custom/tabs';

export default function TabTrigger({ value, label, count }) {
  return (
    <TabsTrigger
      value={value}
      className={`flex justify-center items-center gap-1.5 lg:gap-2 cursor-pointer`}
    >
      {/* tab label */}
      <span>{label}</span>

      {/* count badge */}
      <span className='text-[0.8rem] font-semibold w-[1.375rem] h-[1.375rem] flex items-center justify-center text-white bg-[var(--main)] rounded-full mt-0.5'>
        {count}
      </span>
    </TabsTrigger>
  );
}
