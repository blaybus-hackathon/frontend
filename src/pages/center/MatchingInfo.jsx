import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/custom/tabs';

export default function MatchingInfo() {
  const [activeTab, setActiveTab] = useState('waiting');

  const tabDescriptions = {
    waiting: {
      title: '매칭 대기',
      description:
        '등록한 어르신의 정보 기반으로 매칭한 요양보호사 목록이에요. \n요양보호사에게 매칭을 요청해보세요!',
    },
    matching: {
      title: '매칭 진행중',
      description:
        '요양보호사에게 보낸 매칭 요청을 확인할 수 있어요. \n수락 또는 거절 여부를 확인해보세요.',
    },
    completed: {
      title: '매칭 완료',
      description: '매칭이 완료된 요양보호사 목록이에요. \n서비스 일정을 확인해보세요!',
    },
  };

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  return (
    <>
      <section className='flex flex-col items-start px-[1.31rem] pt-[1.13rem] h-[9.12rem]'>
        <p className='text-[1.4375rem] font-semibold text-[var(--text)] '>
          {tabDescriptions[activeTab].title}
        </p>
        <p className='whitespace-pre-line text-base font-normal text-[var(--text)] leading-[1.5rem] text-start pt-[0.6rem]'>
          {tabDescriptions[activeTab].description}
        </p>
      </section>
      <Tabs defaultValue='waiting' onValueChange={handleTabChange} className='mt-[1.19rem]'>
        <TabsList className='w-full'>
          <TabsTrigger value='waiting'>
            매칭 대기
            <span className='text-[0.8rem] font-semibold w-[1.375rem] h-[1.375rem] text-white bg-[var(--main)] rounded-full'>
              12
            </span>
          </TabsTrigger>
          <TabsTrigger value='matching'>
            매칭 진행중
            <span className='text-[0.8rem] font-semibold w-[1.375rem] h-[1.375rem] text-white bg-[var(--main)] rounded-full'>
              12
            </span>
          </TabsTrigger>
          <TabsTrigger value='completed'>
            매칭 완료
            <span className='text-[0.8rem] font-semibold w-[1.375rem] h-[1.375rem] text-white bg-[var(--main)] rounded-full'>
              12
            </span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value='waiting'>
          <div>매칭 대기</div>
        </TabsContent>
        <TabsContent value='matching'>
          <div>매칭 진행중</div>
        </TabsContent>
        <TabsContent value='completed'>
          <div>매칭 완료</div>
        </TabsContent>
      </Tabs>
    </>
  );
}
