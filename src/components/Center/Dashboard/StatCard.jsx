export function StatCard({ title, value, className = '', style = {} }) {
  return (
    <div
      className={`flex flex-col gap-3 bg-white rounded-[1.25rem] box-shadow pb-4 ${className}`}
      style={style}
    >
      <h3 className='text-start text-base text-[var(--text)] font-medium'>{title}</h3>
      <p className='text-center text-3xl text-[var(--main)] font-bold'>{value}</p>
    </div>
  );
}
