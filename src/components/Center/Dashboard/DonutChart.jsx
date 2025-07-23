import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { useBreakpoint } from '@/hooks/useBreakpoint';

export function DonutChart({
  title,
  acceptRate,
  rejectRate,
  acceptColor = 'var(--main)',
  rejectColor = 'var(--main-light)',
  className = '',
}) {
  const breakpoint = useBreakpoint(false);

  const data = [
    {
      name: '수락률',
      value: acceptRate,
      color: acceptColor,
    },
    {
      name: '거절률',
      value: rejectRate,
      color: rejectColor,
    },
  ];

  // 차트 크기 매핑
  const sizeMap = {
    base: {
      container: 'h-35',
      outerRadius: 55,
      innerRadius: 33,
      titleMargin: 'mb-0',
      centerText: 'text-xl',
      centerPercent: 'text-sm',
      legendText: 'text-xs',
      legendMargin: 'mt-1',
    },
    sm: {
      container: 'h-40',
      outerRadius: 45,
      innerRadius: 25,
      centerText: 'text-xl',
      centerPercent: 'text-sm',
      legendText: 'text-xs',
    },
    md: {
      container: 'h-35',
      outerRadius: 55,
      innerRadius: 33,
      centerText: 'text-xl',
      legendText: 'text-[0.69rem]',
      legendMargin: 'mt-2',
    },
    lg: {
      container: 'h-70',
      outerRadius: 110,
      innerRadius: 60,
      centerText: 'text-4xl',
      centerPercent: 'text-2xl',
      legendText: 'text-xl',
      legendMargin: 'mt-10',
    },
    xl: {
      container: 'h-80',
      outerRadius: 130,
      innerRadius: 70,
      titleMargin: 'mb-10',
      centerText: 'text-5xl',
      centerPercent: 'text-3xl',
      legendText: 'text-xl',
      legendMargin: 'mt-10',
    },
    '2xl': {
      container: 'h-100',
      outerRadius: 180,
      innerRadius: 105,
      titleMargin: 'mb-15',
      centerText: 'text-7xl',
      centerPercent: 'text-4xl',
      legendText: 'text-2xl',
      legendMargin: 'mt-14',
    },
  };

  // 현재 크기 선택
  const currentSize = sizeMap[breakpoint];

  // render legend
  const renderCustomLegend = (props) => {
    const { payload } = props;
    return (
      <div
        className={`flex justify-between md:justify-center md:gap-4 lg:justify-center lg:gap-10 w-full ${currentSize.legendMargin}`}
      >
        {payload.map((entry, index) => (
          <div key={index} className='flex items-center gap-1 lg:gap-2'>
            <div
              className='w-4 h-4 lg:w-5 lg:h-5 rounded-full'
              style={{ backgroundColor: entry.color }}
            />
            <span className={`${currentSize.legendText} text-[var(--text)]`}>{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  // render center label
  const renderCenterLabel = () => (
    <text
      x='50%'
      y='50%'
      textAnchor='middle'
      dominantBaseline='middle'
      className={`${currentSize.centerText} font-semibold text-[var(--main)] flex gap-[0.1rem] items-center`}
    >
      {acceptRate} <span className={`${currentSize.centerPercent}`}>%</span>
    </text>
  );

  return (
    <div className={`bg-white rounded-2xl box-shadow flex flex-col ${className}`}>
      <h3
        className={`text-start text-base text-[var(--text)] font-medium lg:text-2xl lg:font-semibold ${currentSize.titleMargin}`}
      >
        {title}
      </h3>

      {/* 차트 영역 */}
      <div className='flex flex-col items-center justify-center gap-2'>
        <div className={`w-full ${currentSize.container} relative`}>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                cx='50%'
                cy='50%'
                data={data}
                innerRadius={currentSize.innerRadius}
                outerRadius={currentSize.outerRadius}
                paddingAngle={1}
                dataKey='value'
                startAngle={90}
                endAngle={470}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend content={renderCustomLegend} verticalAlign='bottom' height={1} />
            </PieChart>
          </ResponsiveContainer>
          {/* 중앙 퍼센트 텍스트 */}
          <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
            {renderCenterLabel()}
          </div>
        </div>
      </div>
    </div>
  );
}
