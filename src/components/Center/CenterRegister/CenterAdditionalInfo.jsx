import { useState, useRef, useEffect } from 'react';
import { FormField } from '@/components/ui/custom/FormField';
import { Alert } from '@/components/ui/custom/alert';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/custom/select';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/custom/popover';
import { Calendar } from '@/components/ui/custom/calendar';
import { CenterNextButton } from '@/components/Center/CenterRegister/CenterNextButton';
import { ChevronDownIcon } from 'lucide-react';
import { TextAreaInput } from '@/components/ui/TextAreaInput';
import { useCenterRegiStore } from '@/store/center/useCenterRegiStore';
import { useCenterRegiStepStore } from '@/store/center/useCenterRegiStepStore';

import { useFormValidation } from '@/hooks/useFormValidation';
import { centerAddInfoSchema } from '@/components/Center/CenterRegister/validation/centerAddInfo.schema';

export default function CenterAdditionalInfo() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);
  const inputRefs = useRef({});

  const registerCenter = useCenterRegiStore((s) => s.registerCenter);
  const setAddInfoField = useCenterRegiStore((s) => s.setAddInfoField);

  const activeValidation = useCenterRegiStepStore((s) => s.activeValidation);
  const clearValidationTrigger = useCenterRegiStepStore((s) => s.clearValidationTrigger);

  const formData = registerCenter?.addInfo || {
    grade: '',
    openDate: '',
    introduce: '',
  };

  // form validation for alert display
  const { errors, touched, isValid, onBlur, onChangeValidate, validateAll } = useFormValidation({
    values: formData,
    schema: centerAddInfoSchema,
    fieldRefs: inputRefs,
  });

  // run validation when activeValidation is true
  useEffect(() => {
    if (activeValidation) {
      validateAll();
      clearValidationTrigger();
    }
  }, [activeValidation, validateAll, clearValidationTrigger]);

  const handleDateChange = (date) => {
    setDate(date);
    setOpen(false);

    const isoDate = date.toISOString().split('T')[0];
    setAddInfoField('openDate', isoDate);
    onChangeValidate('openDate', isoDate);
  };

  const updateField = (name, value) => {
    setAddInfoField(name, value);
    onChangeValidate(name, value);
  };

  const inputClass = (fieldName, className = '') => {
    const hasError = errors[fieldName] && touched[fieldName];
    return `rounded-lg h-[4.06rem] font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)] cursor-pointer ${hasError ? 'border-red-500' : ''} ${className}`;
  };

  return (
    <section className='flex flex-col space-y-6 lg:space-y-8'>
      <FormField label='센터 등급' required>
        <Select value={formData.grade} onValueChange={(value) => updateField('grade', value)}>
          <SelectTrigger className={inputClass('grade', 'w-full text-lg')}>
            <SelectValue placeholder='센터 등급을 선택해주세요' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='A'>A등급</SelectItem>
            <SelectItem value='B'>B등급</SelectItem>
            <SelectItem value='C'>C등급</SelectItem>
            <SelectItem value='D'>D등급</SelectItem>
            <SelectItem value='E'>E등급</SelectItem>
          </SelectContent>
        </Select>
        {errors.grade && touched.grade && <Alert description={errors.grade} />}
      </FormField>

      <FormField label='운영기간' required>
        <div className='flex items-center gap-4'>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div
                id='openDate'
                style={{
                  color: date ? 'var(--text)' : 'var(--placeholder-gray)',
                }}
                className={inputClass(
                  'openDate',
                  'w-full flex items-center px-3 justify-between text-lg text-[var(--text)]',
                )}
              >
                {date ? date.toLocaleDateString() : '센터 개소일'}
                <ChevronDownIcon />
              </div>
            </PopoverTrigger>
            <PopoverContent className='w-auto overflow-hidden p-0' align='start'>
              <Calendar
                mode='single'
                selected={date}
                captionLayout='dropdown'
                onSelect={handleDateChange}
              />
            </PopoverContent>
          </Popover>
        </div>
        {errors.openDate && touched.openDate && <Alert description={errors.openDate} />}
      </FormField>

      <FormField label='한 줄 소개' required>
        <TextAreaInput
          placeholder='예) 한 사람, 한 사람의 필요에 맞춰 따뜻하고 세심한 돌봄을 제공하는 센터입니다. (100자 이내)'
          className={inputClass(
            'introduce',
            'h-[10.5rem] focus:outline-none focus:ring-0 focus:border-none text-lg placeholder:text-lg',
          )}
          spellCheck={false}
          maxLength={100}
          value={formData.introduce}
          onChange={(e) => updateField('introduce', e.target.value)}
          onBlur={() => onBlur('introduce')}
          ref={(el) => (inputRefs.current.introduce = el)}
        />
        {errors.introduce && touched.introduce && <Alert description={errors.introduce} />}
      </FormField>

      <span className='text-base font-normal text-[var(--black)]'>
        센터 정보는 마이페이지에서 수정 가능해요
      </span>

      <div className='mb-[1.3rem]'></div>
      <CenterNextButton isValid={isValid} />
    </section>
  );
}
