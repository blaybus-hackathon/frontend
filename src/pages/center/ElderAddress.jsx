import { useEffect, useCallback } from 'react';
import AddressStepFlow from '@/components/address/AddressStepFlow';
import { useElderRegiStore } from '@/store/center/useElderRegiStore';
import { useNavigate } from 'react-router-dom';
import FormattedText from '@/components/ui/custom/FormattedText';
import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';

export default function ElderAddress() {
  const navigate = useNavigate();
  const setBasicInfoField = useElderRegiStore((s) => s.setBasicInfoField);

  const handleBackClick = useCallback(() => {
    navigate('/center/register');
  }, [navigate]);

  const setHeaderProps = useHeaderPropsStore((state) => state.setHeaderProps);
  const clearHeaderProps = useHeaderPropsStore((state) => state.clearHeaderProps);

  useEffect(() => {
    setHeaderProps({
      type: 'back',
      title: '주소지 등록',
      onBack: handleBackClick,
    });

    return () => {
      clearHeaderProps();
    };
  }, [handleBackClick, setHeaderProps, clearHeaderProps]);

  return (
    <>
      <div className='my-[2rem] flex flex-col items-start gap-[0.62rem]'>
        <p className='text-[1.44rem] font-semibold text-[var(--text)]'>
          나의 주소지를 등록해 주세요!
        </p>
        <FormattedText
          threshold={18}
          splitIndex={18}
          text='돌봄워크가 나에게 맞는 보호사를 소개시켜 드릴게요.'
          className='text-[1rem] font-normal text-[var(--text)] text-start'
        />
      </div>
      <AddressStepFlow
        // TODO: 버튼 hover 동작 안함...
        onComplete={(result) => {
          const { afSeq, asSeq, atSeq, addressLabel } = result;
          setBasicInfoField('afSeq', afSeq);
          setBasicInfoField('asSeq', asSeq);
          setBasicInfoField('atSeq', atSeq);
          setBasicInfoField('addressLabel', addressLabel);
          navigate(-1);
        }}
      />
    </>
  );
}
