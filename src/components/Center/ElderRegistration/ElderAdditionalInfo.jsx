import { useEffect, useRef, useCallback, useMemo } from 'react';
import { Alert } from '@/components/ui/custom/alert';
import { Button } from '@/components/ui/custom/Button';
import { FormField } from '@/components/ui/custom/FormField';
import { Radio, RadioItem } from '@/components/ui/custom/multiRadio';
import { ElderNextButton } from '@/components/Center/ElderRegistration/ElderNextButton';

import { useElderRegiStore } from '@/store/center/useElderRegiStore';
import { useElderRegiStepStore } from '@/store/center/useElderRegiStepStore.js';

import { useFormValidation } from '@/hooks/useFormValidation';
import { elderAddInfoSchema } from '@/components/Center/ElderRegistration/validation';

export default function ElderAdditionalInfo({ formOptions }) {
  const inputRefs = useRef({});

  const registerElder = useElderRegiStore((s) => s.registerElder);
  const setAddInfoField = useElderRegiStore((s) => s.setAddInfoField);

  const activeValidation = useElderRegiStepStore((s) => s.activeValidation);
  const clearValidationTrigger = useElderRegiStepStore((s) => s.clearValidationTrigger);

  const formData = useMemo(
    () =>
      registerElder?.addInfo || {
        dementiaSymptom: null,
        inmateState: null,
        selectedDementiaSymptoms: [],
      },
    [registerElder?.addInfo],
  );

  // form validation for alert display
  const { errors, touched, isValid, onBlur, onChangeValidate, validateAll } = useFormValidation({
    values: formData,
    schema: elderAddInfoSchema,
    fieldRefs: inputRefs,
  });

  // check all the fields
  useEffect(() => {
    if (activeValidation) {
      validateAll();
      clearValidationTrigger();
    }
  }, [activeValidation, validateAll, clearValidationTrigger]);

  // update single select
  const updateField = useCallback(
    (field, value) => {
      setAddInfoField(field, value);
      onChangeValidate(field, value);
    },
    [setAddInfoField, onChangeValidate],
  );

  // for multi select
  const updateMultiSelect = useCallback(
    (careVal) => {
      const selectedList = formData.selectedDementiaSymptoms || [];
      const selected = selectedList.includes(careVal)
        ? selectedList.filter((v) => v !== careVal)
        : [...selectedList, careVal];
      const sum = selected.reduce((acc, curr) => acc + curr, 0);
      setAddInfoField('dementiaSymptom', sum);
      setAddInfoField('selectedDementiaSymptoms', selected);
      onChangeValidate('dementiaSymptom', sum);
    },
    [setAddInfoField, formData, onChangeValidate],
  );

  return (
    <article className='flex flex-col space-y-6 lg:space-y-8'>
      <FormField label='치매 증상' required isMultiple={true}>
        <div className='grid grid-cols-2 gap-4'>
          {formOptions.dementiaSymptomList?.map((symptom) => (
            <Button
              key={symptom.id}
              variant='outline'
              className={`p-1 w-full h-[4.0625rem] text-base lg:text-xl text-center whitespace-pre-wrap break-normal leading-snug ${
                errors.dementiaSymptom && touched.dementiaSymptom ? 'border-red-500' : ''
              }`}
              onBlur={() => onBlur('dementiaSymptom')}
              selected={formData.selectedDementiaSymptoms?.includes(symptom.careVal)}
              onClick={() => {
                updateMultiSelect(symptom.careVal);
              }}
              ref={(el) => (inputRefs.current.dementiaSymptom = el)}
            >
              {symptom.careName}
            </Button>
          ))}
        </div>
        {errors.dementiaSymptom && touched.dementiaSymptom && (
          <Alert description={errors.dementiaSymptom} />
        )}
      </FormField>

      <FormField
        label='동거인 여부'
        required
        isMultiple={false}
        onBlur={() => onBlur('inmateState')}
        ref={(el) => (inputRefs.current.inmateState = el)}
      >
        <Radio
          value={formData.inmateState}
          onValueChange={(value) => {
            updateField('inmateState', value);
          }}
        >
          {formOptions.inmateStateList?.map((state) => (
            <RadioItem
              key={state.id}
              value={state.careVal}
              className={`flex items-center text-start text-base lg:text-xl whitespace-nowrap break-normal ${
                errors.inmateState && touched.inmateState ? 'border-red-500' : ''
              }`}
              checked={formData.inmateState === state.careVal}
            >
              {state.careName}
            </RadioItem>
          ))}
        </Radio>
        {errors.inmateState && touched.inmateState && <Alert description={errors.inmateState} />}
      </FormField>

      <ElderNextButton isValid={isValid} />
    </article>
  );
}
