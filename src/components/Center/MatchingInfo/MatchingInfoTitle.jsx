import { tabDescriptions } from '@/constants/tabDescription';

export default function MatchingInfoTitle({ activeTab }) {
  const title = tabDescriptions[activeTab].title;
  const description = tabDescriptions[activeTab].description;

  return (
    <section className='flex flex-col items-start pt-2 gap-2 w-[88%] mx-auto'>
      <h1 className='text-[1.44rem] font-semibold text-[var(--text)] '>{title}</h1>
      <p className='whitespace-pre-line text-base font-normal text-[var(--text)] leading-[1.5rem] text-start'>
        {description}
      </p>
    </section>
  );
}
