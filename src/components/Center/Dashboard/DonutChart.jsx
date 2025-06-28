import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

export function DonutChart({
  title,
  acceptRate,
  rejectRate,
  acceptColor = 'var(--main)',
  rejectColor = 'var(--main-light)',
  className = '',
  size = 'md',
}) {
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
    sm: {
      container: 'h-40',
      outerRadius: 45,
      innerRadius: 25,
      centerText: 'text-lg',
      legendText: 'text-xs',
    },
    md: {
      container: 'h-35',
      outerRadius: 55,
      innerRadius: 33,
      centerText: 'text-xl',
      legendText: 'text-[0.69rem]',
    },
    lg: {
      container: 'h-52',
      outerRadius: 80,
      innerRadius: 50,
      centerText: 'text-3xl',
      legendText: 'text-base',
    },
  };

  // 현재 크기 선택
  const currentSize = sizeMap[size];

  // render legend
  const renderCustomLegend = (props) => {
    const { payload } = props;
    return (
      <div className='flex justify-between w-full mt-4'>
        {payload.map((entry, index) => (
          <div key={index} className='flex items-center gap-1'>
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
      {acceptRate} <span className='text-sm'>%</span>
    </text>
  );

  return (
    <div className={`bg-white rounded-2xl box-shadow flex flex-col ${className}`}>
      <h3
        className='text-start text-base text-[var(--text)] font-medium mb-2
      '
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
                paddingAngle={2}
                dataKey='value'
                startAngle={90}
                endAngle={450}
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
