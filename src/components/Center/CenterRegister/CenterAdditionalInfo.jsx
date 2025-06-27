import { useState } from 'react';
import { FormField } from '@/components/ui/custom/FormField';
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

export default function CenterAdditionalInfo() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(null);
  const centerForm = useCenterRegiStore((s) => s.registerCenter);
  const setAddInfoField = useCenterRegiStore((s) => s.setAddInfoField);

  const handleDateChange = (date) => {
    setDate(date);
    setOpen(false);

    const isoDate = date.toISOString().split('T')[0];
    setAddInfoField('openDate', isoDate);
  };

  return (
    <>
      <FormField label='센터 등급' required>
        <Select
          value={centerForm.addInfo.grade}
          onValueChange={(value) => setAddInfoField('grade', value)}
        >
          <SelectTrigger className='w-full h-[4.06rem] px-5 text-xl font-normal text-[var(--text)]'>
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
      </FormField>

      <FormField label='운영기간' required>
        <div className='flex items-center gap-4'>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div
                id='date'
                className='w-full justify-between font-normal h-[4.06rem] px-4 text-xl text-[var(--text)] border border-[var(--outline)] rounded-lg flex items-center cursor-pointer'
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
      </FormField>

      <FormField label='한 줄 소개' required>
        <TextAreaInput
          placeholder='예) 한 사람, 한 사람의 필요에 맞춰 따뜻하고 세심한 돌봄을 제공하는 센터입니다. (100자 이내)'
          className='h-[10.5rem] text-[var(--text)] text-xl font-normal placeholder:text-[var(--placeholder-gray)] placeholder:text-xl placeholder:select-none flex items-center justify-center'
          spellCheck={false}
          maxLength={100}
          value={centerForm.addInfo.introduce}
          onChange={(e) => setAddInfoField('introduce', e.target.value)}
        />
      </FormField>

      <span className='text-base font-normal text-[var(--black)]'>
        센터 정보는 마이페이지에서 수정 가능해요
      </span>

      <div className='mb-[1.3rem]'></div>
      <CenterNextButton />
    </>
  );
}
