import { useRef, useEffect } from 'react';
import { Input } from '@/components/ui/custom/input';
import { Alert } from '@/components/ui/custom/alert';
import { Button } from '@/components/ui/custom/Button';
import { FormField } from '@/components/ui/custom/FormField';
import { Radio, RadioItem } from '@/components/ui/custom/multiRadio';
import { CenterNextButton } from '@/components/Center/CenterRegister/CenterNextButton';

import { useCenterRegiStore } from '@/store/center/useCenterRegiStore';
import { useCenterRegiStepStore } from '@/store/center/useCenterRegiStepStore';

import { useFormValidation } from '@/hooks/useFormValidation';
import { useAddressSearch } from '@/hooks/useAddressSearch';
import { centerBasicInfoSchema } from '@/components/Center/CenterRegister/validation/centerBasicInfo.schema';

export default function CenterBasicInfo() {
  const detailAddrRef = useRef(null);
  const inputRefs = useRef({});

  const registerCenter = useCenterRegiStore((s) => s.registerCenter);
  const setBasicInfoField = useCenterRegiStore((s) => s.setBasicInfoField);

  const activeValidation = useCenterRegiStepStore((s) => s.activeValidation);
  const clearValidationTrigger = useCenterRegiStepStore((s) => s.clearValidationTrigger);

  const formData = registerCenter?.basicInfo || {
    name: '',
    tel: '',
    carYn: '',
    postcode: '',
    basicAddress: '',
    extraAddress: '',
    detailAddress: '',
  };

  // form validation for alert display
  const { errors, touched, isValid, onBlur, onChangeValidate, validateAll, setTouched } =
    useFormValidation({
      values: formData,
      schema: centerBasicInfoSchema,
      fieldRefs: inputRefs,
    });

  const { handleSearchAddress } = useAddressSearch((addressData) => {
    setBasicInfoField('postcode', addressData.postcode);
    setBasicInfoField('basicAddress', addressData.basicAddress);
    setBasicInfoField('extraAddress', addressData.extraAddress);

    setTouched((prev) => ({
      ...prev,
      postcode: true,
    }));

    onChangeValidate('postcode', addressData.postcode);

    requestAnimationFrame(() => {
      detailAddrRef.current?.focus();
    });
  });

  // run validation when activeValidation is true
  useEffect(() => {
    if (activeValidation) {
      validateAll();
      clearValidationTrigger();
    }
  }, [activeValidation, validateAll, clearValidationTrigger]);

  const updateField = (name, value) => {
    if (name === 'tel') {
      // check if the value includes a hyphen
      if (value.includes('-')) {
        setTouched((prev) => ({ ...prev, tel: true }));
        setBasicInfoField(name, value);
        onChangeValidate(name, value);
        return;
      }

      value = value.replace(/[^0-9]/, '');
    }

    setBasicInfoField(name, value);
    onChangeValidate(name, value);
  };

  const inputClass = (fieldName, className = '') => {
    const hasError = errors[fieldName] && touched[fieldName];
    return `rounded-lg h-[4.0625rem] text-lg font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)] ${hasError ? 'border-red-500' : ''} ${className}`;
  };

  return (
    <section className='flex flex-col space-y-6 lg:space-y-8'>
      <FormField label='센터 이름' required>
        <Input
          placeholder={'이름을 입력해주세요'}
          className={inputClass('name')}
          width={'100%'}
          value={formData.name}
          onChange={(e) => updateField('name', e.target.value)}
          onBlur={() => onBlur('name')}
          ref={(el) => (inputRefs.current.name = el)}
        />
        {errors.name && touched.name && <Alert description={errors.name} />}
      </FormField>

      <FormField label='전화번호' required>
        <Input
          placeholder={'예) 01012345678'}
          className={inputClass('tel')}
          width={'100%'}
          type='text'
          maxLength={11}
          value={formData.tel}
          inputMode='numeric'
          onChange={(e) => updateField('tel', e.target.value)}
          onBlur={() => onBlur('tel')}
          ref={(el) => (inputRefs.current.tel = el)}
        />
        {errors.tel && touched.tel && <Alert description={errors.tel} />}
      </FormField>

      <FormField label='목욕 차량 소유 여부' required>
        <Radio
          cols={2}
          onValueChange={(value) => updateField('carYn', value)}
          value={formData.carYn}
          multiple={false}
        >
          <RadioItem className={inputClass('carYn', 'h-[4.0625rem]')} value='예'>
            예
          </RadioItem>
          <RadioItem className={inputClass('carYn', 'h-[4.0625rem]')} value='아니오'>
            아니오
          </RadioItem>
        </Radio>
        {errors.carYn && touched.carYn && <Alert description={errors.carYn} />}
      </FormField>

      <FormField label='주소' required>
        <div className='flex items-center gap-2 mb-2'>
          <Input
            placeholder={'우편번호'}
            className={inputClass('postcode')}
            readOnly
            width={'35%'}
            value={formData.postcode}
            onChange={(e) => updateField('postcode', e.target.value)}
          />
          <Button onClick={handleSearchAddress} className='w-[35%] lg:w-[20%] text-lg'>
            주소 찾기
          </Button>
        </div>
        {errors.postcode && touched.postcode && (
          <Alert description={errors.postcode} className='mb-2 -mt-2' />
        )}

        <div className='grid grid-cols-1 lg:grid-cols-2 items-center gap-2 mb-2'>
          <Input
            placeholder={'도로명주소'}
            className={inputClass('postcode')}
            width={'100%'}
            value={formData.basicAddress}
            readOnly
            onChange={(e) => updateField('basicAddress', e.target.value)}
          />
          <Input
            placeholder={'참고항목'}
            className={inputClass('postcode')}
            width={'100%'}
            value={formData.extraAddress}
            onChange={(e) => updateField('extraAddress', e.target.value)}
            readOnly
          />
        </div>
        <Input
          placeholder={'상세 주소'}
          className={inputClass('detailAddress')}
          width={'100%'}
          ref={(el) => {
            detailAddrRef.current = el;
            inputRefs.current.detailAddress = el;
          }}
          value={formData.detailAddress}
          onChange={(e) => updateField('detailAddress', e.target.value)}
          onBlur={() => onBlur('detailAddress')}
        />
        {errors.detailAddress && touched.detailAddress && (
          <Alert description={errors.detailAddress} />
        )}
      </FormField>

      <CenterNextButton isValid={isValid} />
    </section>
  );
}
