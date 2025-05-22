export default function MatchingCard({ children }) {
  return (
    <div className='flex flex-col w-full rounded-[0.625rem] border-2 border-[var(--outline)] justify-center items-center pt-[1.59rem] pb-[1.19rem] lg:h-[50rem] lg:justify-start'>
      <div>{children}</div>
    </div>
  );
}
