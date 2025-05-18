import { useCallback } from 'react';
import { Button } from '@/components/ui/custom/Button';
import { Radio, RadioItem } from '@/components/ui/custom/multiRadio';
import { FormField } from '@/components/ui/custom/FormField';
import { useElderRegiStore } from '@/store/center/useElderRegiStore';
import { ElderNextButton } from '@/components/Center/ElderRegistration/Button/ElderNextButton';

export default function ElderAdditionalInfo({ formOptions }) {
  const addInfo = useElderRegiStore((state) => state.registerElder.addInfo);
  const setAddInfo = useElderRegiStore((state) => state.setAddInfo);

  // update single select
  const updateField = useCallback(
    (field, value) => {
      setAddInfo({
        ...addInfo,
        [field]: value,
      });
    },
    [addInfo, setAddInfo],
  );

  // for multi select
  const updateMultiSelect = useCallback(
    (careVal) => {
      const selectedList = addInfo.selectedDementiaSymptoms || [];
      const selected = selectedList.includes(careVal)
        ? selectedList.filter((v) => v !== careVal)
        : [...selectedList, careVal];
      const sum = selected.reduce((acc, curr) => acc + curr, 0);
      setAddInfo({
        ...addInfo,
        dementiaSymptom: sum,
        selectedDementiaSymptoms: selected,
      });
    },
    [addInfo, setAddInfo],
  );

  return (
    <>
      <FormField label='치매 증상' required isMultiple={true}>
        <div className='grid grid-cols-2 gap-[1.12rem]'>
          {formOptions.dementiaSymptomList?.map((symptom) => (
            <Button
              key={symptom.id}
              variant='outline'
              className='w-full h-[4.0625rem] text-lg sm:text-lg lg:text-xl text-center whitespace-normal break-words'
              selected={addInfo.selectedDementiaSymptoms?.includes(symptom.careVal)}
              onClick={() => {
                updateMultiSelect(symptom.careVal);
              }}
            >
              {symptom.careName}
            </Button>
          ))}
        </div>
      </FormField>

      <FormField label='동거인 여부' required isMultiple={false}>
        <Radio
          value={addInfo.inmateState}
          onValueChange={(value) => {
            updateField('inmateState', value);
          }}
        >
          {formOptions.inmateStateList?.map((state) => (
            <RadioItem
              key={state.id}
              value={state.careVal}
              className='[&>div]:text-xl [&>div]:items-center [&>div]:text-start [&>div]:sm:text-lg [&>div]:lg:text-xl [&>div]:whitespace-normal'
            >
              {state.careName}
            </RadioItem>
          ))}
        </Radio>
      </FormField>

      <ElderNextButton />
    </>
  );
}
