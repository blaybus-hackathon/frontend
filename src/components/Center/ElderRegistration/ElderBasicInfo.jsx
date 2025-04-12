import NextButton from '@/components/ui/Button/NextButton';
import { Input } from '@/components/ui/custom/input';
import { Button } from '@/components/ui/custom/button';
// Todo : 연결 완료 후 삭제 필요
import elderRegiDummy from '@/store/Paper/elderRegiDummy.js';
import { useElderBasicForm } from '@/hooks/useElderBasicForm';

const FormField = ({ label, required, children }) => (
  <section className='flex justify-start flex-col pb-7'>
    <div className='flex items-center mb-[1.25rem]'>
      <span className='sub-title'>{label}</span>
      {required && <span className='required-text'>필수</span>}
    </div>
    {children}
  </section>
);

const BasicInfoForm = ({ formData, handleInputChange, gender, careLevelList }) => (
  <>
    <FormField label='이름' required>
      <Input
        placeholder={'이름을 입력해주세요'}
        className='rounded-lg h-[4.0625rem] text-lg font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)]'
        maxLength={5}
        width={'100%'}
        value={formData.name || ''}
        onChange={(e) => handleInputChange('name', e.target.value)}
      />
    </FormField>

    <FormField label='성별' required>
      <div className='flex items-center gap-4'>
        {gender?.map((g) => (
          <Button
            key={g.id}
            variant={'outline'}
            onClick={() => handleInputChange('gender', g.careVal)}
            selected={formData.gender === g.careVal}
          >
            {g.careName}
          </Button>
        ))}
      </div>
    </FormField>

    <FormField label='생년월일' required>
      <Input
        type={'text'}
        placeholder={'예) 19400101'}
        className='rounded-lg h-[4.0625rem] text-lg font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)]'
        width={'100%'}
        maxLength={8}
        value={formData.birthDate || ''}
        onChange={(e) => handleInputChange('birthDate', e.target.value.replace(/[^0-9]/g, ''))}
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
          placeholder={'예) 60'}
          className='rounded-lg h-[4.0625rem] text-lg font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)]'
          width={'100%'}
          maxLength={3}
          value={formData.weight || ''}
          onChange={(e) => handleInputChange('weight', e.target.value.replace(/[^0-9]/g, ''))}
        />
        <span>kg</span>
      </div>
    </FormField>

    <FormField label='보유 질병/질환' required>
      <Input
        type={'text'}
        placeholder={'예) 치매'}
        className='rounded-lg h-[4.0625rem] text-lg font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)]'
        width={'100%'}
        spellCheck={false}
        maxLength={50}
        value={formData.disease || ''}
        onChange={(e) => handleInputChange('disease', e.target.value)}
      />
    </FormField>

    <FormField label='장기요양등급' required>
      <div className='grid grid-cols-2 gap-4'>
        {careLevelList?.map((level) => (
          <Button
            key={level.id}
            variant={'outline'}
            onClick={() => handleInputChange('careLevel', level.careVal)}
            selected={formData.careLevel === level.careVal}
            className='w-[100%]'
          >
            {level.careName}
          </Button>
        ))}
      </div>
    </FormField>
  </>
);

export default function ElderBasicInfo() {
  const { gender, careLevelList } = elderRegiDummy();
  const { formData, handleInputChange, isFormValid } = useElderBasicForm();

  return (
    <>
      <BasicInfoForm
        formData={formData}
        handleInputChange={handleInputChange}
        gender={gender}
        careLevelList={careLevelList}
      />
      <NextButton disabled={!isFormValid()} />
    </>
  );
}
