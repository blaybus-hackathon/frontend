import NextButton from '@/components/ui/custom/Button/NextButton';
import { Button } from '@/components/ui/custom/Button';
import { Radio, RadioItem } from '@/components/ui/custom/multiRadio';
import { useElderAddForm } from '@/hooks/center/service/useElderAddForm';
import elderRegiDummy from '@/store/jpaper/elderRegiDummy.js';

const FormField = ({ label, required, children, isMultiple }) => (
  <section className='mb-10'>
    <div className='flex items-center mb-[1.12rem]'>
      <span className='sub-title'>{label}</span>
      <span className='single-select'>{isMultiple ? '(복수선택가능)' : '(단일선택)'}</span>
      {required && <span className='required-text'>필수</span>}
    </div>
    {children}
  </section>
);

const DementiaSymptomSection = ({ dementiaSymptomList, formData, handleInputChange }) => (
  <FormField label='치매 증상' required isMultiple={true}>
    <div className='grid grid-cols-2 gap-[1.12rem]'>
      {dementiaSymptomList.map((symptom) => (
        <Button
          key={symptom.id}
          variant='outline'
          className='w-full h-[4.0625rem] text-lg sm:text-lg lg:text-xl text-center whitespace-normal break-words'
          selected={formData.selectedDementiaSymptoms?.includes(symptom.careVal)}
          onClick={() => {
            handleInputChange('dementiaSymptom', symptom.careVal);
          }}
        >
          {symptom.careName}
        </Button>
      ))}
    </div>
  </FormField>
);

const InmateStateSection = ({ inmateStateList, formData, handleInputChange }) => (
  <FormField label='동거인 여부' required isMultiple={false}>
    <Radio
      value={formData.inmateState}
      onValueChange={(value) => {
        handleInputChange('inmateState', value);
      }}
    >
      {inmateStateList.map((state) => (
        <RadioItem
          key={state.id}
          value={state.careVal}
          className='[&>div]:text-xl [&>div]:items-center [&>div]:text-start [&>div]:sm:text-lg [&>div]:lg:text-xl [&>div]:whitespace-normal'
        >
          {state.careName}
        </RadioItem>
      ))}
    </Radio>
  </FormField>
);

export default function ElderAdditionalInfo() {
  const { dementiaSymptomList, inmateStateList } = elderRegiDummy();
  const { formData, handleInputChange, isFormValid } = useElderAddForm();

  return (
    <>
      <DementiaSymptomSection
        dementiaSymptomList={dementiaSymptomList}
        formData={formData}
        handleInputChange={handleInputChange}
      />
      <InmateStateSection
        inmateStateList={inmateStateList}
        formData={formData}
        handleInputChange={handleInputChange}
      />
      <NextButton disabled={!isFormValid()} />
    </>
  );
}
