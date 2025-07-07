import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';
import FormattedText from '@/components/ui/custom/FormattedText';
import AddressStepFlow from '@/components/address/AddressStepFlow';

export default function AddressRegister({ backPath, title, description, onComplete }) {
  const navigate = useNavigate();

  const handleBackClick = useCallback(() => {
    navigate(backPath);
  }, [backPath, navigate]);

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
  }, [clearHeaderProps, handleBackClick, setHeaderProps]);

  return (
    <>
      <div className='my-8 flex flex-col gap-[0.62rem] items-start'>
        <p className='text-[1.44rem] font-semibold text-[var(--text)]'>{title}</p>
        <FormattedText
          threshold={18}
          splitIndex={18}
          text={description}
          className='text-[1rem] font-normal text-[var(--text)] text-start'
        />
      </div>
      {/* TODO: 버튼 hover 동작 안함... */}
      <AddressStepFlow
        onComplete={(result) => {
          onComplete(result);
          navigate(-1);
        }}
      />
    </>
  );
}
