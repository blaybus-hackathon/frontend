import { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tabs, TabsList, TabsContent } from '@/components/ui/custom/tabs';
import { useRequestPatients, useCompletedPatients } from '@/hooks/helper/useMatchList';
import TabTrigger from '@/components/ui/tabs/TabTrigger';
import MatchingRequest from '@/components/helper/Matching/MatchingRequest';
import MatchingComplete from '@/components/helper/Matching/MatchingComplete';

export default function HelperHome() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('request');
  const [hasViewedComplete, setHasViewedComplete] = useState(false);

  // run complete query if request query is completed
  const requestQuery = useRequestPatients();
  const completeQuery = useCompletedPatients({
    enabled: requestQuery.isSuccess,
  });

  const handleTabChange = (value) => {
    setActiveTab(value);
    if (value === 'complete') setHasViewedComplete(true);
  };

  const tabHeaders = useMemo(
    () => ({
      request: {
        title: '돌봄워크 AI가 추천하는 맞춤 어르신!',
        subTitle:
          '회원님의 정보를 기반으로 매칭된 어르신 목록이에요.\n수락/조율 요청 시 해당 센터 관리자와 채팅으로 연락 가능해요!',
        badge: requestQuery.data?.length || 0,
      },
      complete: {
        title: '회원님과 매칭/조율 중인 어르신 목록이에요!',
        subTitle: '어르신의 프로필을 터치해보세요!\n보다 상세한 어르신의 정보를 볼 수 있어요.',
        badge: completeQuery.data?.length || 0,
      },
    }),
    [requestQuery.data?.length, completeQuery.data?.length],
  );

  const currentHeader = tabHeaders[activeTab];

  const handleLink = (req, status) => {
    navigate(`/helper/detail/${req.patientLogSeq}?status=${status}&return=${location.pathname}`);
  };

  return (
    <section className='my-4'>
      <article className='w-[88%] mx-auto flex flex-col items-start text-start gap-2.5 mb-5'>
        <h2 className='text-xl lg:text-[1.44rem] font-semibold text-[var(--text)] whitespace-pre-wrap break-keep'>
          {currentHeader.title}
        </h2>
        <h3 className='text-base md:text-[1.06rem] font-normal text-[var(--text)] whitespace-pre-wrap break-keep text-start'>
          {currentHeader.subTitle}
        </h3>
      </article>
      <Tabs defaultValue='request' value={activeTab} onValueChange={handleTabChange}>
        <TabsList className='w-full'>
          <TabTrigger value='request' label='매칭 요청 목록' count={tabHeaders.request.badge} />
          <TabTrigger
            value='complete'
            label='매칭 완료'
            count={tabHeaders.complete.badge}
            disabled={!hasViewedComplete}
          />
        </TabsList>

        <TabsContent value='request'>
          <MatchingRequest
            data={requestQuery.data}
            onDetail={(req) => handleLink(req, 'request')}
          />
        </TabsContent>
        <TabsContent value='complete'>
          <MatchingComplete
            data={completeQuery.data}
            onDetail={(req) => handleLink(req, 'complete')}
          />
        </TabsContent>
      </Tabs>
    </section>
  );
}
