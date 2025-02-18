import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Dropdown from '@/components/ui/dropdown';

export default function MatchingManage3({ handleMatchingPage }) {
  const DAYS = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];
  const BENEFIT = [
    '4대보험',
    '교통비 지원',
    '퇴직급여',
    '경조사비',
    '명절선물',
    '식사(비)지원',
    '장기근속 장려금',
    '정부지원금',
    '중증가산수당',
    '운전 수당',
  ];
  const [selectedDays, setSelectedDays] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });
  const [selectedBenefits, setSelectedBenefits] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
  });
  const [timeNego, setTimeNego] = useState(false);
  const [payNego, setPayNego] = useState(false);

  const renderDays = () =>
    DAYS.map((day, idx) => (
      <Button
        key={idx}
        className={`h-16 text-lg font-medium ${
          selectedDays[idx]
            ? 'bg-[var(--company-primary)] text-white'
            : 'bg-[var(--button-inactive)] text-black'
        }`}
        onClick={() => {
          setSelectedDays((prev) => ({ ...prev, [idx]: !prev[idx] }));
        }}
      >
        {day}
      </Button>
    ));

  const renderBenefit = () =>
    BENEFIT.map((benefit, idx) => (
      <Button
        key={idx}
        className={`h-16 text-lg font-medium ${
          selectedBenefits[idx]
            ? 'bg-[var(--company-primary)] text-white'
            : 'bg-[var(--button-inactive)] text-black'
        }`}
        onClick={() => {
          setSelectedBenefits((prev) => ({ ...prev, [idx]: !prev[idx] }));
        }}
      >
        {benefit}
      </Button>
    ));

  return (
    <>
      <div className='mx-auto flex flex-col items-center max-w-2xl'>
        <p className='font-bold text-xl tracking-[-0.1rem] pt-8 pb-3 w-full mx-auto text-center'>
          구인 정보를 입력해주세요
        </p>
        <p className='font-normal text-xl tracking-[-0.1rem] w-full mx-auto text-center pb-8'>
          일정 범위 내 날짜/시간/요일 협의 가능
        </p>
      </div>
      <div className='px-[1.5rem] mx-auto flex flex-col gap-5 max-w-2xl mb-40'>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>근무 종류</label>
          <div className='flex w-full gap-4'>
            {/* <div className='flex-1 h-16 bg-[var(--button-inactive)] rounded-md flex items-center justify-center font-medium text-lg'>
              방문 요양
            </div>
            <div className='flex-1 h-16 bg-[var(--button-inactive)] rounded-md flex items-center justify-center font-medium text-lg'>
              요양원
            </div> */}
            <Button className='flex-1 h-16 text-lg bg-[var(--button-inactive)] text-black'>
              방문 요양
            </Button>
            <Button className='flex-1 h-16 text-lg bg-[var(--button-inactive)] text-black'>
              요양원
            </Button>
          </div>
        </div>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>
            근무지 주소<span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
          </label>
          <Input className='h-16 bg-[var(--button-inactive)] font-medium text-lg' />
        </div>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>
            구인 날짜<span className='font-normal'> (중복 선택 가능)</span>
          </label>
          <div className='w-full grid grid-cols-2 gap-4'>{renderDays()}</div>
        </div>
        {/* <div className='flex flex-col items-start gap-3'>
          <label className='font-semibold text-xl mb-4'>구인 시간</label>
          <div className='w-full h-16 flex items-center justify-center text-lg text-[#6C6C6C]'>
            <div className='flex w-3/10 h-full items-center justify-center'>시작 시간</div>
            <div className='flex w-7/10 h-full rounded-md bg-[var(--button-inactive)] items-center justify-center'>
              오전 12:00
            </div>
          </div>
          <div className='w-full h-16 flex items-center justify-center text-lg text-[#6C6C6C]'>
            <div className='flex w-3/10 h-full items-center justify-center'>종료 시간</div>
            <div className='w-7/10 flex h-full gap-2'>
              <div className='flex flex-1 h-full rounded-md bg-[var(--button-inactive)] items-center justify-center'>
                1주일
              </div>
              <div className='flex flex-1 h-full rounded-md bg-[var(--button-inactive)] items-center justify-center'>
                오후 12:00
              </div>
            </div>
          </div>
          <Button
            className='bg-white text-black text-xl border border-gray-500 px-2 h-11'
            onClick={() => {
              setTimeNego((prev) => !prev);
            }}
          >
            <svg
              width='29'
              height='29'
              viewBox='0 0 29 29'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='!size-7'
            >
              <rect
                width='29'
                height='29'
                rx='14.5'
                fill={timeNego ? 'var(--company-primary)' : '#B6B6B6'}
                className='!size-7'
              />
              <path
                d='M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z'
                fill='white'
              />
            </svg>
            협의 가능
          </Button>
        </div> */}
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl'>급여</label>
          <p className='text-[var(--required-red)]'>시급 기준 최저 13000원 이상</p>
          <div className='flex w-full mb-4.5 gap-4'>
            {/* <div className='flex-1 h-16 bg-[var(--button-inactive)] rounded-md flex items-center justify-center font-medium text-lg'>
              s
            </div> */}
            <Dropdown />
            {/* <div className='flex-1 h-16 bg-[var(--button-inactive)] rounded-md flex items-center justify-center font-medium text-lg'></div> */}
            <div className='relative flex items-center flex-1'>
              <Input
                type='number'
                className='flex-1 h-16 bg-[var(--button-inactive)] text-lg text-center pr-10'
                placeholder='입력'
              />
              <span className='absolute right-2 text-lg'>원</span>
            </div>
            {/* <Input className='flex-1 h-16 bg-[var(--button-inactive)] text-lg text-center' /> */}
          </div>
          <Button
            className='bg-white text-black text-xl border border-gray-500 px-2 h-11'
            onClick={() => {
              setPayNego((prev) => !prev);
            }}
          >
            <svg
              width='29'
              height='29'
              viewBox='0 0 29 29'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='!size-7'
            >
              <rect
                width='29'
                height='29'
                rx='14.5'
                fill={payNego ? 'var(--company-primary)' : '#B6B6B6'}
                className='!size-7'
              />
              <path
                d='M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z'
                fill='white'
              />
            </svg>
            협의 가능
          </Button>
        </div>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>
            복리후생<span className='font-normal'> (복수 선택 가능)</span>
          </label>
          <div className='w-full grid grid-cols-2 gap-4'>{renderBenefit()}</div>
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
