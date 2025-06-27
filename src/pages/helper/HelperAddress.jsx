import { useSignUpStore } from '@/store/auth/helper/useSignUpStore';
import AddressRegister from '@/pages/AddressRegister';

export default function HelperAddress() {
  const setHelperInfoField = useSignUpStore((s) => s.setHelperInfoField);

  return (
    <AddressRegister
      backPath='helper/signup'
      title='나의 주소지를 등록해 주세요!'
      description='요양보호사 등록을 위해 주소지를 등록해 주세요.'
      onComplete={({ addressLabel }) => {
        setHelperInfoField('addressDetail', addressLabel);
      }}
    />
  );
}
