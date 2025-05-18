import { useAddressFlow } from "@/hooks/useAddressFlow";
import { AddressButtons } from "./AddressButtons";

export default function AddressStepFlow({onComplete}) {
  const { step, stepButtons } = useAddressFlow();
  const currentStep = stepButtons[step];

  const handleFinalSelect = (atSeq) => {
    const afSeq = stepButtons[1]?.selectedId;
    const asSeq = stepButtons[2]?.selectedId;
    const afName = stepButtons[1]?.list.find((a) => a.id === afSeq)?.name;
    const asName = stepButtons[2]?.list.find((a) => a.id === asSeq)?.name;
    const atName = stepButtons[3]?.list.find((a) => a.id === atSeq)?.name;

    const addressLabel = `${afName ?? ''} ${asName ?? ''} ${atName ?? ''}`.trim();

    if (onComplete) {
      onComplete({
        afSeq: Number(afSeq),
        asSeq: Number(asSeq),
        atSeq: Number(atSeq),
        addressLabel
      })
    }
  };

  // format text by step
  const formatConfig = {
    1: {
      threshold: 7,
      splitIndex: 2,
      longClass: 'text-[1.1rem]',
      className: 'whitespace-pre-line'
    },
    2: {
      threshold: 6,
      splitIndex: 3,
      longClass: 'text-[1.1rem]',
      className: 'whitespace-pre-line'  
    },
    3: {
      threshold: 6,
      splitIndex: 3,
      longClass: 'text-[1rem]',
      className: 'whitespace-pre-line'  
    }
  }

  const handleClick = (id) => {
    currentStep.onClick(id);
    if (step === 3) {
      handleFinalSelect(id);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 w-[88%] mx-auto">
      <AddressButtons
        list={currentStep.list}
        onClick={handleClick}
        selectedId={currentStep.selectedId}
        formatConfig={formatConfig[step] || {}}
      />
    </div>
  )
}