import { useAddressFlow } from '@/hooks/useAddressFlow';
import { AddressButtons } from './AddressButtons';
import { formatAddress } from '@/utils/formatters/formatAddress';

export default function AddressStepFlow({ onComplete }) {
  const { step, stepButtons } = useAddressFlow();
  const currentStep = stepButtons[step];

  const handleFinalSelect = (atSeq) => {
    const afSeq = stepButtons[1]?.selectedId;
    const asSeq = stepButtons[2]?.selectedId;
    const afName = stepButtons[1]?.list.find((a) => a.id === afSeq)?.name;
    const asName = stepButtons[2]?.list.find((a) => a.id === asSeq)?.name;
    const atName = stepButtons[3]?.list.find((a) => a.id === atSeq)?.name;

    const addressLabel = formatAddress(afName, asName, atName);

    if (onComplete) {
      onComplete({
        afSeq: Number(afSeq),
        asSeq: Number(asSeq),
        atSeq: Number(atSeq),
        addressLabel,
      });
    }
  };

  // format text by step
  const formatConfig = {
    1: {
      threshold: 6,
      shortClass: 'text-lg leading-tight break-keep',
      longClass: 'text-[1.1rem] leading-snug',
      className: 'whitespace-pre-line text-center',
    },
    2: {
      threshold: 5,
      shortClass: 'text-lg leading-tight break-keep',
      longClass: 'text-base leading-snug',
      className: 'whitespace-pre-line text-center',
    },
    3: {
      threshold: 5,
      shortClass: 'text-lg leading-tight break-keep',
      longClass: 'text-base leading-snug',
      className: 'whitespace-pre-line text-center',
    },
  };

  const handleClick = (id) => {
    if (step === 3) {
      // For third step, handle selection and completion
      currentStep.onClick(id);
      handleFinalSelect(id);
    } else {
      // For first and second steps, just handle selection
      currentStep.onClick(id);
    }
  };

  return (
    <div className='grid grid-cols-3 gap-3 mx-auto mb-8'>
      <AddressButtons
        list={currentStep.list}
        onClick={handleClick}
        selectedId={currentStep.selectedId}
        formatConfig={formatConfig[step] || {}}
      />
    </div>
  );
}
