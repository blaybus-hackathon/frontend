import { Button } from '@/components/ui/button';
// import { useState } from 'react';
import patientStore from '@/store/patientStore';

// import profInit from '@/assets/images/default-profile.png';

export default function MatchingManage2({ handleMatchingPage }) {
  const { patientData, recruitReq } = patientStore();
  // const [userInfo, setUserInfo] = useState({
  //   name: patientData.name,
  //   birth: '1654년 1월 1일',
  //   gender: patientData.gender,
  //   grade: patientData.grade,
  //   weight: '60kg',
  //   disease: '치매초기, 당뇨병',
  //   dementia: ['집 밖을 배회', '단기 기억 장애', '가족', '사람', '어린'],
  //   with: '배우자와 동거, 돌봄 기간 중 집에 있음',
  //   meal: ['스식', '식차', '죽, 반찬 등 요리 필요'],
  //   poop: ['가끔 대소변 실수 시 도움', '유치도뇨/방광루/장루 가능', '임시'],
  //   mobile: ['스스로 거동 가능', '이동시 부축 도움'],
  //   daily: ['산책, 간단한 운동', '말벗 등 정서지원'],
  // });

  return (
    <>
      {console.log(patientData)}
      <div className='mx-auto flex flex-col items-center max-w-2xl'>
        <p className='font-bold text-xl tracking-[-0.1rem] py-8 w-full mx-auto text-start px-[1.5rem] mb-4'>
          {patientData.name} 어르신의 정보를 확인해주세요
        </p>
      </div>

      <div className='px-[1.5rem] mx-auto flex flex-col gap-5 max-w-2xl mb-40'>
        <div className='flex pb-5 border-b border-[var(--outline)]'>
          <div className='bg-white rounded-[50%] flex items-center justify-center mr-8'>
            {/* <img src={profInit} className='items-center size-25' /> */}
            <div className='size-25 bg-[var(--button-inactive)] rounded-[50%]'></div>
          </div>
          <div className='flex flex-col items-start justify-center gap-1 py-2'>
            <p className='font-semibold text-2xl'>{patientData.name} 어르신</p>
            <p className='font-normal text-xl'>{`${patientData.gender} / ${patientData.age}`}세</p>
          </div>
        </div>

        <div className='px-5'>
          <div className='flex h-16'>
            <p className='flex flex-1 text-start font-semibold text-xl h-full items-center'>
              생년월일
            </p>
            <p className='flex flex-1 text-start bg-[var(--button-inactive)] h-full items-center rounded-md text-xl px-5'>
              {patientData.birth}
            </p>
          </div>
        </div>
        <div className='px-5'>
          <div className='flex h-16'>
            <p className='flex flex-1 text-start font-semibold text-xl h-full items-center'>성별</p>
            <p className='flex flex-1 text-start bg-[var(--button-inactive)] h-full items-center rounded-md text-xl px-5'>
              {patientData.gender}
            </p>
          </div>
        </div>
        <div className='px-5'>
          <div className='flex h-16'>
            <p className='flex flex-1 text-start font-semibold text-xl h-full items-center'>
              몸무게
            </p>
            <p className='flex flex-1 text-start bg-[var(--button-inactive)] h-full items-center rounded-md text-xl px-5'>
              {patientData.weight}kg
            </p>
          </div>
        </div>
        <div className='px-5'>
          <div className='flex h-16'>
            <p className='flex flex-1 text-start font-semibold text-xl h-full items-center'>
              근무종류
            </p>
            <p className='flex flex-1 text-start bg-[var(--button-inactive)] h-full items-center rounded-md text-xl px-5'>
              {patientData.workType}
            </p>
          </div>
        </div>
        <div className='px-5'>
          <div className='flex h-16'>
            <p className='flex flex-1 text-start font-semibold text-xl h-full items-center'>
              주소지
            </p>
            <p className='flex flex-1 text-start bg-[var(--button-inactive)] h-full items-center rounded-md text-xl px-5 max-[500px]:text-base'>
              {patientData.address}
            </p>
          </div>
        </div>
        <div className='px-5'>
          <div className='flex h-16'>
            <p className='flex flex-1 text-start font-semibold text-xl h-full items-center'>
              희망요일
            </p>
            <p className='flex flex-1 text-start bg-[var(--button-inactive)] h-full items-center rounded-md text-xl px-5'>
              {recruitReq.day.join(', ')}
            </p>
          </div>
        </div>
        <div className='px-5'>
          <div className='flex h-16'>
            <p className='flex flex-1 text-start font-semibold text-xl h-full items-center'>
              희망근무시간
            </p>
            <p className='flex flex-1 text-start bg-[var(--button-inactive)] h-full items-center rounded-md text-xl px-5'>
              {}
            </p>
          </div>
        </div>
        <div className='px-5'>
          <div className='flex h-16'>
            <p className='flex flex-1 text-start font-semibold text-xl h-full items-center'>
              보유질병
            </p>
            <p className='flex flex-1 text-start bg-[var(--button-inactive)] h-full items-center rounded-md text-xl px-5'>
              {patientData.disease}
            </p>
          </div>
        </div>
        <div className='px-5'>
          <div className='flex h-16'>
            <p className='flex flex-1 text-start font-semibold text-xl h-full items-center'>
              장기요양등급
            </p>
            <p className='flex flex-1 text-start bg-[var(--button-inactive)] h-full items-center rounded-md text-xl px-5'>
              {patientData.grade}
            </p>
          </div>
        </div>
        <div className='px-5'>
          <div className='flex h-16'>
            <p className='flex flex-1 text-start font-semibold text-xl h-full items-center'>
              케어필요
            </p>
            <p className='flex flex-1 text-start bg-[var(--button-inactive)] h-full items-center rounded-md text-xl px-5'>
              {}
            </p>
          </div>
        </div>
        <div className='px-5'>
          <div className='flex h-16'>
            <p className='flex flex-1 text-start font-semibold text-xl h-full items-center'>
              동거인 여부
            </p>
            <p className='flex flex-1 text-start bg-[var(--button-inactive)] h-full items-center rounded-md text-xl px-5'>
              {patientData.with}
            </p>
          </div>
        </div>
        <div className='px-5'>
          <div className='flex h-16'>
            <p className='flex flex-1 text-start font-semibold text-xl h-full items-center'>
              식사 보조
            </p>
            <p className='flex flex-1 text-start bg-[var(--button-inactive)] h-full items-center rounded-md text-xl px-5'>
              {patientData.meal}
            </p>
          </div>
        </div>
        <div className='px-5'>
          <div className='flex h-16'>
            <p className='flex flex-1 text-start font-semibold text-xl h-full items-center'>
              배변 보조
            </p>
            <p className='flex flex-1 text-start bg-[var(--button-inactive)] h-full items-center rounded-md text-xl px-5'>
              {patientData.toilet.join(', ')}
            </p>
          </div>
        </div>
        <div className='px-5'>
          <div className='flex h-16'>
            <p className='flex flex-1 text-start font-semibold text-xl h-full items-center'>
              이동 보조
            </p>
            <p className='flex flex-1 text-start bg-[var(--button-inactive)] h-full items-center rounded-md text-xl px-5'>
              {patientData.mobile.join(', ')}
            </p>
          </div>
        </div>
        <div className='px-5'>
          <div className='flex h-16'>
            <p className='flex flex-1 text-start font-semibold text-xl h-full items-center'>
              일상생활
            </p>
            <p className='flex flex-1 text-start bg-[var(--button-inactive)] h-full items-center rounded-md text-xl px-5'>
              {patientData.daily.join(', ')}
            </p>
          </div>
        </div>
        <div className='px-5'>
          <div className='flex h-16'>
            <p className='flex flex-1 text-start font-semibold text-xl h-full items-center'>
              희망시급
            </p>
            <p className='flex flex-1 text-start bg-[var(--button-inactive)] h-full items-center rounded-md text-xl px-5'>
              {recruitReq.wage || 10300}
            </p>
          </div>
        </div>

        <Button
          className='h-16 w-4/5 bg-[var(--company-primary)] text-xl hover:bg-[var(--company-primary)]/90 fixed bottom-8 left-1/2 -translate-x-1/2 font-bold'
          onClick={() => {
            window.scrollTo(0, 0);
            handleMatchingPage((prev) => {
              return prev + 1;
            });
          }}
        >
          다음
        </Button>
      </div>
    </>
  );
}
