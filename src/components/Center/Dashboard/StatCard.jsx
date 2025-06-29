export function StatCard({ title, value, className = '', style = {} }) {
  return (
    <div
      className={`flex flex-col gap-3 bg-white rounded-[1.25rem] box-shadow pb-4 lg:h-fit lg:pb-15 lg:gap-8 ${className}`}
      style={style}
    >
      <h3 className='text-start text-base lg:text-base xl:text-2xl text-[var(--text)] font-medium lg:font-semibold'>
        {title}
      </h3>
      <p className='text-center text-3xl lg:text-5xl text-[var(--main)] font-bold'>{value}</p>
    </div>
  );
}
