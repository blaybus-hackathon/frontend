import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';
import InfoCard from '@/components/ui/InfoCard/InfoCard';
import ElderProfile from '@/components/ui/InfoCard/ElderProfile';

export default function RequestDetail({ patientSeq }) {
  const navigate = useNavigate();
  const setHeaderProps = useHeaderPropsStore((state) => state.setHeaderProps);
  const clearHeaderProps = useHeaderPropsStore((state) => state.clearHeaderProps);

  useEffect(() => {
    setHeaderProps({
      type: 'back',
      title: '어르신 상세정보',
      onBack: () => navigate('/helper'),
    });

    return () => {
      clearHeaderProps();
    };
  }, [setHeaderProps, clearHeaderProps, navigate]);

  return (
    <article className='py-14'>
      <InfoCard>
        <ElderProfile elderInfo={req} detailInfo={false} />
      </InfoCard>
    </article>
  );
}
