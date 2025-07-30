import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';
import { useElderDetail } from '@/hooks/helper/useMatchList';
import { Button } from '@/components/ui/custom/Button';
import Spinner from '@/components/loading/Spinner';
import InfoCard from '@/components/ui/InfoCard/InfoCard';
import ElderProfile from '@/components/ui/InfoCard/ElderProfile';
import InfoField from '@/components/ui/InfoCard/InfoField';

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

export default function CompleteDetail({ patientLogSeq, returnPath }) {
  const navigate = useNavigate();
  const setHeaderProps = useHeaderPropsStore((state) => state.setHeaderProps);
  const clearHeaderProps = useHeaderPropsStore((state) => state.clearHeaderProps);

  const patientLogSeqNum = parseInt(patientLogSeq, 10);
  const isValidPatientLogSeq = !isNaN(patientLogSeqNum);

  const { data, isLoading, isError, error } = useElderDetail(
    isValidPatientLogSeq ? patientLogSeqNum : null,
  );

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
      <article className='py-14'>
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

  return (
    <article className='py-5'>
      <InfoCard className='border-none shadow-none'>
        <ElderProfile elderInfo={data} detailInfo={false} />
        <hr className='my-5' />
        <section className='grid gap-y-5 px-0'>
          <InfoField label='생년월일' text={data.formattedBirthDate || '정보 없음'} />
          <InfoField label='성별' text={data.gender || '정보 없음'} />
          <InfoField label='몸무게' text={data.weight ? `${data.weight}kg` : '정보 없음'} />
          <InfoField label='근무종류' text={data.careChoiceFormatted?.workType || '정보 없음'} />
          <InfoField label='주소지' text={data.fullAddress || '주소 정보 없음'} />
          <InfoField label='희망요일/시간' text={data.formattedTimeList || '시간 정보 없음'} />
          <InfoField label='보유질병' text={data.diseases || '정보 없음'} />
          <InfoField
            label='장기요양등급'
            text={data.careChoiceFormatted?.careLevel || '정보 없음'}
          />
          <InfoField label='돌봄필요' text={getCareNeedItems(data.careChoice)} />
          <InfoField
            label='동거인 여부'
            text={data.careChoiceFormatted?.inmateStates || '정보 없음'}
          />
          <InfoField
            label='식사 보조'
            text={data.careChoiceFormatted?.serviceMeals || '정보 없음'}
          />
          <InfoField
            label='배변 보조'
            text={data.careChoiceFormatted?.serviceToilets || '정보 없음'}
          />
          <InfoField
            label='이동 보조'
            text={data.careChoiceFormatted?.serviceMobilities || '정보 없음'}
          />
          <InfoField
            label='일상생활'
            text={data.careChoiceFormatted?.serviceDailies || '정보 없음'}
          />
          <InfoField label='희망시급' text={data.formattedWage || '시급 정보 없음'} />
          <InfoField
            label='희망복지'
            text={data.careChoiceFormatted?.welfares || '복지 정보 없음'}
          />
        </section>
      </InfoCard>
    </article>
  );
}
