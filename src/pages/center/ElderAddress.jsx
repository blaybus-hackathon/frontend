import Header from '@/components/ui/temp/Header';
import AddressStepFlow from '@/components/address/AddressStepFlow';
import { useElderRegiStore } from '@/store/center/useElderRegiStore';
import { useNavigate } from 'react-router-dom';
import FormattedText from '@/components/ui/custom/FormattedText';

export default function ElderAddress() {
  const navigate = useNavigate();
  const setBasicInfoField = useElderRegiStore((s) => s.setBasicInfoField);

  const handleBackClick = () => {
    navigate('/center/register');
  };

  return (
    <div className='h-screen max-w-2xl mx-auto'>
      <Header type='back' title='주소지 등록' onBack={handleBackClick} />
      <div className='w-[88%] mx-auto my-[2rem] flex flex-col items-start gap-[0.62rem]'>
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
    </div>
  );
}
