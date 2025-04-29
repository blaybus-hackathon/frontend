import { useCallback } from 'react';
import { Input } from '@/components/ui/custom/input';
import { Button } from '@/components/ui/custom/Button';
import { FormField } from '@/components/ui/custom/FormField';
import { useElderRegiStore } from '@/store/center/useElderRegiStore';
import { ElderNextButton } from '@/components/Center/ElderRegistration/Button/ElderNextButton';

export default function ElderBasicInfo({ formOptions }) {
  const basicInfo = useElderRegiStore((s) => s.registerElder.basicInfo);
  const setBasicInfo = useElderRegiStore((s) => s.setBasicInfo);

  const updateField = useCallback(
    (field, value) => {
      setBasicInfo({
        ...basicInfo,
        [field]: value,
      });
    },
    [basicInfo, setBasicInfo],
  );

  return (
    // TODO: 추후 Layout 생성 시 디자인 적용 필요
    <div className='w-[88%] mx-auto'>
      <FormField label='이름' required>
        <Input
          placeholder={'이름을 입력해주세요'}
          className='rounded-lg h-[4.0625rem] text-lg font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)]'
          maxLength={5}
          width={'100%'}
          value={basicInfo.name}
          onChange={(e) => updateField('name', e.target.value)}
        />
      </FormField>

      <FormField label='성별' required>
        <div className='flex items-center gap-4'>
          {formOptions.genderList.map((g) => (
            <Button
              key={g.id}
              variant={'outline'}
              selected={basicInfo.gender === g.careVal}
              onClick={() => updateField('gender', g.careVal)}
            >
              {g.careName}
            </Button>
          ))}
        </div>
      </FormField>

      <FormField label='생년월일' required>
        <Input
          type={'text'}
          inputMode={'numeric'}
          placeholder={'예) 19400101'}
          className='rounded-lg h-[4.0625rem] text-lg font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)]'
          width={'100%'}
          maxLength={8}
          value={basicInfo.birthDate}
          onChange={(e) => updateField('birthDate', e.target.value.replace(/[^0-9]/g, ''))}
        />
      </FormField>

      {/* TODO: 주소지 추가 기능 구현 필요 */}
      <FormField label='주소지' required>
        <div className='flex items-center gap-4'>
          <Input
            type={'text'}
            placeholder={'주소지 등록하러 가기'}
            className='rounded-lg h-[4.0625rem] text-lg font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)]'
            width={'100%'}
          />
        </div>
      </FormField>

      <FormField label='몸무게' required>
        <div className='flex items-center gap-4'>
          <Input
            type={'text'}
            inputMode={'decimal'}
            placeholder={'예) 60'}
            className='rounded-lg h-[4.0625rem] text-lg font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)]'
            width={'100%'}
            maxLength={5}
            value={basicInfo.weight}
            onChange={(e) => {
              const onlyNumber = e.target.value.replace(/[^0-9]/g, '');
              updateField('weight', onlyNumber);
            }}
          />
          <span>kg</span>
        </div>
      </FormField>

      <FormField label='보유 질병/질환' required>
        <Input
          type={'text'}
          inputMode={'decimal'}
          placeholder={'예) 치매'}
          className='rounded-lg h-[4.0625rem] text-lg font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)]'
          width={'100%'}
          spellCheck={false}
          maxLength={50}
          value={basicInfo.disease}
          onChange={(e) => updateField('disease', e.target.value)}
        />
      </FormField>

      <FormField label='장기요양등급' required>
        <div className='grid grid-cols-2 gap-4'>
          {formOptions.careLevelList.map((level) => (
            <Button
              key={level.id}
              variant={'outline'}
              onClick={() => updateField('careLevel', level.careVal)}
              selected={basicInfo.careLevel === level.careVal}
              className='w-[100%]'
            >
              {level.careName}
            </Button>
          ))}
        </div>
      </FormField>

      <ElderNextButton />
    </div>
  );
}
