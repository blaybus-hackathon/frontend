import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';
import InfoCarousel from '@/components/ui/InfoCard/InfoCarousel';
import ElderCard from '@/components/Center/ElderInfo/ElderCard';
import { useCompletedPatients } from '@/hooks/center/service/useMatchList';

export default function ElderInfo() {
  const navigate = useNavigate();
  const setHeaderProps = useHeaderPropsStore((state) => state.setHeaderProps);
  const { data, isLoading, isError } = useCompletedPatients();
  const elderList = data?.matched || [];

  useEffect(() => {
    setHeaderProps({
      type: 'back',
      title: '어르신 관리',
      onBack: () => navigate(-1),
      hasBorder: false,
    });
  }, [navigate, setHeaderProps]);

  // TODO: 로딩, 에러 컴포넌트 추가
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <article className='flex flex-col gap-y-3 mb-5'>
      <section className='flex flex-col gap-y-3 items-start my-4'>
        <h1 className='text-[1.438rem] font-semibold text-[var(--text)]'>어르신 관리</h1>
        <h2 className='text-[var(--text)] text-base font-normal text-start leading-[1.5rem] break-keep'>
          어르신의 정보를 기반으로 매칭한 요양보호사에요!
        </h2>
      </section>

      {elderList.length > 0 ? (
        // TODO: 추후 어르신 수정 링크 연결 필요
        <InfoCarousel data={elderList} renderItem={(item) => <ElderCard data={item} />} />
      ) : (
        <section className='flex justify-center items-center'>
          <p className='text-base font-normal text-[var(--text)]'>
            매칭 완료된 어르신이 존재하지 않습니다.
          </p>
        </section>
      )}
    </article>
  );
}
