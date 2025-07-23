import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';
import {
  useWaitingPatients,
  useInProgressPatients,
  useCompletedPatients,
  useRefetchQueries,
} from '@/hooks/center/service/useMatchList';
import { Tabs, TabsList, TabsContent } from '@/components/ui/custom/tabs';
import TabTrigger from '@/components/ui/tabs/TabTrigger';
import InfoCarousel from '@/components/ui/InfoCard/InfoCarousel';
import TabPanel from '@/components/ui/tabs/TabPanel';
import MatchingWaiting from '@/components/Center/MatchingInfo/MatchingWaiting';
import MatchingInProgress from '@/components/Center/MatchingInfo/MatchingInProgress';
import MatchingCompleted from '@/components/Center/MatchingInfo/MatchingCompleted';

export default function MatchingInfo() {
  const navigate = useNavigate();

  // tab state
  const [activeTab, setActiveTab] = useState('waiting');
  const [isTabChanging, setIsTabChanging] = useState(false);

  // headers
  const setHeaderProps = useHeaderPropsStore((state) => state.setHeaderProps);
  const clearHeaderProps = useHeaderPropsStore((state) => state.clearHeaderProps);

  // data query
  const waitingQuery = useWaitingPatients();
  const inProgressQuery = useInProgressPatients();
  const completedQuery = useCompletedPatients();
  const { refetchWaiting, refetchInProgress } = useRefetchQueries();

  useEffect(() => {
    setHeaderProps({
      type: 'back',
      title: '매칭관리',
      hasBorder: false,
      onBack: () => navigate(-1),
    });

    return () => clearHeaderProps();
  }, [clearHeaderProps, setHeaderProps, navigate]);

  // tab change handler
  // query refetch when tab changes
  const handleTabChange = useCallback(
    async (value) => {
      if (value === activeTab) return;

      setIsTabChanging(true);
      try {
        if (activeTab === 'waiting' && value !== 'waiting') {
          setTimeout(() => refetchWaiting(), 500);

          if (value === 'matching') {
            await refetchInProgress();
          }
        }
        setActiveTab(value);
      } finally {
        setIsTabChanging(false);
      }
    },
    [activeTab, refetchWaiting, refetchInProgress],
  );

  const tabHeaders = {
    waiting: {
      title: '매칭 대기',
      description:
        '등록한 어르신의 정보 기반으로 매칭한 요양보호사 목록이에요.\n요양보호사에게 매칭을 요청해보세요!',
      badge: waitingQuery.data?.length || 0,
    },
    matching: {
      title: '매칭 진행중',
      description:
        '요양보호사에게 보낸 매칭 요청을 확인할 수 있어요.\n수락 또는 거절 여부를 확인해보세요.',
      badge: inProgressQuery.data?.length || 0,
    },
    completed: {
      title: '매칭 완료',
      description: '매칭이 완료된 요양보호사 목록이에요.\n서비스 일정을 확인해보세요!',
      badge: completedQuery.data?.length || 0,
    },
  };

  return (
    <>
      {/* title */}
      <section className='py-2'>
        <section className='w-[88%] h-[8rem] mx-auto flex flex-col items-start gap-2'>
          <h2 className='text-[1.35rem] lg:text-[1.44rem] font-semibold text-[var(--text)] text-start'>
            {tabHeaders[activeTab].title}
          </h2>
          <h3 className='text-base font-normal text-[var(--text)] leading-normal text-start whitespace-pre-wrap break-words'>
            {tabHeaders[activeTab].description}
          </h3>
        </section>

        {/* content */}
        <section className='mx-auto flex-grow w-full'>
          <Tabs
            defaultValue='waiting'
            value={activeTab}
            onValueChange={handleTabChange}
            className={isTabChanging ? 'opacity-70 transition-opacity' : ''}
          >
            <TabsList className='w-full cursor-pointer'>
              <TabTrigger value='waiting' label='매칭 대기' count={tabHeaders.waiting.badge} />
              <TabTrigger value='matching' label='매칭 진행중' count={tabHeaders.matching.badge} />
              <TabTrigger value='completed' label='매칭 완료' count={tabHeaders.completed.badge} />
            </TabsList>

            {/* waiting */}
            <TabsContent value='waiting'>
              <TabPanel
                query={waitingQuery}
                emptyText='매칭 대기 중인 어르신이 없습니다.'
                renderList={(data) => (
                  <InfoCarousel
                    data={data}
                    renderItem={(item) => (
                      <MatchingWaiting
                        key={`${item.patientLogSeq}-${activeTab}`}
                        data={item}
                        isLoading={waitingQuery.isLoading}
                      />
                    )}
                  />
                )}
              />
            </TabsContent>

            {/* inProgress */}
            <TabsContent value='matching'>
              <TabPanel
                query={inProgressQuery}
                emptyText='매칭 진행 중인 어르신이 없습니다.'
                renderList={(data) => (
                  <InfoCarousel
                    data={data}
                    renderItem={(item) => (
                      <MatchingInProgress
                        key={item.patientLogSeq}
                        data={item}
                        isLoading={inProgressQuery.isPending}
                      />
                    )}
                  />
                )}
              />
            </TabsContent>

            {/* completed */}
            <TabsContent value='completed'>
              <TabPanel
                query={completedQuery}
                emptyText='매칭 완료된 내역이 없습니다.'
                renderList={(data) => (
                  <InfoCarousel
                    data={data}
                    renderItem={(item) => (
                      <MatchingCompleted
                        key={item.patientLogSeq}
                        data={item}
                        isLoading={completedQuery.isPending}
                      />
                    )}
                  />
                )}
              />
            </TabsContent>
          </Tabs>
        </section>
      </section>
    </>
  );
}
