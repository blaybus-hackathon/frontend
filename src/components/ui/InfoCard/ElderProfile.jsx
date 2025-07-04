import { memo } from 'react';
import profile from '/default_profile.png';

export default memo(function ElderProfile({ elderInfo, detailInfo = true }) {
  if (!elderInfo) {
    return null;
  }

  return (
    <>
      <section className='grid grid-cols-[auto_1fr] gap-x-7 items-center text-start pb-5'>
        <img
          src={elderInfo.profile ?? profile}
          alt={`${elderInfo.name || ''} 어르신`}
          className='w-[3.5rem] h-auto rounded-full object-cover'
        />
        <div className='flex flex-col justify-center gap-y-2'>
          <p className='text-lg font-semibold text-[var(--text)] lg:text-xl'>
            {elderInfo.name || ''} 어르신
          </p>
          <p className='text-lg font-normal text-[var(--text)] lg:text-xl'>
            {elderInfo.gender || ''} / {elderInfo.age || null}세
          </p>
        </div>
      </section>
      {detailInfo && (
        <>
          <hr className='border-[var(--outline)]' />
          <section className='grid grid-cols-[auto_1fr] items-center gap-x-3 pt-4'>
            <div className='flex flex-col items-start gap-y-2'>
              <p className='text-base font-semibold text-[var(--black)] lg:text-lg'>근무종류</p>
              <p className='text-base font-semibold text-[var(--black)] lg:text-lg'>장기요양등급</p>
            </div>
            <div className='flex flex-col items-start gap-y-2'>
              <p className='text-[0.94rem] font-normal text-[var(--text)] lg:text-lg'>
                {elderInfo.workTypeText}
              </p>
              <p className='text-[0.94rem] font-normal text-[var(--text)] lg:text-lg'>
                {elderInfo.careLevelText}
              </p>
            </div>
          </section>
          <div className='grid grid-cols-[auto_1fr] items-start pt-2 gap-x-14'>
            <p className='text-base font-semibold text-[var(--black)] lg:text-lg'>주소지</p>
            <p className='text-[0.94rem] break-keep font-normal text-[var(--text)] text-start lg:text-lg'>
              {elderInfo.fullAddress}
            </p>
          </div>
        </>
      )}
    </>
  );
});
