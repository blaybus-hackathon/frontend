import profile from '@/assets/images/elder-basic-profile.png';
import { Button } from '@/components/ui/custom/Button';

export default function MatchedCaregiver() {
  return (
    <>
      <div className='border-b-1 border-[var(--outline)] pb-[1.19rem]'>
        <h1 className='flex justify-start text-[1.125rem] font-semibold text-[var(--text)]'>
          요양보호사
        </h1>
      </div>
      <div className='flex flex-col mt-[2.31rem] items-start gap-5 h-[8.38rem] overflow-x-hidden lg:h-[25rem] '>
        <section className='flex w-full h-[3.56rem] sm: justify-between  xl:gap-[1.88rem]'>
          <img src={profile} alt='요양보호사 이미지' className='w-[3.5rem] h-auto' />
          <div className='flex flex-col justify-between items-start'>
            <p className='text-[1.125rem] font-semibold text-[var(--text)]'>김한나 요양사</p>
            <p className='text-[1.125rem] font-normal text-[var(--text)]'>여성 / 50세</p>
          </div>
          <div className='flex items-center'>
            <Button
              variant='white'
              className={`w-[5.44rem] h-[1.19rem] font-semibold text-[0.88rem] xl:text-[1rem] lg:w-[9rem]`}
            >
              매칭 요청하기
            </Button>
          </div>
        </section>
      </div>
      <div className='flex justify-end'>
        {/* TODO: 추후 어르신 수정 페이지 버튼으로 변경 */}
        <Button
          variant='ghost'
          className='text-[var(--text)] text-[0.94rem] font-medium w-fit h-fit border-b-1 border-[var(--outline)] rounded-none p-0'
        >
          어르신 정보 수정하기
        </Button>
      </div>
    </>
  );
}
