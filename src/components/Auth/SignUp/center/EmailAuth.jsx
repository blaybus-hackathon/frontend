import { useRef, useEffect } from 'react';
import { Input } from '@/components/ui/custom/input';
import { Alert } from '@/components/ui/custom/alert';
import { Button } from '@/components/ui/custom/Button';
import { ButtonLoader } from '@/components/ui/custom/ButtonLoader';
import { FormField } from '@/components/ui/custom/FormField';
import { SignUpButton } from '@/components/Auth/SignUp/center/SignUpButton';
import { handleApiError } from '@/utils/handleApiError';

import { useSignUpStore } from '@/store/auth/center/useSignUpStore';
import { useSignUpStepStore } from '@/store/auth/center/useSignUpStepStore';

import { emailAuthSchema } from '@/components/Auth/SignUp/center/validation';
import { useFormValidation } from '@/hooks/useFormValidation';
import { useEmailAuthMutation } from '@/hooks/auth/useEmailAuth';

export default function EmailAuth() {
  const inputRefs = useRef({});

  // store: sign up form
  const signUpForm = useSignUpStore((s) => s.signUpForm);
  const setEmailAuthField = useSignUpStore((s) => s.setEmailAuthField);

  // store: sign up step
  const activeValidation = useSignUpStepStore((s) => s.activeValidation);
  const clearValidationTrigger = useSignUpStepStore((s) => s.clearValidationTrigger);

  // set default form data
  const formData = signUpForm?.emailAuth || {
    email: '',
    emailCode: '',
    isVerified: false,
    mailSeq: '',
    password: '',
    passwordConfirm: '',
    passwordCheck: false,
  };

  // custom form validation hook
  const {
    errors,
    touched,
    isValid,
    onBlur,
    onChangeValidate,
    validateAll,
    setFieldError,
    getFieldError,
  } = useFormValidation({
    values: formData,
    schema: emailAuthSchema,
    fieldRefs: inputRefs,
  });

  // email auth api call hooks
  const { sendEmail, verifyEmail, sendEmailStatus, verifyEmailStatus } = useEmailAuthMutation();

  const isEmailSent = !!formData.mailSeq;

  // send email auth code
  const handleSendEmailAuth = async () => {
    const emailMsg = getFieldError('email', formData.email, formData);
    if (emailMsg) {
      setFieldError('email', emailMsg);
      return;
    }

    // if email is already verified, return
    if (formData.isVerified) return;

    try {
      const mailSeq = await sendEmail(formData.email);
      setEmailAuthField('mailSeq', mailSeq);
      setTimeout(() => inputRefs.current.emailCode?.focus(), 0);
      setFieldError('email', '');
    } catch (error) {
      handleApiError(
        error,
        '이메일 발송에 실패하였습니다. 잠시 후 다시 시도해주세요.',
        true,
        false,
      );
    }
  };

  // verify email auth code
  const handleVerifyEmail = async () => {
    const codeMsg = getFieldError('emailCode', formData.emailCode, formData);
    if (codeMsg) {
      setFieldError('emailCode', codeMsg);
      setFieldError('email', '');
      return;
    }

    try {
      const verified = await verifyEmail({
        mailSeq: formData.mailSeq,
        email: formData.email,
        code: formData.emailCode,
      });

      if (verified) {
        setEmailAuthField('isVerified', true);
        setFieldError('email', '');
        setFieldError('emailCode', '');
      }
    } catch (error) {
      handleApiError(
        error,
        { 4001: '인증번호가 일치하지 않습니다.', 4002: '인증 시간이 초과되었습니다.' },
        '이메일 인증에 실패하였습니다. 인증번호를 확인해주세요.',
        true,
        false,
      );
    }
  };

  // mark pass confirm check on blur
  const onBlurPasswordConfirm = () => {
    setEmailAuthField('passwordCheck', true);
    onBlur('passwordConfirm');
  };

  // handle forced validation trigger from step store
  // if user clicks next button, validate all fields
  useEffect(() => {
    if (activeValidation) {
      validateAll();
      clearValidationTrigger();
    }
  }, [activeValidation, validateAll, clearValidationTrigger]);

  // check password confirm
  useEffect(() => {
    if (!formData.passwordCheck) return;

    if (
      formData.password &&
      formData.passwordConfirm &&
      formData.password !== formData.passwordConfirm
    ) {
      setFieldError('passwordConfirm', '비밀번호가 일치하지 않습니다.');
    } else {
      setFieldError('passwordConfirm', '');
    }
  }, [formData.password, formData.passwordConfirm, formData.passwordCheck, setFieldError]);

  const updateField = (name, value) => {
    setEmailAuthField(name, value);

    if (name !== 'email') onChangeValidate(name, value);

    if (formData.passwordCheck && (name === 'password' || name === 'passwordConfirm')) {
      validateAll({ focus: false, touch: false });
    }
  };

  const inputClass = (fieldName, className = '') => {
    const hasError = errors[fieldName] && touched[fieldName];
    return `rounded-lg h-[4.0625rem] font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)] ${hasError ? 'border-red-500' : ''} ${className}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle other submit logic in SignUpButton
  };

  return (
    <form
      id='email-auth-form'
      onSubmit={handleSubmit}
      className='flex flex-col mb-[0.56rem] space-y-6 lg:space-y-8'
      autoComplete='on'
      noValidate
    >
      <FormField label='이메일 입력' required contentClassName='flex flex-col gap-2 lg:gap-4'>
        <div className='flex justify-between items-center gap-2'>
          <Input
            placeholder='이메일을 입력해주세요.'
            className={inputClass('email', 'text-base')}
            type='email'
            value={formData.email}
            onChange={(e) => {
              updateField('email', e.target.value);
            }}
            onBlur={() => onBlur('email')}
            ref={(el) => (inputRefs.current.email = el)}
            autoComplete='email'
            disabled={formData.isVerified}
          />
          <Button
            type='button'
            onClick={handleSendEmailAuth}
            disabled={!formData.email || formData.isVerified || sendEmailStatus.isPending}
            className='w-[38%] text-base font-normal px-2 text-white rounded-lg h-[4.0625rem]'
          >
            {sendEmailStatus.isPending ? (
              <ButtonLoader text='발송중' className='text-white' />
            ) : formData.isVerified ? (
              '인증완료'
            ) : isEmailSent ? (
              '인증번호 재발송'
            ) : (
              '인증번호 발송'
            )}
          </Button>
        </div>

        <div className='flex justify-between items-center gap-2 mt-2'>
          <Input
            ref={(el) => (inputRefs.current.emailCode = el)}
            placeholder='인증번호를 입력해주세요.'
            disabled={formData.isVerified}
            value={formData.emailCode}
            onChange={(e) => updateField('emailCode', e.target.value)}
            onBlur={() => onBlur('emailCode')}
            autoComplete='off'
            className={inputClass('emailCode', 'text-base')}
          />
          <Button
            type='button'
            onClick={handleVerifyEmail}
            disabled={!formData.emailCode || formData.isVerified || verifyEmailStatus.isPending}
            className='w-[38%] text-base font-normal px-6 text-white rounded-lg h-[4.0625rem]'
          >
            {verifyEmailStatus.isPending ? (
              <ButtonLoader text='인증중' className='text-white' />
            ) : formData.isVerified ? (
              '인증완료'
            ) : (
              '인증하기'
            )}
          </Button>
        </div>
        {(errors.email || errors.emailCode) &&
          (touched.email || touched.emailCode) &&
          !formData.isVerified && (
            <Alert description={errors.email || errors.emailCode} className='-mt-2 lg:-mt-4' />
          )}
      </FormField>
      <FormField label='비밀번호 입력' required>
        <Input
          placeholder='비밀번호를 입력해주세요.'
          type='password'
          value={formData.password}
          onChange={(e) => updateField('password', e.target.value)}
          onBlur={() => {
            onBlur('password');
          }}
          ref={(el) => (inputRefs.current.password = el)}
          autoComplete='new-password'
          className={inputClass('password', 'text-base')}
        />
        {errors.password && touched.password && <Alert description={errors.password} />}
      </FormField>
      <FormField label='비밀번호 확인' required>
        <Input
          placeholder='비밀번호를 다시 한 번 입력해주세요.'
          type='password'
          value={formData.passwordConfirm}
          onChange={(e) => updateField('passwordConfirm', e.target.value)}
          onBlur={(e) => {
            onBlurPasswordConfirm(e);
          }}
          ref={(el) => (inputRefs.current.passwordConfirm = el)}
          autoComplete='off'
          className={inputClass('passwordConfirm', 'text-base')}
        />
        {errors.passwordConfirm && touched.passwordConfirm && (
          <Alert description={errors.passwordConfirm} />
        )}
      </FormField>

      <SignUpButton isValid={isValid} />
    </form>
  );
}
