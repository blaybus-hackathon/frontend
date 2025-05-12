import profile from '@/assets/images/elder-basic-profile.png';
import { Button } from '@/components/ui/custom/Button';

export default function InfoCard() {
  return (
    <div className='flex flex-col w-[88%] rounded-[0.625rem] border-2 border-[var(--outline)] justify-center items-center pt-[1.59rem] pb-[1.19rem]'>
      <div className='w-[88%]'>
        {/* 어르신 정보 */}
        <div className='flex border-b-1 border-[var(--outline)] pb-[1.19rem]'>
          <img src={profile} alt='어르신 이미지' className='w-[3.5rem] h-auto mr-[1.88rem]' />
          <div className='flex flex-col items-start'>
            <p className='text-[1.125rem] font-semibold text-[var(--text)]'>박순자 어르신</p>
            <p className='text-[1.125rem] font-normal text-[var(--text)]'>여성 / 80세</p>
          </div>
        </div>
        {/* 서비스 정보 */}
        <div className='flex items-start mt-[1.41rem] mb-[3.38rem] gap-[0.94rem]'>
          <div className='w-[6.5rem] flex flex-col gap-[0.62rem] items-start'>
            <span className='font-semibold text-[var(--button-black)]'>근무종류</span>
            <span className='font-semibold text-[var(--button-black)]'>주소지</span>
            <span className='font-semibold text-[var(--button-black)]'>장기요양등급</span>
          </div>
          <div className='flex flex-col gap-[0.62rem] items-start'>
            <span className='font-normal text-[var(--text)]'>방문요양</span>
            <span className='font-normal text-[var(--text)]'>서울 강남구 서초동</span>
            <span className='font-normal text-[var(--text)]'>등급 없음</span>
          </div>
        </div>
        {/* 매칭 정보 */}
        <div className='border-b-1 border-[var(--outline)] pb-[1.19rem]'>
          <h1 className='flex justify-start text-[1.125rem] font-semibold text-[var(--text)]'>
            요양보호사 2명 매칭
          </h1>
        </div>
        <div className='flex flex-col mt-[2.31rem] items-start overflow-y-auto h-[8.38rem]'>
          <section className='flex w-full h-[3.56rem] sm: justify-between  xl:gap-[1.88rem]'>
            <img src={profile} alt='어르신 이미지' className='w-[3.5rem] h-auto' />
            <div className='flex flex-col justify-between items-start'>
              <p className='text-[1.125rem] font-semibold text-[var(--text)]'>김한나 요양사</p>
              <p className='text-[1.125rem] font-normal text-[var(--text)]'>여성 / 50세</p>
            </div>
            <div className='flex items-center'>
              <Button
                variant='white'
                className={`w-[5.44rem] h-[1.19rem] font-semibold text-[0.88rem] xl:text-[1rem]`}
              >
                매칭 요청하기
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
