import { FormField } from '@/components/ui/custom/FormField';
import { Input } from '@/components/ui/custom/input';
import { RadioItem } from '@/components/ui/custom/multiRadio';

export default function MaganerInfoDisplay({ managerProfile }) {
  const profileOptionValue = managerProfile.imgSeq === null ? '2' : '1';

  return (
    <>
      <FormField label='소속 센터'>
        <Input
          readOnly
          value={managerProfile.centerName}
          className='rounded-lg h-[4.0625rem] px-5 text-lg font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)] focus:outline-none'
          width={'100%'}
        />
      </FormField>

      <FormField label='이름'>
        <Input
          readOnly
          value={managerProfile.cmName}
          className='rounded-lg h-[4.0625rem] px-5 text-lg font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)] focus:outline-none'
          width={'100%'}
        />
      </FormField>

      <FormField label='직책'>
        <Input
          readOnly
          value={managerProfile.cmPosition}
          className='rounded-lg h-[4.0625rem] px-5 text-lg font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)] focus:outline-none'
          width={'100%'}
        />
      </FormField>

      <FormField label='프로필 사진 등록'>
        <div className='grid grid-cols-2 gap-2 pointer-events-none'>
          <RadioItem value='1' checked={profileOptionValue === '1'}>
            <p className='text-[1.1rem]'>등록하기</p>
          </RadioItem>
          <RadioItem value='2' checked={profileOptionValue === '2'}>
            <p className='text-[1rem]'>아이콘 대체</p>
          </RadioItem>
        </div>
      </FormField>
    </>
  );
}
