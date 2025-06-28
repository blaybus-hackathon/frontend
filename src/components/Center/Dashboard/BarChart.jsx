import {
  BarChart as ReBarChart,
  Bar,
  Cell,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
} from 'recharts';

export function BarChart({
  title,
  data,
  showGrid = false,
  showLegend = true,
  className = '',
  showXAxis = true,
}) {
  const renderCustomLegend = () => (
    <div className='flex flex-col items-center justify-center gap-3 lg:gap-6 pr-6'>
      {data.map((item, index) => (
        <div key={index} className='flex items-center gap-1.5'>
          <div
            className='w-5 h-5 lg:w-4 lg:h-4 rounded-full'
            style={{ backgroundColor: item.color }}
          />
          <span className='text-sm lg:text-sm text-[var(--text)] font-medium'>{item.value}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className={`bg-white rounded-2xl box-shadow flex flex-col ${className}`}>
      <h3 className='text-start text-base text-[var(--text)] font-medium mb-2'>{title}</h3>

      {/* chart area */}
      <div className='w-full flex-1 flex'>
        <ResponsiveContainer width='100%' height='100%'>
          <ReBarChart
            data={data}
            margin={{ top: 0, right: 40, left: 20, bottom: 0 }}
            barCategoryGap={15}
          >
            {showGrid && <CartesianGrid vertical={false} strokeDasharray='3 3' stroke='#d4d4d4' />}

            <Bar dataKey='value' radius={[4, 4, 0, 0]} height={100}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
            {showXAxis && (
              <XAxis
                dataKey='name'
                tickLine={false}
                axisLine={false}
                className='text-[var(--text)] text-sm font-medium'
              />
            )}
          </ReBarChart>
        </ResponsiveContainer>
        {showLegend && renderCustomLegend()}
      </div>
    </div>
  );
}
