import { useState } from 'react';

import Header from '@/components/ui/temp/Header';

import { Button } from '@/components/ui/Button';
import { Radio, RadioItem } from '@/components/ui/custom/multiRadio';

import map_pin from '@/assets/images/map-pin.png';
import card from '@/assets/images/card.png';
import sun from '@/assets/images/sun.png';

export default function CaregiverInfo() {
  const [censored, setCensored] = useState(true);

  return (
    <div>
      <Header title='요양사 상세 정보' />
      <div className='max-w-2xl mx-auto px-6'>
        <div className='flex mt-10 items-center mb-13'>
          <div className='bg-[var(--button-inactive)] rounded-[50%] size-25 flex items-center justify-center mr-7'>
            {/* <img src={profInit} className='items-center size-10' /> */}
          </div>
          <div className='flex flex-col items-start gap-5'>
            <p className='text-2xl font-bold'>김길동</p>
            <p className='text-lg'>서울특별시 용산구 거주</p>
          </div>
        </div>
        <div className='flex gap-10 flex-col mb-40'>
          <div className='flex flex-col items-start w-full'>
            <label className='font-semibold text-xl mb-5'>자기소개</label>
            <div className='border border-[#C8C8C8] w-full rounded-md h-34 px-2 py-3 text-left relative'>
              <div className={`h-full ${censored && 'blur-lg'}`}>내가 최고야</div>
              {censored && (
                <p className='font-semibold absolute top-1/2 left-1/2 -translate-1/2'>
                  매칭 후 열람 가능합니다
                </p>
              )}
            </div>
          </div>
          <div className='flex flex-col w-full'>
            <label className='font-semibold text-xl flex-1 h-full flex items-center mb-5'>
              간병경력
            </label>
            <div className='relative'>
              <Radio cols={2} className={`${censored && 'blur-3xl'}`}>
                <RadioItem>신입</RadioItem>
                <RadioItem>경력</RadioItem>
              </Radio>
              {censored && (
                <p
                  className='font-semibold absolute top-1/2 left-1/2 -translate-1/2'
                  onClick={() => {
                    setCensored(false);
                  }}
                >
                  매칭 후 열람 가능합니다
                </p>
              )}
            </div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-5'>나의 선호 지역</label>
            <div className='h-16 w-full rounded-md flex border border-[#C8C8C8] font-medium text-lg'>
              <div className='flex items-center ml-5 text-xl'>
                <img src={map_pin} className='size-6 mr-5' />
                강남구
              </div>
            </div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-4'>나의 근무 가능 일정</label>
            {/* <div className='h-16 border border-[#C8C8C8] font-medium text-lg flex justify-center items-center rounded-md w-full p-5'>
              <p>
                월, 수, 금<br />
                월, 수, 금
              </p>
            </div> */}
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-5'>희망 급여</label>
            <div className='h-16 border border-[#C8C8C8] font-medium text-lg flex rounded-md w-full'>
              <div className='flex items-center ml-5 text-xl'>
                <img src={card} className='size-6 mr-5' />
                13900원
              </div>
            </div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-5'>희망 돌봄유형</label>
            <div className='h-16 border border-[#C8C8C8] font-medium text-lg flex rounded-md w-full'>
              <div className='flex items-center ml-5 text-xl'>
                <img src={sun} className='size-6 mr-5' />
                방문요양
              </div>
            </div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-5'>주소지</label>
            <div className='h-16 w-full rounded-md flex border border-[#C8C8C8] font-medium text-lg'>
              <div className='flex items-center ml-5 text-xl'>
                <img src={map_pin} className='size-6 mr-5' />
                서울 강남구 서초동
              </div>
            </div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-4'>자격증</label>
            <Radio multiple={true}>
              <RadioItem>요양보호사</RadioItem>
              <RadioItem>간병사</RadioItem>
              <RadioItem>병원동행매니저</RadioItem>
              <RadioItem>산후관리사</RadioItem>
              <RadioItem>기타</RadioItem>
            </Radio>
          </div>

          <Button className='h-16 w-4/5 bg-[var(--company-primary)] text-xl hover:bg-[var(--company-primary)]/90 fixed bottom-8 left-1/2 -translate-x-1/2 font-bold'>
            매칭 요청하기
          </Button>
        </div>
      </div>
    </div>
  );
}
