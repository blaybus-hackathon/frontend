import Header from '@/components/ui/temp/Header';
import AddressStepFlow from '@/components/address/AddressStepFlow';
import { useElderRegiStore } from '@/store/center/useElderRegiStore';
import { useNavigate } from 'react-router-dom';

export default function ElderAddress() {
  const navigate = useNavigate();
  const setBasicInfoField = useElderRegiStore((s) => s.setBasicInfoField);

  return (
    <div className="h-screen max-w-2xl mx-auto">
      <Header title="주소지 등록" />
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
    </div>
  );
}
