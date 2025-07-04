import { Tabs, TabsList, TabsContent } from '@/components/ui/custom/tabs';
import {
  useWaitingPatients,
  useInProgressPatients,
  useCompletedPatients,
} from '@/hooks/center/service/useMatchList';
import TabTrigger from '@/components/ui/tabs/TabTrigger';
import InfoCarousel from '@/components/ui/InfoCard/InfoCarousel';
import InfoCard from '@/components/ui/InfoCard/InfoCard';
import MatchingWaiting from '@/components/Center/MatchingInfo/MatchingWaiting';
import TabPanel from '@/components/ui/tabs/TabPanel';

export default function MatchingTabs({ activeTab, onTabChange }) {
  const waitingQuery = useWaitingPatients();
  const inProgressQuery = useInProgressPatients();
  const completedQuery = useCompletedPatients();

  const tabData = {
    waiting: waitingQuery.data ?? [],
    matching: inProgressQuery.data ?? [],
    completed: completedQuery.data ?? { matched: [], rejected: [] },
  };

  const tabCounts = {
    waiting: tabData.waiting.length,
    matching: tabData.matching.length,
    completed: tabData.completed.matched.length + tabData.completed.rejected.length,
  };

  return (
    <article className='mt-3'>
      <Tabs defaultValue='waiting' value={activeTab} onValueChange={onTabChange}>
        <TabsList className='w-full'>
          <TabTrigger value='waiting' label='매칭 대기' count={tabCounts.waiting} />
          <TabTrigger value='matching' label='매칭 진행중' count={tabCounts.matching} />
          <TabTrigger value='completed' label='매칭 완료' count={tabCounts.completed} />
        </TabsList>

        <TabsContent value='waiting'>
          <TabPanel
            query={waitingQuery}
            emptyText='매칭 대기 중인 어르신이 없습니다.'
            renderList={(data) => (
              <InfoCarousel data={data} renderItem={(item) => <MatchingWaiting data={item} />} />
            )}
          />
        </TabsContent>
        <TabsContent value='matching'>
          <TabPanel
            query={inProgressQuery}
            emptyText='매칭 진행 중인 어르신이 없습니다.'
            renderList={(data) => (
              <InfoCarousel
                data={data}
                renderItem={(item) => <InfoCard key={item.id} data={item} />}
              />
            )}
          />
        </TabsContent>
        <TabsContent value='completed'>
          <TabPanel
            query={completedQuery}
            emptyText='매칭 완료된 내역이 없습니다.'
            renderList={(_, data) => {
              // matched와 rejected를 합쳐서 하나의 배열로 만들기
              const totalList = [...(data.matched || []), ...(data.rejected || [])];
              return (
                <InfoCarousel
                  data={totalList}
                  renderItem={(item) => (
                    <InfoCard
                      key={item.id}
                      data={item}
                      status={data.matched?.some((v) => v.id === item.id) ? 'matched' : 'rejected'}
                    />
                  )}
                />
              );
            }}
          />
        </TabsContent>
      </Tabs>
    </article>
  );
}
