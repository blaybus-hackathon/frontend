import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';
import { useSignUpStore } from '@/store/auth/helper/useSignUpStore';
import FormattedText from '@/components/ui/custom/FormattedText';
import AddressStepFlow from '@/components/address/AddressStepFlow';

export default function HelperAddress() {
  const navigate = useNavigate();
  const { signUpForm, setHelperInfoField } = useSignUpStore();
  const { addressDetail } = signUpForm.helperInfo;

  const handleBackClick = useCallback(() => {
    navigate('/helper/signup');
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
          text='요양보호사 등록을 위해 주소지를 등록해 주세요.'
          className='text-[1rem] font-normal text-[var(--text)] text-start'
        />
      </div>
      <AddressStepFlow
        // TODO: 버튼 hover 동작 안함...
        onComplete={(result) => {
          const { addressLabel } = result;
          setHelperInfoField('addressDetail', addressLabel);
          navigate(-1);
        }}
      />
    </>
  );
}
