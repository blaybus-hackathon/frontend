import { useCallback } from 'react';
import { Radio, RadioItem } from '@/components/ui/custom/multiRadio';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/custom/select';
import { FormField } from '@/components/ui/custom/FormField';
import { ElderNextButton } from '@/components/Center/ElderRegistration/Button/ElderNextButton';
import { useElderRegiStore } from '@/store/center/useElderRegiStore';
import { DAYS } from '@/constants/days';
import { TIMES } from '@/constants/times';

const TimeSelector = ({ value, onChange, placeholder }) => (
  <Select onValueChange={onChange} value={value || ''}>
    <SelectTrigger className='w-[45%] h-[4.06rem] text-xl font-normal text-[var(--text)]'>
      <SelectValue placeholder={placeholder} />
    </SelectTrigger>
    <SelectContent>
      {TIMES.map((time) => (
        <SelectItem key={time} value={time}>
          {time}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);

export default function ElderCareInfo({ formOptions }) {
  const careInfo = useElderRegiStore((s) => s.registerElder.careInfo);
  const setCareInfo = useElderRegiStore((s) => s.setCareInfo);

  // update single select
  const updateField = useCallback(
    (field, value) => {
      setCareInfo({
        ...careInfo,
        [field]: value,
      });
    },
    [careInfo, setCareInfo],
  );

  const handleTimeChange = useCallback(
    (day, key, time) => {
      // clone timeList
      const list = [...(careInfo.timeList || [])];
      const idx = list.findIndex((item) => item.ptDate === day);
      if (idx > -1) {
        list[idx] = { ...list[idx], [key]: time };
      } else {
        list.push({ ptDate: day, ptStartTime: '', ptEndTime: '', [key]: time });
      }
      setCareInfo({ ...careInfo, timeList: list });
    },
    [careInfo, setCareInfo],
  );

  // pick up selected days
  const selectedDays = careInfo.timeList?.map((t) => t.ptDate) || [];

  return (
    <>
      <FormField label='근무 종류' required isMultiple={false}>
        <Radio onValueChange={(value) => updateField('workType', value)}>
          {formOptions.workTypeList.map((workType) => (
            <RadioItem
              key={workType.id}
              value={workType.careVal}
              checked={careInfo.workType === workType.careVal}
            >
              {workType.careName}
            </RadioItem>
          ))}
        </Radio>
      </FormField>

      <FormField label='돌봄 요일' required isMultiple={true}>
        <div className='grid gap-6'>
          {DAYS.map((day, idx) => {
            const dayIdx = idx + 1;
            const isSelected = selectedDays.includes(dayIdx);
            const timeData = careInfo.timeList?.find((t) => t.ptDate === dayIdx) || {};
            return (
              <div key={day}>
                <RadioItem
                  className='w-full '
                  value={dayIdx}
                  checked={isSelected}
                  onClick={() => {
                    const newDates = isSelected
                      ? selectedDays.filter((d) => d !== dayIdx)
                      : [...selectedDays, dayIdx];
                    // timeList 초기화/유지
                    const newList = newDates.map((d) => {
                      const existing = careInfo.timeList?.find((t) => t.ptDate === d);
                      return existing || { ptDate: d, ptStartTime: '', ptEndTime: '' };
                    });
                    updateField('timeList', newList);
                  }}
                >
                  {day}
                </RadioItem>

                {/* render time selector */}
                {isSelected && (
                  <div className='mt-2 flex justify-between'>
                    <TimeSelector
                      placeholder='시작시간'
                      value={timeData.ptStartTime}
                      onChange={(val) => handleTimeChange(dayIdx, 'ptStartTime', val)}
                    />
                    <span className='mx-2'>~</span>
                    <TimeSelector
                      placeholder='종료시간'
                      value={timeData.ptEndTime}
                      onChange={(val) => handleTimeChange(dayIdx, 'ptEndTime', val)}
                    />
                  </div>
                )}
              </div>
            );
          })}
          {/* 협의 가능 여부 */}
          <div className='mt-1.37rem'>
            <RadioItem
              className='flex justify-start'
              value={careInfo.timeNegotiation || false}
              checked={careInfo.timeNegotiation}
              onClick={() => updateField('timeNegotiation', !careInfo.timeNegotiation)}
            >
              <span>협의 가능</span>
            </RadioItem>
          </div>
        </div>
      </FormField>

      <ElderNextButton />
    </>
  );
}
