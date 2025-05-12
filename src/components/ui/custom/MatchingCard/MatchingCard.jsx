export default function MatchingCard({ children }) {
  return (
    <div className='flex flex-col w-full rounded-[0.625rem] border-2 border-[var(--outline)] justify-center items-center pt-[1.59rem] pb-[1.19rem] lg:w-[60%] lg:h-[50rem] lg:justify-start'>
      <div className='w-[88%]'>{children}</div>
    </div>
  );
}
