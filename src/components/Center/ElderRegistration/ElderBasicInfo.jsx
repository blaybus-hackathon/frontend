import { useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/custom/input';
import { Alert } from '@/components/ui/custom/alert';
import { Button } from '@/components/ui/custom/Button';
import { FormField } from '@/components/ui/custom/FormField';
import { ElderNextButton } from '@/components/Center/ElderRegistration/ElderNextButton';

import { useElderRegiStore } from '@/store/center/useElderRegiStore';
import { useElderRegiStepStore } from '@/store/center/useElderRegiStepStore';

import { useFormValidation } from '@/hooks/useFormValidation';
import { elderBasicInfoSchema } from '@/components/Center/ElderRegistration/validation';

export default function ElderBasicInfo({ formOptions }) {
  const navigate = useNavigate();
  const inputRefs = useRef({});

  const registerElder = useElderRegiStore((s) => s.registerElder);
  const setBasicInfoField = useElderRegiStore((s) => s.setBasicInfoField);

  const activeValidation = useElderRegiStepStore((s) => s.activeValidation);
  const clearValidationTrigger = useElderRegiStepStore((s) => s.clearValidationTrigger);

  const formData = useMemo(
    () => ({
      name: registerElder?.basicInfo?.name || '',
      gender: registerElder?.basicInfo?.gender || null,
      birthDate: registerElder?.basicInfo?.birthDate || '',
      afSeq: registerElder?.basicInfo?.afSeq || null,
      asSeq: registerElder?.basicInfo?.asSeq || null,
      atSeq: registerElder?.basicInfo?.atSeq || null,
      weight: registerElder?.basicInfo?.weight || '',
      diseases: registerElder?.basicInfo?.diseases || '',
      careLevel: registerElder?.basicInfo?.careLevel || null,
      addressLabel: registerElder?.basicInfo?.addressLabel || '',
    }),
    [registerElder?.basicInfo],
  );

  // form validation for alert display
  const { errors, touched, isValid, onBlur, onChangeValidate, validateAll } = useFormValidation({
    values: formData,
    schema: elderBasicInfoSchema,
    fieldRefs: inputRefs,
  });

  // check all the fields
  useEffect(() => {
    if (activeValidation) {
      validateAll();
      clearValidationTrigger();
    }
  }, [activeValidation, validateAll, clearValidationTrigger]);

  const updateField = useCallback(
    (field, value) => {
      setBasicInfoField(field, value);
      onChangeValidate(field, value);
    },
    [setBasicInfoField, onChangeValidate],
  );

  const handleWeightInput = useCallback(
    (e) => {
      const raw = e.target.value;
      const filtered = raw.replace(/[^0-9.]/g, '');

      // prevent multiple dots
      if ((filtered.match(/\./g) || []).length > 1) return;

      const [i, d] = filtered.split('.');
      let safe;

      if (d !== undefined) {
        // has decimal point
        safe = `${i}.${d.slice(0, 2)}`; // limit two decimal places
      } else {
        // no decimal point
        safe = i;
      }

      updateField('weight', safe);
    },
    [updateField],
  );

  const inputClass = (fieldName, className = '') => {
    const hasError = errors[fieldName] && touched[fieldName];
    return `rounded-lg h-[4.0625rem] text-lg font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)] ${hasError ? 'border-red-500' : ''} ${className}`;
  };

  return (
    <article className='flex flex-col space-y-6 lg:space-y-8'>
      <FormField label='이름' required>
        <Input
          placeholder={'이름을 입력해주세요'}
          className={inputClass('name')}
          maxLength={5}
          width={'100%'}
          value={formData.name}
          onChange={(e) => updateField('name', e.target.value)}
          onBlur={() => onBlur('name')}
          ref={(el) => (inputRefs.current.name = el)}
        />
        {errors.name && touched.name && <Alert description={errors.name} />}
      </FormField>

      <FormField label='성별' required>
        <div className='flex items-center gap-4'>
          {formOptions.genderList.map((g) => (
            <Button
              key={g.id}
              variant={'outline'}
              selected={formData.gender === g.careVal}
              onClick={() => updateField('gender', g.careVal)}
              onBlur={() => onBlur('gender')}
              ref={(el) => (inputRefs.current.gender = el)}
              className={`${errors.gender && touched.gender ? 'border-red-500' : ''}`}
            >
              {g.careName}
            </Button>
          ))}
        </div>
        {errors.gender && touched.gender && <Alert description={errors.gender} />}
      </FormField>

      <FormField label='생년월일' required>
        <Input
          type={'text'}
          inputMode={'numeric'}
          placeholder={'예) 19400101'}
          className={inputClass('birthDate')}
          width={'100%'}
          maxLength={8}
          value={formData.birthDate}
          onChange={(e) => updateField('birthDate', e.target.value.replace(/[^0-9]/g, ''))}
          onBlur={() => onBlur('birthDate')}
          ref={(el) => (inputRefs.current.birthDate = el)}
        />
        {errors.birthDate && touched.birthDate && <Alert description={errors.birthDate} />}
      </FormField>

      <FormField label='주소지' required>
        <Button
          variant={'outline'}
          className={`${inputClass('addressLabel')} flex justify-start items-center px-3 py-2 w-full hover:bg-transparent hover:text-[var(--button-black)] active:bg-transparent`}
          value={formData.addressLabel || ''}
          onClick={() => navigate('/center/address')}
          onBlur={() => onBlur('addressLabel')}
          ref={(el) => (inputRefs.current.addressLabel = el)}
        >
          <p
            className={`${
              !formData.addressLabel || formData.addressLabel.length === 0
                ? 'text-lg font-normal text-[var(--placeholder-gray)]'
                : 'text-lg font-normal text-[var(--button-black)]'
            }`}
          >
            {!formData.addressLabel || formData.addressLabel.length === 0
              ? '주소지 등록하러 가기'
              : formData.addressLabel}
          </p>
        </Button>
        {errors.addressLabel && touched.addressLabel && <Alert description={errors.addressLabel} />}
      </FormField>

      <FormField label='몸무게' required>
        <div className='flex items-center gap-4'>
          <Input
            type={'text'}
            inputMode={'decimal'}
            placeholder={'예) 60.5'}
            className={inputClass('weight')}
            width={'100%'}
            maxLength={6}
            value={formData.weight}
            onChange={handleWeightInput}
            onBlur={() => onBlur('weight')}
            ref={(el) => (inputRefs.current.weight = el)}
          />
          <span>kg</span>
        </div>
        {errors.weight && touched.weight && <Alert description={errors.weight} />}
      </FormField>

      <FormField label='보유 질병/질환' required>
        <Input
          type={'text'}
          inputMode={'decimal'}
          placeholder={'예) 치매'}
          className={inputClass('diseases')}
          width={'100%'}
          spellCheck={false}
          maxLength={50}
          value={formData.diseases}
          onChange={(e) => updateField('diseases', e.target.value)}
          onBlur={() => onBlur('diseases')}
          ref={(el) => (inputRefs.current.diseases = el)}
        />
        {errors.diseases && touched.diseases && <Alert description={errors.diseases} />}
      </FormField>

      <FormField label='장기요양등급' required>
        <div className='grid grid-cols-2 gap-4'>
          {formOptions.careLevelList.map((level) => (
            <Button
              key={level.id}
              variant={'outline'}
              selected={formData.careLevel === level.careVal}
              onClick={() => updateField('careLevel', level.careVal)}
              onBlur={() => onBlur('careLevel')}
              ref={(el) => (inputRefs.current.careLevel = el)}
              className={`w-full ${errors.careLevel && touched.careLevel ? 'border-red-500' : ''}`}
            >
              {level.careName}
            </Button>
          ))}
        </div>
        {errors.careLevel && touched.careLevel && <Alert description={errors.careLevel} />}
      </FormField>

      <ElderNextButton isValid={isValid} />
    </article>
  );
}
