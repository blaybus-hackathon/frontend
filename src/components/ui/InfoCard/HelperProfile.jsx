import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/custom/Button';
import profile from '/default_profile.png';

export default function HelperProfile({ helperInfo, onClick, buttonText, renderButton }) {
  const navigate = useNavigate();

  const helperDetail = () => {
    navigate('/center/care-info', { state: { helperSeq: helperInfo.helperSeq } });
  };

  return (
    <>
      <section className='grid grid-cols-2 gap-4 md:grid-cols-[auto_1fr_auto] md:gap-6 md:items-center'>
        {/* Profile */}
        <div className='w-[3.5rem] h-[3.5rem] rounded-full flex items-center justify-center'>
          <img
            src={helperInfo.profile ?? profile}
            alt={`${helperInfo.helperName || helperInfo.name} 요양사`}
            className='w-full h-full rounded-full object-cover'
          />
        </div>

        {(renderButton || buttonText) && (
          <div className='flex justify-end md:order-3 items-center'>
            {renderButton ? (
              // render custom button
              renderButton()
            ) : (
              // render default button
              <Button
                onClick={onClick}
                variant='white'
                className='hover:bg-[var(--main)] w-fit h-fit px-3.5 py-2 flex-shrink-0 cursor-pointer'
              >
                <p className='text-base font-semibold text-[var(--main)] hover:text-white lg:text-lg'>
                  {buttonText}
                </p>
              </Button>
            )}
          </div>
        )}

        <div className='col-span-2 md:col-span-1 md:order-2 flex flex-col items-start md:justify-center gap-y-1'>
          <h3
            className='text-lg font-semibold text-[var(--text)] lg:text-xl text-start'
            onClick={helperDetail}
          >
            {helperInfo.name} 요양사
          </h3>
          <p className='text-lg font-normal text-[var(--text)] lg:text-xl'>
            {helperInfo.gender} / {helperInfo.age}세
          </p>
        </div>
      </section>
    </>
  );
}
