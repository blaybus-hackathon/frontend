import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/custom/input';
import { Alert } from '@/components/ui/custom/alert';
import { FormField } from '@/components/ui/custom/FormField';
import { Radio, RadioItem } from '@/components/ui/custom/multiRadio';
import { SignUpButton } from '@/components/Auth/SignUp/center/SignUpButton';
import { ProfileImageUploader } from '@/components/common/ProfileImageUploader';

import { useSignUpStore } from '@/store/auth/center/useSignUpStore';
import { useSignUpStepStore } from '@/store/auth/center/useSignUpStepStore';

import { personalInfoSchema } from '@/components/Auth/SignUp/center/validation';
import { useFormValidation } from '@/hooks/useFormValidation';

export default function PersonalInfo() {
  const navigate = useNavigate();
  const inputRefs = useRef({});

  // store: sign up form
  const signUpForm = useSignUpStore((s) => s.signUpForm);
  const setPersonalInfoField = useSignUpStore((s) => s.setPersonalInfoField);

  // store: sign up step
  const activeValidation = useSignUpStepStore((s) => s.activeValidation);
  const clearValidationTrigger = useSignUpStepStore((s) => s.clearValidationTrigger);

  // set default form data
  const formData = signUpForm?.personalInfo || {
    centerName: '',
    name: '',
    position: '',
    centerSeq: '',
    profileOption: null,
    photoFile: null,
    imgChangeYn: false,
  };

  // handle profile image option change
  const handleProfileOptionChange = (value) => {
    setPersonalInfoField('profileOption', value);
    setPersonalInfoField('imgChangeYn', true);

    // if profile opt changed to '2', remove img
    if (value === '2' && formData.photoFile) {
      if (formData.photoFile instanceof File) {
        URL.revokeObjectURL(URL.createObjectURL(formData.photoFile));
      }
      setPersonalInfoField('photoFile', null);
    }

    setFieldError('profileOption', '');
    resetTouched();

    // run validation immediately
    setTimeout(() => {
      validateAll({ focus: false, touch: false });
    }, 0);
  };

  // custom form validation hook
  const {
    errors,
    touched,
    onBlur,
    onChangeValidate,
    validateAll,
    isValid,
    resetTouched,
    setFieldError,
  } = useFormValidation({
    values: formData,
    schema: personalInfoSchema,
    fieldRefs: inputRefs,
  });

  // run validation when activeValidation is true
  useEffect(() => {
    if (activeValidation) {
      validateAll();
      clearValidationTrigger();
    }
  }, [activeValidation, validateAll, clearValidationTrigger]);

  const updateField = (name, value) => {
    setPersonalInfoField(name, value);
    onChangeValidate(name, value);
  };

  const inputClass = (fieldName, className = '') => {
    return `rounded-lg h-[4.0625rem] text-lg font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)] cursor-pointer ${className}`;
  };

  return (
    <section className='flex flex-col space-y-6 lg:space-y-8 mb-[0.56rem]'>
      <FormField label='소속 센터' required>
        <div
          className='flex items-center relative'
          onClick={() => {
            setPersonalInfoField('centerSeq', formData.centerSeq);
            setPersonalInfoField('centerName', formData.centerName);
            navigate('/search-center');
          }}
        >
          <input
            readOnly
            value={formData.centerName}
            type='text'
            placeholder='센터 검색'
            className='w-full border-b-[var(--main)] border-b-2 pb-[0.88rem] outline-none text-[var(--text)] pl-2 cursor-pointer'
          />
          <Search className='absolute strple right-4 top-0 text-[var(--main)]' strokeWidth={3} />
        </div>
        {errors.centerName && touched.centerName && <Alert description={errors.centerName} />}
      </FormField>

      <FormField label='이름' required>
        <Input
          placeholder={'예) 홍길동'}
          value={formData.name}
          onChange={(e) => updateField('name', e.target.value)}
          onBlur={() => {
            onBlur('name');
            validateAll({ focus: false });
          }}
          ref={(el) => (inputRefs.current.name = el)}
          className={inputClass('name')}
        />
        {errors.name && touched.name && <Alert description={errors.name} />}
      </FormField>

      <FormField label='직급' required>
        <Input
          placeholder={'예) 주임'}
          type='text'
          value={formData.position}
          onChange={(e) => updateField('position', e.target.value)}
          onBlur={() => {
            onBlur('position');
          }}
          ref={(el) => (inputRefs.current.position = el)}
          className={inputClass('position')}
        />
        {errors.position && touched.position && <Alert description={errors.position} />}
      </FormField>

      <FormField label='프로필 사진 등록'>
        <Radio
          value={formData.profileOption}
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

        {formData.profileOption === '1' && (
          <ProfileImageUploader
            profileOption={formData.profileOption}
            selectedImage={formData.photoFile}
            onImageSelect={(file) => {
              updateField('photoFile', file);
              updateField('imgChangeYn', true);
            }}
          />
        )}
      </FormField>

      <SignUpButton isValid={isValid} />
    </section>
  );
}
