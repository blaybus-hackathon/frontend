import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ModifyInfo() {
  const GRADE = ['등급 없음', '1등급', '2등급', '3등급', '4등급', '5등급', '인지지원등급'];

  const renderGrade = () =>
    GRADE.map((gd, idx) => (
      <Button
        key={idx}
        className={`h-16 text-lg font-medium bg-[var(--button-inactive)] text-black`}
      >
        {gd}
      </Button>
    ));
  return (
    <div>
      <Header title='공고 수정하기' />
      <div className='max-w-2xl mx-auto'>
        <p className='mt-10 font-bold text-xl mb-7'>(박순자)어르신의 정보를 확인해주세요</p>
        <div className='px-6 gap-5 flex flex-col mb-40'>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-4'>
              이름<span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
            </label>
            <Input
              className='h-16 bg-[var(--button-inactive)] font-medium text-lg'
              value='박순자'
            />
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-4'>
              생년월일<span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
            </label>
            <Input
              className='h-16 bg-[var(--button-inactive)] font-medium text-lg'
              value='1964년 1월 27일'
            />
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-4'>
              성별<span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
            </label>
            <div className='flex gap-4 w-full'>
              <Button className={`flex-1 h-16 bg-[var(--button-inactive)] text-black text-lg`}>
                여성
              </Button>
              <Button className={`flex-1 h-16 bg-[var(--button-inactive)] text-black text-lg`}>
                남성
              </Button>
            </div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-4'>
              장기요양등급 <span className='font-normal text-lg'>(단일 선택)</span>
              <span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
            </label>
            <div className='w-full grid grid-cols-2 gap-4'>{renderGrade()}</div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-4'>
              몸무게
              <span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
            </label>
            <div className='relative flex items-center w-full'>
              <Input
                type='number'
                className='flex-1 h-16 bg-[var(--button-inactive)] text-lg text-center pr-10'
              />
              <span className='absolute right-2 text-lg'>kg</span>
            </div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-4'>
              보유 질병/질환
              <span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
            </label>
            <Input className='h-16 bg-[var(--button-inactive)] font-medium text-lg' value='' />
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-4'>
              치매 증상 <span className='font-normal text-lg'>(복수 선택 가능)</span>
              <span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
            </label>
            <div className='w-full grid grid-cols-2 gap-4'>{renderGrade()}</div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-4'>
              동거인 여부 <span className='font-normal text-lg'>(단일 선택)</span>
              <span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
            </label>
            <div className='w-full grid gap-4'>{renderGrade()}</div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-4'>
              식사 보조 <span className='font-normal text-lg'>(복수 선택 가능)</span>
              <span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
            </label>
            <div className='w-full grid grid-cols-2 gap-4'>{renderGrade()}</div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-4'>
              배변보조 <span className='font-normal text-lg'>(복수 선택 가능)</span>
              <span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
            </label>
            <div className='w-full grid grid-cols-2 gap-4'>{renderGrade()}</div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-4'>
              이동 보조 <span className='font-normal text-lg'>(복수 선택 가능)</span>
              <span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
            </label>
            <div className='w-full grid grid-cols-2 gap-4'>{renderGrade()}</div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-4'>
              일상 생활 <span className='font-normal text-lg'>(복수 선택 가능)</span>
              <span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
            </label>
            <div className='w-full grid grid-cols-2 gap-4'>{renderGrade()}</div>
          </div>
          <div className='flex flex-col items-start relative'>
            <label className='font-semibold text-xl mb-4'>
              기타 요청 사항
              <span className='font-normal text-sm ml-2'>선택</span>
            </label>
            <textarea
              maxLength={300}
              placeholder='기타 작성 (최대 300자)'
              className='border w-full rounded-md h-65 p-4'
            />
            <span className='absolute -bottom-6 right-3'>130/300</span>
          </div>
          <Button className='h-16 w-4/5 bg-[var(--company-primary)] text-xl hover:bg-[var(--company-primary)]/90 fixed bottom-8 left-1/2 -translate-x-1/2 font-bold'>
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}
