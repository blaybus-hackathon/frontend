import NextButton from '@/components/ui/custom/Button/NextButton';
import { Radio, RadioItem } from '@/components/ui/custom/multiRadio';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/custom/select';
import elderRegiDummy from '@/store/jpaper/elderRegiDummy.js';
import { useCareRequireForm } from '@/hooks/center/service/useCareRequireForm';

// constant
const DAYS = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];
const TIMES = Array.from(
  { length: 48 },
  (_, i) =>
    `${String(Math.floor(i / 2)).padStart(2, '0')}:${String(i % 2 === 0 ? '00' : '30').padStart(2, '0')}`,
);

const FormField = ({ title, required, isMultiple }) => (
  <section className='flex items-center mb-[1.12rem]'>
    <span className='sub-title'>{title}</span>
    <span className='single-select'>{isMultiple ? '(중복선택가능)' : '(단일 선택)'}</span>
    {required && <span className='required-text'>&nbsp;필수</span>}
  </section>
);

const TimeSelector = ({ onValueChange, placeholder, value }) => (
  <Select onValueChange={onValueChange} value={value || ''}>
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

const TimeSelection = ({ day, onTimeChange, timeData }) => (
  <div className='mt-5 flex items-center justify-between gap-[0.62rem]'>
    <TimeSelector
      onValueChange={(value) => onTimeChange(day, 'ptStartTime', value)}
      placeholder='시작시간'
      value={timeData.ptStartTime}
    />
    <span>~</span>
    <TimeSelector
      onValueChange={(value) => onTimeChange(day, 'ptEndTime', value)}
      placeholder='종료시간'
      value={timeData.ptEndTime}
    />
  </div>
);

const DaySchedule = ({ day, index, isSelected, onDaySelect, onTimeChange, timeList }) => {
  const timeData = timeList.find((t) => t.ptDate === index + 1) || {
    ptStartTime: '',
    ptEndTime: '',
  };

  return (
    <div key={day}>
      <div className='flex items-center'>
        <RadioItem
          value={index + 1}
          className='w-full'
          checked={isSelected}
          onClick={() => onDaySelect(index + 1)}
        >
          {day}
        </RadioItem>
      </div>
      {isSelected && (
        <TimeSelection day={index + 1} onTimeChange={onTimeChange} timeData={timeData} />
      )}
    </div>
  );
};

const WorkTypeSection = ({ formData, handleInputChange, workTypeList }) => (
  <section className='mb-10'>
    <FormField title='근무 종류' required isMultiple={false} />
    <Radio onValueChange={(value) => handleInputChange('workType', value)}>
      {workTypeList?.map((workType) => (
        <RadioItem
          key={workType.id}
          value={workType.careVal}
          checked={formData.workType === workType.careVal}
        >
          {workType.careName}
        </RadioItem>
      ))}
    </Radio>
  </section>
);

const CareDaysSection = ({ days, formData, handleInputChange, handleTimeChange }) => {
  const selectedDays = formData.timeList.map((t) => t.ptDate);

  const handleDaySelect = (dayIdx) => {
    const newTimeList = selectedDays.includes(dayIdx)
      ? formData.timeList.filter((t) => t.ptDate !== dayIdx)
      : [...formData.timeList, { ptDate: dayIdx, ptStartTime: '', ptEndTime: '' }];

    handleInputChange('timeList', newTimeList);
  };

  return (
    <section className='mb-10'>
      <FormField title='돌봄 요일' required isMultiple={true} />
      <div>
        <div className='grid gap-6'>
          {days.map((day, index) => (
            <DaySchedule
              key={day}
              day={day}
              index={index}
              isSelected={selectedDays.includes(index + 1)}
              onDaySelect={handleDaySelect}
              onTimeChange={handleTimeChange}
              timeList={formData.timeList}
            />
          ))}
        </div>
        <div className='mt-1.37rem'>
          <RadioItem
            value={formData.timeNegotiation}
            className='flex justify-start border-none mt-5'
            checked={formData.timeNegotiation}
            onClick={() => handleInputChange('timeNegotiation', !formData.timeNegotiation)}
          >
            <span>협의 가능</span>
          </RadioItem>
        </div>
      </div>
    </section>
  );
};

export default function CareRequirements() {
  const { workTypeList } = elderRegiDummy();
  const { formData, handleInputChange, handleTimeChange, isFormValid } = useCareRequireForm();

  return (
    <>
      <WorkTypeSection
        workTypeList={workTypeList}
        formData={formData}
        handleInputChange={handleInputChange}
      />
      <CareDaysSection
        days={DAYS}
        formData={formData}
        handleInputChange={handleInputChange}
        handleTimeChange={handleTimeChange}
      />
      <NextButton disabled={!isFormValid()} />
    </>
  );
}
