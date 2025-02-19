import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import patientStore from '@/store/patientStore';

export default function MatchingManage2({ handleMatchingPage }) {
  const { patientData } = patientStore();
  const [userInfo, setUserInfo] = useState({
    name: patientData.name,
    birth: '1654년 1월 1일',
    gender: patientData.gender,
    grade: patientData.grade,
    weight: '60kg',
    disease: '치매초기, 당뇨병',
    dementia: ['집 밖을 배회', '단기 기억 장애', '가족', '사람', '어린'],
    with: '배우자와 동거, 돌봄 기간 중 집에 있음',
    meal: ['스식', '식차', '죽, 반찬 등 요리 필요'],
    poop: ['가끔 대소변 실수 시 도움', '유치도뇨/방광루/장루 가능', '임시'],
    mobile: ['스스로 거동 가능', '이동시 부축 도움'],
    daily: ['산책, 간단한 운동', '말벗 등 정서지원'],
  });

  const renderDementia = () =>
    userInfo.dementia.map((item, idx) => (
      <div
        key={idx}
        className='bg-[var(--button-inactive)] rounded-md h-16 flex justify-center items-center px-3 py-1'
      >
        {item}
      </div>
    ));

  const renderMeal = () =>
    userInfo.meal.map((item, idx) => (
      <div
        key={idx}
        className='bg-[var(--button-inactive)] rounded-md h-16 flex justify-center items-center px-3 py-1'
      >
        {item}
      </div>
    ));

  const renderPoop = () =>
    userInfo.poop.map((item, idx) => (
      <div
        key={idx}
        className='bg-[var(--button-inactive)] rounded-md h-16 flex justify-center items-center px-3 py-1'
      >
        {item}
      </div>
    ));

  const renderMobile = () =>
    userInfo.mobile.map((item, idx) => (
      <div
        key={idx}
        className='bg-[var(--button-inactive)] rounded-md h-16 flex justify-center items-center px-3 py-1'
      >
        {item}
      </div>
    ));

  const renderDaily = () =>
    userInfo.daily.map((item, idx) => (
      <div
        key={idx}
        className='bg-[var(--button-inactive)] rounded-md h-16 flex justify-center items-center px-3 py-1'
      >
        {item}
      </div>
    ));

  return (
    <>
      {console.log(patientData)}
      <div className='mx-auto flex flex-col items-center max-w-2xl'>
        <p className='font-bold text-xl tracking-[-0.1rem] py-8 w-full mx-auto text-center'>
          ({userInfo.name})어르신의 정보를 확인해주세요
        </p>
      </div>
      <div className='px-[1.5rem] mx-auto flex flex-col gap-5 max-w-2xl mb-40'>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>이름</label>
          <Input
            className='h-16 bg-[var(--button-inactive)] font-medium text-lg'
            value={userInfo.name}
            onChange={(e) => {
              setUserInfo((prev) => ({ ...prev, name: e.target.value }));
            }}
          />
        </div>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>생년월일</label>
          <Input
            className='h-16 bg-[var(--button-inactive)] font-medium text-lg'
            value={userInfo.birth}
            onChange={(e) => {
              setUserInfo((prev) => ({ ...prev, birth: e.target.value }));
            }}
          />
        </div>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>성별</label>
          <div className='w-1/2 h-16 bg-[var(--button-inactive)] rounded-md flex items-center justify-center font-medium text-lg'>
            {userInfo.gender}
          </div>
        </div>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>장기요양등급</label>
          <div className='w-1/2 h-16 bg-[var(--button-inactive)] rounded-md flex items-center justify-center font-medium text-lg'>
            {userInfo.grade}
          </div>
        </div>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>몸무게</label>
          <div className='w-1/2 h-16 bg-[var(--button-inactive)] rounded-md flex items-center justify-center font-medium text-lg'>
            {userInfo.weight}
          </div>
        </div>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>보유 질병/질환</label>
          <div className='w-full h-16 bg-[var(--button-inactive)] rounded-md flex items-center justify-start pl-3 font-medium text-lg'>
            {userInfo.disease}
          </div>
        </div>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>치매 증상</label>
          <div className='w-full grid grid-cols-2 gap-4 font-medium text-lg'>
            {renderDementia()}
          </div>
        </div>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>동거인 여부</label>
          <div className='w-full h-16 bg-[var(--button-inactive)] rounded-md flex items-center justify-center font-medium text-lg'>
            {userInfo.with}
          </div>
        </div>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>식사 보조</label>
          <div className='w-full grid grid-cols-2 gap-4 font-medium text-lg'>{renderMeal()}</div>
        </div>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>배변 보조</label>
          <div className='w-full grid grid-cols-2 gap-4 font-medium text-lg'>{renderPoop()}</div>
        </div>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>이동 보조</label>
          <div className='w-full grid grid-cols-2 gap-4 font-medium text-lg'>{renderMobile()}</div>
        </div>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>일상생활</label>
          <div className='w-full grid grid-cols-2 gap-4 font-medium text-lg'>{renderDaily()}</div>
        </div>
        <Button
          className='h-16 w-4/5 bg-[var(--company-primary)] text-xl hover:bg-[var(--company-primary)]/90 fixed bottom-8 left-1/2 -translate-x-1/2 font-bold'
          onClick={() => {
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
