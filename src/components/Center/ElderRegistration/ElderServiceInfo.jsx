import { useEffect, useRef, useCallback, useMemo } from 'react';
import { Alert } from '@/components/ui/custom/alert';
import { Button } from '@/components/ui/custom/Button';
import { FormField } from '@/components/ui/custom/FormField';
import { Radio, RadioItem } from '@/components/ui/custom/multiRadio';
import { ElderNextButton } from '@/components/Center/ElderRegistration/ElderNextButton';

import { useElderRegiStore } from '@/store/center/useElderRegiStore';
import { useElderRegiStepStore } from '@/store/center/useElderRegiStepStore';

import { useFormValidation } from '@/hooks/useFormValidation';
import { elderServiceInfoSchema } from '@/components/Center/ElderRegistration/validation';
import { ProfileImageUploader } from '@/components/common/ProfileImageUploader';

export default function ElderServiceInfo({ formOptions }) {
  const inputRefs = useRef({});

  const registerElder = useElderRegiStore((s) => s.registerElder);
  const setServiceInfoField = useElderRegiStore((s) => s.setServiceInfoField);

  const setPatientImage = useElderRegiStore((s) => s.setPatientImage);
  const selectedImage = useElderRegiStore((s) => s.selectedImg);
  const setSelectedImage = useElderRegiStore((s) => s.setSelectedImage);
  const profileOption = useElderRegiStore((s) => s.registerElder.profileOption);
  const setProfileOption = useElderRegiStore((s) => s.setProfileOption);

  const activeValidation = useElderRegiStepStore((s) => s.activeValidation);
  const clearValidationTrigger = useElderRegiStepStore((s) => s.clearValidationTrigger);

  const formData = useMemo(
    () => ({
      ...(registerElder?.serviceInfo || {
        serviceMeal: null,
        serviceToilet: null,
        serviceMobility: null,
        serviceDaily: null,
        selectedServiceMealList: [],
        selectedServiceToiletList: [],
        selectedServiceMobilityList: [],
        selectedServiceDailyList: [],
      }),
      profileOption: profileOption,
      patientImage: registerElder?.patientImage || null,
    }),
    [registerElder?.serviceInfo, profileOption, registerElder?.patientImage],
  );

  // form validation for alert display
  const { errors, touched, isValid, onBlur, onChangeValidate, validateAll } = useFormValidation({
    values: formData,
    schema: elderServiceInfoSchema,
    fieldRefs: inputRefs,
  });

  // check all the fields
  useEffect(() => {
    if (activeValidation) {
      validateAll();
      clearValidationTrigger();
    }
  }, [activeValidation, validateAll, clearValidationTrigger]);

  const updateMultiSelect = useCallback(
    (category, careVal) => {
      const listKey = `selected${category.charAt(0).toUpperCase() + category.slice(1)}List`;
      const fieldKey = category;

      const selectedList = formData[listKey] || [];
      const updatedList = selectedList.includes(careVal)
        ? selectedList.filter((v) => v !== careVal)
        : [...selectedList, careVal];

      const sum = updatedList.reduce((acc, cur) => acc + Number(cur), 0);

      setServiceInfoField({
        [listKey]: updatedList,
        [fieldKey]: sum,
      });
      onChangeValidate(fieldKey, sum);
    },
    [formData, setServiceInfoField, onChangeValidate],
  );

  const handleProfileOptionChange = (value) => {
    const valueAsString = String(value);
    setProfileOption(valueAsString);
    onChangeValidate('profileOption', valueAsString);

    if (valueAsString === '2') {
      setSelectedImage(null);
      setPatientImage(null);
      onChangeValidate('patientImage', null);
    }
  };

  const handleImageUpload = (imageFile) => {
    setSelectedImage(imageFile);
    setPatientImage(imageFile);
    onChangeValidate('patientImage', imageFile);
  };

  const buttonClassName = (fieldName, className = '') => {
    const hasError = errors[fieldName] && touched[fieldName];
    return `w-full h-[4.0625rem] py-1 px-3 ${hasError ? 'border-red-500' : ''} ${className}`;
  };

  const spanClassName =
    'text-center break-normal whitespace-pre-wrap leading-snug text-lg lg:text-xl';

  console.log(formData);

  return (
    <article className='flex flex-col space-y-6 lg:space-y-8'>
      <FormField label='식사 보조' required isMultiple={true}>
        <div className='grid grid-cols-2 gap-4'>
          {formOptions.serviceMealList.map((meal) => (
            <Button
              key={meal.id}
              variant='outline'
              className={buttonClassName('serviceMeal')}
              onBlur={() => onBlur('serviceMeal')}
              selected={formData.selectedServiceMealList?.includes(meal.careVal)}
              onClick={() => updateMultiSelect('serviceMeal', meal.careVal)}
              ref={(el) => (inputRefs.current.serviceMeal = el)}
            >
              <span className={spanClassName}>{meal.careName}</span>
            </Button>
          ))}
        </div>
        {errors.serviceMeal && touched.serviceMeal && <Alert description={errors.serviceMeal} />}
      </FormField>

      <FormField label='배변 보조' required isMultiple={true}>
        <div className='grid grid-cols-2 gap-4'>
          {formOptions.serviceToiletList.map((toilet) => (
            <Button
              key={toilet.id}
              variant='outline'
              className={buttonClassName('serviceToilet')}
              onBlur={() => onBlur('serviceToilet')}
              selected={formData.selectedServiceToiletList?.includes(toilet.careVal)}
              onClick={() => updateMultiSelect('serviceToilet', toilet.careVal)}
              ref={(el) => (inputRefs.current.serviceToilet = el)}
            >
              <span className={spanClassName}>{toilet.careName}</span>
            </Button>
          ))}
        </div>
        {errors.serviceToilet && touched.serviceToilet && (
          <Alert description={errors.serviceToilet} />
        )}
      </FormField>

      <FormField label='이동 보조' required isMultiple={true}>
        <div className='grid grid-cols-2 gap-4'>
          {formOptions.serviceMobilityList.map((mobility) => (
            <Button
              key={mobility.id}
              variant='outline'
              className={buttonClassName('serviceMobility')}
              onBlur={() => onBlur('serviceMobility')}
              selected={formData.selectedServiceMobilityList?.includes(mobility.careVal)}
              onClick={() => updateMultiSelect('serviceMobility', mobility.careVal)}
              ref={(el) => (inputRefs.current.serviceMobility = el)}
            >
              <span className={spanClassName}>{mobility.careName}</span>
            </Button>
          ))}
        </div>
        {errors.serviceMobility && touched.serviceMobility && (
          <Alert description={errors.serviceMobility} />
        )}
      </FormField>

      <FormField label='일상 생활' required isMultiple={true}>
        <div className='grid grid-cols-2 gap-4'>
          {formOptions.serviceDailyList.map((daily) => (
            <Button
              key={daily.id}
              variant='outline'
              className={buttonClassName('serviceDaily')}
              onBlur={() => onBlur('serviceDaily')}
              selected={formData.selectedServiceDailyList?.includes(daily.careVal)}
              onClick={() => updateMultiSelect('serviceDaily', daily.careVal)}
              ref={(el) => (inputRefs.current.serviceDaily = el)}
            >
              <span className={spanClassName}>{daily.careName}</span>
            </Button>
          ))}
        </div>
        {errors.serviceDaily && touched.serviceDaily && <Alert description={errors.serviceDaily} />}
      </FormField>

      <FormField label='어르신 프로필 사진 등록'>
        <Radio
          value={profileOption}
          onValueChange={handleProfileOptionChange}
          cols={2}
          className='gap-2'
        >
          <RadioItem value='1'>
            <p className='text-[1.1rem] lg:text-xl'>등록하기</p>
          </RadioItem>
          <RadioItem value='2'>
            <p className='text-[1.1rem] lg:text-xl'>아이콘 대체</p>
          </RadioItem>
        </Radio>
        {errors.profileOption && touched.profileOption && (
          <Alert description={errors.profileOption} />
        )}

        {profileOption === '1' && (
          <ProfileImageUploader
            profileOption={profileOption}
            selectedImage={selectedImage}
            onImageSelect={handleImageUpload}
          />
        )}
      </FormField>

      <ElderNextButton isValid={isValid} />
    </article>
  );
}
