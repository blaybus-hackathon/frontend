import { useElderRegiStore } from '@/store/center/useElderRegiStore';
import AddressRegister from '@/pages/AddressRegister';

export default function ElderAddress() {
  const setBasicInfoField = useElderRegiStore((s) => s.setBasicInfoField);

  return (
    <AddressRegister
      backPath='/center/elder-register'
      title='나의 주소지를 등록해 주세요!'
      description={`돌봄워크가 나에게 맞는\n보호사를 소개시켜 드릴게요.`}
      onComplete={({ afSeq, asSeq, atSeq, addressLabel }) => {
        setBasicInfoField('afSeq', afSeq);
        setBasicInfoField('asSeq', asSeq);
        setBasicInfoField('atSeq', atSeq);
        setBasicInfoField('addressLabel', addressLabel);
      }}
    />
  );
}
