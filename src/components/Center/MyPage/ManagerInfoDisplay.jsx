import { Input } from '@/components/ui/custom/input';
import { FormField } from '@/components/ui/custom/FormField';
import { RadioItem } from '@/components/ui/custom/multiRadio';

const inputClassName =
  'rounded-lg h-[4.0625rem] px-5 text-lg font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)] focus:outline-none';

export default function ManagerInfoDisplay({ managerProfile }) {
  const hasProfileImg = managerProfile?.imgSeq !== null;

  return (
    <>
      <FormField label='소속 센터'>
        <Input
          readOnly
          value={managerProfile.centerName}
          className={inputClassName}
          width={'100%'}
        />
      </FormField>

      <FormField label='이름'>
        <Input readOnly value={managerProfile.cmName} className={inputClassName} width={'100%'} />
      </FormField>

      <FormField label='직책'>
        <Input
          readOnly
          value={managerProfile.cmPosition}
          className={inputClassName}
          width={'100%'}
        />
      </FormField>

      <FormField label='프로필 사진 등록'>
        <div className='grid grid-cols-2 gap-2 pointer-events-none'>
          <RadioItem value='1' checked={hasProfileImg}>
            <p className='text-[1.1rem] lg:text-xl'>등록하기</p>
          </RadioItem>
          <RadioItem value='2' checked={!hasProfileImg}>
            <p className='text-[1.1rem] lg:text-xl'>아이콘 대체</p>
          </RadioItem>
        </div>
      </FormField>
    </>
  );
}
