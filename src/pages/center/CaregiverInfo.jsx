import Header from '@/components/ui/temp/Header';

import { Button } from '@/components/ui/button';

import profInit from '@/assets/images/default-profile.png';
import map_pin from '@/assets/images/map-pin.png';
import card from '@/assets/images/card.png';
import sun from '@/assets/images/sun.png';

export default function CaregiverInfo() {
  return (
    <div>
      <Header title='요양사 상세 정보' />
      <div className='max-w-2xl mx-auto px-6'>
        <div className='flex mt-10 items-center pb-5 border-b mb-6'>
          <div className='bg-gray-500 rounded-[50%] size-25 flex items-center justify-center mr-7'>
            <img src={profInit} className='items-center size-10' />
          </div>
          <div className='flex flex-col items-start gap-4'>
            <p className='text-2xl font-semibold'>김길동</p>
            <p className='text-lg'>서울특별시 용산구 거주</p>
          </div>
        </div>
        <div className='flex gap-5 flex-col mb-40'>
          <div className='flex flex-col items-start w-full'>
            <label className='font-semibold text-xl mb-4'>자기소개</label>
            <div className='border border-[#C8C8C8] w-full rounded-md h-34 px-2 py-3 text-left'>
              내가 최고야
            </div>
          </div>
          <div className='flex h-16 w-full'>
            <label className='font-semibold text-xl flex-1 h-full flex items-center'>
              간병경력
            </label>
            <div className='h-16 flex-1 border border-[#C8C8C8] rounded-md flex items-center justify-center text-xl'>
              경력 있음
            </div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-4'>희망 근무 지역</label>
            <div className='h-16 w-full rounded-md flex border border-[#C8C8C8] font-medium text-lg'>
              <div className='flex items-center ml-5 text-xl'>
                <img src={map_pin} className='size-6 mr-5' />
                강남구
              </div>
            </div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-4'>자격증</label>
            <div className='flex flex-col w-full gap-2'>
              <div className='h-16 border border-[#C8C8C8] font-medium text-lg flex justify-center items-center rounded-md'>
                요양보호사
              </div>
              <div className='h-16 border border-[#C8C8C8] font-medium text-lg flex justify-center items-center rounded-md'>
                병원동행매니저
              </div>
            </div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-4'>근무 가능 일정</label>
            <div className='h-16 border border-[#C8C8C8] font-medium text-lg flex justify-center items-center rounded-md w-full p-5'>
              <p>
                월, 수, 금<br />
                월, 수, 금
              </p>
            </div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-4'>희망 시급</label>
            <div className='h-16 border border-[#C8C8C8] font-medium text-lg flex rounded-md w-full'>
              <div className='flex items-center ml-5 text-xl'>
                <img src={card} className='size-6 mr-5' />
                13900원
              </div>
            </div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-4'>희망 돌봄유형</label>
            <div className='h-16 border border-[#C8C8C8] font-medium text-lg flex rounded-md w-full'>
              <div className='flex items-center ml-5 text-xl'>
                <img src={sun} className='size-6 mr-5' />
                방문요양
              </div>
            </div>
          </div>
          <div className='flex h-16 w-full'>
            <label className='font-semibold text-xl h-full flex items-center mr-3'>주소지</label>
            <div className='h-16 flex-1 border border-[#C8C8C8] rounded-md flex items-center justify-center text-xl'>
              서울 강남구 서초동
            </div>
          </div>
          <Button className='h-16 w-4/5 bg-[var(--company-primary)] text-xl hover:bg-[var(--company-primary)]/90 fixed bottom-8 left-1/2 -translate-x-1/2 font-bold'>
            매칭 요청하기
          </Button>
        </div>
      </div>
    </div>
  );
}
