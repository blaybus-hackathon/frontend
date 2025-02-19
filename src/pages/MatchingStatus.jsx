import logo from '@/assets/images/logo.png';
import profInit from '@/assets/images/default-profile.png';
import { Button } from '@/components/ui/button';

export default function PatientInfo() {
  const mealHelp = ['스스로 식사 가능', '죽,반찬 등 요리 필요', '경관식 보조'];

  const renderMealHelp = () =>
    mealHelp.map((help, idx) => (
      <div
        key={idx}
        className='bg-[var(--button-inactive)] rounded-md h-16 flex justify-center items-center px-3 py-1'
      >
        {help}
      </div>
    ));
  return (
    <div>
      <header className='bg-[var(--button-inactive)] h-[3.375rem] px-6 flex items-center justify-between'>
        <img src={logo} className='w-27 h-3' />
        <div className='flex items-center gap-3'>
          <span className='font-bold'>직원이름</span>
          <img src={logo} className='size-[37px] rounded-[50%]' />
        </div>
      </header>
      <div className='px-6'>
        <p className='mt-10 font-bold text-2xl mb-7'>[박순자] 어르신 구인합니다.</p>
        <div className='border border-[var(--company-primary)] bg-[var(--button-inactive)] flex items-start p-4 rounded-2xl mb-7'>
          <div className='bg-white rounded-[50%] size-16 flex items-center justify-center mr-3'>
            <img src={profInit} className='items-center size-5' />
          </div>
          <div className='flex flex-col items-start gap-1 py-2'>
            <p className='font-semibold text-xl'>
              박순자
              <span className='bg-black rounded-3xl text-xs text-white py-1 px-1.5 ml-1.5'>
                어르신
              </span>
            </p>
            <p className='font-normal'>여성/50세</p>
          </div>
        </div>
        <div className='flex items-center mb-9'>
          <span className='text-[var(--company-primary)] font-bold text-2xl justify-center flex justify-center items-center'>
            시급 15900원
          </span>
          <span className='inline-block ml-2 bg-black text-xs text-white rounded-3xl h-6 px-2 flex items-center pt-[2px] font-semibold mt-[3vpx]'>
            협의 가능
          </span>
        </div>
      </div>
      <div className='h-2 bg-[var(--button-inactive)]'></div>
      <div className='py-7 px-6 font-bold flex flex-col gap-3 items-start'>
        <p>
          <span className='text-sm font-normal'>근무 종류</span> 병원 동행
        </p>
        <p>
          <span className='text-sm font-normal'>근무 종류</span> 병원 동행
        </p>
        <p>
          <span className='text-sm font-normal'>근무 종류</span> 병원 동행
        </p>
        <p>
          <span className='text-sm font-normal'>근무 종류</span> 병원 동행
        </p>
        <p>
          <span className='text-sm font-normal'>근무 종류</span> 병원 동행
        </p>
        <p>
          <span className='text-sm font-normal'>근무 종류</span> 병원 동행
        </p>
      </div>
      <div className='h-2 bg-[var(--button-inactive)]'></div>
      <div className='px-6 pt-8 flex flex-col gap-5 items-start mb-40'>
        <p className='font-bold text-xl'>*케어 필요 항목</p>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>식사 보조</label>
          <div className='w-full grid grid-cols-2 gap-4 font-medium text-lg'>
            {renderMealHelp()}
          </div>
        </div>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>배변 보조</label>
          <div className='w-full grid grid-cols-2 gap-4 font-medium text-lg'>
            {renderMealHelp()}
          </div>
        </div>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>이동 보조</label>
          <div className='w-full grid grid-cols-2 gap-4 font-medium text-lg'>
            {renderMealHelp()}
          </div>
        </div>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>일상생활</label>
          <div className='w-full grid grid-cols-2 gap-4 font-medium text-lg'>
            {renderMealHelp()}
          </div>
        </div>
        <Button className='h-16 w-4/5 bg-[var(--company-primary)] text-xl hover:bg-[var(--company-primary)]/90 fixed bottom-8 left-1/2 -translate-x-1/2 font-bold'>
          수정하기
        </Button>
      </div>
    </div>
  );
}
