export default function InfoField({ label = '', text = '' }) {
  return (
    <>
      <div className='grid grid-cols-[5rem_1fr] items-center gap-3 md:gap-16'>
        <h4 className='text-start text-[var(--black)] text-lg font-semibold'>{label}</h4>
        <div className='flex justify-start bg-[#f6f6f6] p-5 rounded-[0.625rem]'>
          <span className='text-start text-[var(--black)] text-lg font-normal break-keep whitespace-pre-wrap'>
            {text}
          </span>
        </div>
      </div>
    </>
  );
}
