import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';
import { useElderDetail } from '@/hooks/helper/useMatchList';
import { usePermitTuneMutation, useRejectMutation } from '@/hooks/helper/useMatchMutations';
import { Button } from '@/components/ui/custom/Button';
import Spinner from '@/components/loading/Spinner';
import InfoCard from '@/components/ui/InfoCard/InfoCard';
import ElderProfile from '@/components/ui/InfoCard/ElderProfile';
import InfoField from '@/components/ui/InfoCard/InfoField';
import useAuthStore from '@/store/useAuthStore';

const SELF_CARE_IDS = {
  serviceMealList: 45,
  serviceMobilityList: 55,
  serviceToiletList: 50,
};

const CARE_CATEGORIES = {
  serviceMealList: '식사보조',
  serviceMobilityList: '이동보조',
  serviceToiletList: '배변보조',
};

export default function RequestDetail({ patientLogSeq, returnPath }) {
  const navigate = useNavigate();
  const setHeaderProps = useHeaderPropsStore((state) => state.setHeaderProps);
  const clearHeaderProps = useHeaderPropsStore((state) => state.clearHeaderProps);

  const patientLogSeqNum = parseInt(patientLogSeq, 10);
  const isValidPatientLogSeq = !isNaN(patientLogSeqNum);

  const { data, isLoading, isError, error } = useElderDetail(
    isValidPatientLogSeq ? patientLogSeqNum : null,
  );
  const permitTuneMutation = usePermitTuneMutation({
    optimisticUpdate: false,
  });
  const rejectMutation = useRejectMutation({
    optimisticUpdate: false,
  });
  const getHelperSeq = useAuthStore((state) => state.getHelperSeq);

  useEffect(() => {
    setHeaderProps({
      type: 'back',
      title: '어르신 상세정보',
      onBack: () => navigate(returnPath),
    });

    return () => {
      clearHeaderProps();
    };
  }, [setHeaderProps, clearHeaderProps, navigate, returnPath]);

  if (!isValidPatientLogSeq) {
    return (
      <article className='py-14 '>
        <InfoCard>
          <div className='text-center py-8'>
            <p className='text-red-500 mb-4'>잘못된 요청입니다.</p>
            <p className='text-gray-600'>올바르지 않은 어르신 정보입니다.</p>
            <Button onClick={() => navigate(returnPath)} className='mt-4'>
              돌아가기
            </Button>
          </div>
        </InfoCard>
      </article>
    );
  }

  // TODO: 추후 로딩, 에러 컴포넌트 추가
  if (isLoading) {
    return (
      <article className='py-14 flex justify-center items-center min-h-screen'>
        <Spinner />
      </article>
    );
  }

  const getCareNeedItems = (careChoice) => {
    if (!careChoice) return '정보 없음';

    const careCategories = [];

    Object.entries(SELF_CARE_IDS).forEach(([listKey, selfCareId]) => {
      const serviceList = careChoice[listKey];
      if (serviceList?.length > 0 && serviceList.some((id) => id !== selfCareId)) {
        careCategories.push(CARE_CATEGORIES[listKey]);
      }
    });

    return careCategories.length > 0 ? careCategories.join('\n') : '정보 없음';
  };

  const negotiable = [];
  if (data.timeNegotiation) negotiable.push('시간');
  if (data.wageNegotiation) negotiable.push('임금');

  if (isError) {
    return (
      <article className='py-14'>
        <InfoCard>
          <div className='text-center py-8'>
            <p className='text-red-500 mb-4'>어르신 정보를 불러오는데 실패했습니다.</p>
            <p className='text-gray-600'>{error?.message || '다시 시도해주세요.'}</p>
            <Button onClick={() => navigate(returnPath)} className='mt-4'>
              돌아가기
            </Button>
          </div>
        </InfoCard>
      </article>
    );
  }

  const handlePermitTune = async () => {
    const helperSeq = getHelperSeq();
    if (!helperSeq) {
      console.error('Helper sequence not found');
      return;
    }

    try {
      await permitTuneMutation.mutateAsync({
        patientLogSeq: patientLogSeqNum,
        helperSeq,
      });
      // TODO: 채팅방 이동 로직 추가
      // 조율/채팅 성공 시 채팅방으로 이동
      navigate(`/helper/chat/${patientLogSeqNum}`);
    } catch (error) {
      console.error('조율 요청 실패:', error);
      alert('요청 전송에 실패하였습니다. 다시 시도해주세요.');
      navigate('/helper');
    }
  };

  const handleReject = async () => {
    const helperSeq = getHelperSeq();
    if (!helperSeq) {
      console.error('Helper sequence not found');
      return;
    }

    try {
      await rejectMutation.mutateAsync({
        patientLogSeq: patientLogSeqNum,
        helperSeq,
      });
      navigate('/helper');
    } catch (error) {
      console.error('거절 요청 실패:', error);
      alert('요청 전송에 실패하였습니다. 다시 시도해주세요.');
      navigate('/helper');
    }
  };

  return (
    <article className='py-5 lg:py-14 w-[88%] mx-auto'>
      <InfoCard>
        <ElderProfile elderInfo={data} detailInfo={false} />
        <hr className='my-5' />
        <section className='grid gap-y-5 px-0'>
          <InfoField label='근무종류' text={data.careChoiceFormatted?.workType || '정보 없음'} />
          <InfoField label='주소지' text={data.fullAddress || '주소 정보 없음'} />
          <InfoField label='희망요일/시간' text={data.formattedTimeList || '시간 정보 없음'} />
          <InfoField label='보유질병' text={data.diseases || '정보 없음'} />
          <InfoField label='돌봄필요' text={getCareNeedItems(data.careChoice)} />
          <InfoField label='희망시급' text={data.formattedWage || '시급 정보 없음'} />
          <InfoField
            label='조율 가능'
            text={
              <div className='flex gap-2 flex-wrap items-center'>
                {data.timeNegotiation && (
                  <span className='text-lg font-normal text-[var(--text)]'>시간</span>
                )}
                {data.timeNegotiation && data.wageNegotiation && (
                  <span className='text-lg font-normal text-[var(--text)]'>/</span>
                )}
                {data.wageNegotiation && (
                  <span className='text-lg font-normal text-[var(--text)]'>임금</span>
                )}
                {!data.timeNegotiation && !data.wageNegotiation && (
                  <span className='text-lg font-normal text-[var(--text)]'>조율 불가</span>
                )}
              </div>
            }
          />
        </section>
        <section className='flex gap-2 mt-6'>
          <Button
            className='text-lg font-medium'
            onClick={handlePermitTune}
            disabled={permitTuneMutation.isPending}
          >
            {permitTuneMutation.isPending ? '전송 중...' : '조율/채팅'}
          </Button>
          <Button
            variant='white'
            className='text-lg font-medium text-[var(--black)] border-[var(--outline)]'
            onClick={handleReject}
            disabled={rejectMutation.isPending}
          >
            {rejectMutation.isPending ? '전송 중...' : '거절'}
          </Button>
        </section>
      </InfoCard>
    </article>
  );
}
