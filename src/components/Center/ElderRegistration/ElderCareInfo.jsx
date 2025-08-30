import { useEffect, useRef, useCallback, useMemo } from 'react';
import { DAYS } from '@/constants/days';
import { Alert } from '@/components/ui/custom/alert';
import { FormField } from '@/components/ui/custom/FormField';
import { TimeSelector } from '@/components/ui/custom/TimeSelector';
import { Radio, RadioItem } from '@/components/ui/custom/multiRadio';
import { ElderNextButton } from '@/components/Center/ElderRegistration/ElderNextButton';

import { useElderRegiStore } from '@/store/center/useElderRegiStore';
import { useElderRegiStepStore } from '@/store/center/useElderRegiStepStore';

import { useFormValidation } from '@/hooks/useFormValidation';
import { elderCareInfoSchema } from '@/components/Center/ElderRegistration/validation';

export default function ElderCareInfo({ formOptions }) {
  const inputRefs = useRef({});

  const registerElder = useElderRegiStore((s) => s.registerElder);
  const setCareInfoField = useElderRegiStore((s) => s.setCareInfoField);

  const activeValidation = useElderRegiStepStore((s) => s.activeValidation);
  const clearValidationTrigger = useElderRegiStepStore((s) => s.clearValidationTrigger);

  const formData = useMemo(
    () =>
      registerElder?.careInfo || {
        workType: null,
        timeList: [],
        timeNegotiation: false,
      },
    [registerElder?.careInfo],
  );

  // form validation for alert display
  const { errors, touched, isValid, onBlur, onChangeValidate, validateAll } = useFormValidation({
    values: formData,
    schema: elderCareInfoSchema,
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
      setCareInfoField(field, value);
      onChangeValidate(field, value);
    },
    [setCareInfoField, onChangeValidate],
  );

  const handleTimeChange = useCallback(
    (day, key, time) => {
      // clone timeList
      const list = [...(formData.timeList || [])];
      const idx = list.findIndex((item) => item.ptDate === day);
      if (idx > -1) {
        list[idx] = { ...list[idx], [key]: time };
      } else {
        list.push({ ptDate: day, ptStartTime: '', ptEndTime: '', [key]: time });
      }
      setCareInfoField('timeList', list);
    },
    [setCareInfoField, formData],
  );

  // pick up selected days
  const selectedDays = formData.timeList?.map((t) => t.ptDate) || [];

  return (
    <article className='flex flex-col space-y-6 lg:space-y-8'>
      <FormField label='근무 종류' required isMultiple={false} onBlur={onBlur}>
        <Radio onValueChange={(value) => updateField('workType', value)}>
          {formOptions.workTypeList.map((workType) => (
            <RadioItem
              key={workType.id}
              value={workType.careVal}
              checked={formData.workType === workType.careVal}
            >
              {workType.careName}
            </RadioItem>
          ))}
        </Radio>
        {errors.workType && touched.workType && <Alert description={errors.workType} />}
      </FormField>

      <FormField label='돌봄 요일' required isMultiple={true} className='w-full'>
        <div className='flex flex-col gap-6 w-full'>
          {DAYS.map((day, idx) => {
            const dayIdx = idx + 1;
            const isSelected = selectedDays.includes(dayIdx);
            const timeData = formData.timeList?.find((t) => t.ptDate === dayIdx) || {};

            return (
              <div key={day} className='w-full'>
                <RadioItem
                  className='w-full'
                  style={{ width: '100%', display: 'block' }}
                  value={dayIdx}
                  checked={isSelected}
                  onClick={() => {
                    const newDates = isSelected
                      ? selectedDays.filter((d) => d !== dayIdx)
                      : [...selectedDays, dayIdx];

                    const newList = newDates.map((d) => {
                      const existing = formData.timeList?.find((t) => t.ptDate === d);
                      return existing || { ptDate: d, ptStartTime: '', ptEndTime: '' };
                    });

                    updateField('timeList', newList);
                  }}
                >
                  {day}
                </RadioItem>

                {/* render time selector */}
                {isSelected && (
                  <div className='mt-2'>
                    <div className='flex justify-between'>
                      <TimeSelector
                        placeholder='시작시간'
                        value={timeData.ptStartTime}
                        onChange={(val) => handleTimeChange(dayIdx, 'ptStartTime', val)}
                        useIndex={false}
                      />
                      <span className='mx-2'>~</span>
                      <TimeSelector
                        placeholder='종료시간'
                        value={timeData.ptEndTime}
                        onChange={(val) => handleTimeChange(dayIdx, 'ptEndTime', val)}
                        useIndex={false}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* 협의 가능 여부 */}
          <div className='w-full flex justify-start'>
            <RadioItem
              value={formData.timeNegotiation || false}
              checked={formData.timeNegotiation}
              onClick={() => updateField('timeNegotiation', !formData.timeNegotiation)}
            >
              <span>협의 가능</span>
            </RadioItem>
          </div>
        </div>
        {errors.timeList && touched.timeList && <Alert description={errors.timeList} />}
      </FormField>

      <ElderNextButton isValid={isValid} />
    </article>
  );
}
