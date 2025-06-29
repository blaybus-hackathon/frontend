import {
  BarChart as ReBarChart,
  Bar,
  Cell,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { useBreakpoint } from '@/hooks/useBreakpoint';

export function BarChart({
  title,
  data,
  showGrid = false,
  showLegend = true,
  className = '',
  showXAxis = true,
  showYAxis = false,
  barCategoryGaps = { base: 15, sm: 10, md: 60, lg: 20, xl: 25, '2xl': 50 },
  gridInterval = 50,
}) {
  const breakpoint = useBreakpoint(false);

  const getCurrentBarGap = () => {
    return barCategoryGaps[breakpoint] || barCategoryGaps.base;
  };

  const renderCustomLegend = () => (
    <div className='flex flex-col items-center justify-center gap-3 lg:gap-6 pr-6'>
      {data.map((item, index) => (
        <div key={index} className='flex items-center gap-1.5 lg:gap-3'>
          <div
            className='w-5 h-5 lg:w-7 lg:h-7 rounded-full'
            style={{ backgroundColor: item.color }}
          />
          <span className='text-sm lg:text-xl text-[var(--text)] font-medium'>{item.value}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className={`bg-white rounded-2xl box-shadow flex flex-col ${className}`}>
      <h3 className='text-start text-base text-[var(--text)] font-medium mb-2 lg:text-2xl lg:font-semibold lg:mb-10'>
        {title}
      </h3>

      {/* chart area */}
      <div className='w-full flex h-full'>
        <ResponsiveContainer width='100%' height='100%'>
          <ReBarChart
            key={breakpoint}
            data={data}
            margin={{ top: 0, right: 40, left: 0, bottom: 0 }}
            barCategoryGap={getCurrentBarGap()}
          >
            {showGrid && (
              <CartesianGrid
                vertical={false}
                strokeDasharray='3 3'
                stroke='#d4d4d4'
                strokeWidth={1}
                interval={gridInterval}
              />
            )}

            <Bar dataKey='value' radius={[6, 6, 0, 0]} height={100}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
            {showXAxis && (
              <XAxis
                dataKey='name'
                tickLine={false}
                axisLine={false}
                className='text-[var(--text)] text-sm font-medium lg:text-lg'
              />
            )}
            {showYAxis && (
              <YAxis
                tickLine={false}
                axisLine={false}
                className='text-[#9e9e9e] text-sm font-medium lg:text-lg'
              />
            )}
          </ReBarChart>
        </ResponsiveContainer>
        {showLegend && renderCustomLegend()}
      </div>
    </div>
  );
}
