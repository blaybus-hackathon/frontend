import { useRef } from 'react';
import { useSignUpStore } from '@/store/auth/center/useSignUpStore';
import { useEmailAuthMutation } from '@/hooks/auth/useEmailAuth';
import { Input } from '@/components/ui/custom/input';
import { FormField } from '@/components/ui/custom/FormField';
import { Button } from '@/components/ui/custom/Button';
import SignUpButton from '@/components/Auth/SignUp/Center/SignUpButton';

export default function EmailAuth() {
  const emailCodeRef = useRef(null);
  const { signUpForm, setEmailAuthField } = useSignUpStore();
  const { sendEmail, verifyEmail, sendEmailStatus, verifyEmailStatus } = useEmailAuthMutation();
  const { email, emailCode, isVerified, mailSeq, password, passwordConfirm } = signUpForm.emailAuth;

  // 이메일 인증 번호 발송
  const handleSendEmailAuth = async () => {
    const mailSeq = await sendEmail(email);
    setEmailAuthField('mailSeq', mailSeq);
    // 인증번호 입력 칸으로 포커스 이동
    emailCodeRef.current.focus();
  };

  // 이메일 인증 번호 확인
  const handleVerifyEmail = async () => {
    const verified = await verifyEmail({ mailSeq, email, code: emailCode });
    if (verified) setEmailAuthField('isVerified', true);
  };

  return (
    <div className='flex flex-col mb-[0.56rem]'>
      <FormField label='이메일 입력' required>
        <div className='flex justify-between items-center gap-2'>
          <Input
            placeholder='이메일을 입력해주세요.'
            type='email'
            value={email}
            disabled={isVerified}
            onChange={(e) => setEmailAuthField('email', e.target.value)}
            className='rounded-lg h-[4.0625rem] text-base font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)] w-[100%]'
          />
          {/* 발송 버튼 클릭 시 인증번호 입력 칸으로 이동 */}
          <Button
            onClick={handleSendEmailAuth}
            disabled={isVerified || sendEmailStatus.isPending}
            className='w-[38%] text-base font-normal px-2'
          >
            {sendEmailStatus.isPending ? '발송중...' : isVerified ? '인증완료' : '인증번호 발송'}
          </Button>
        </div>

        <div className='flex justify-between items-center gap-2 mt-2'>
          <Input
            ref={emailCodeRef}
            placeholder='인증번호를 입력해주세요.'
            disabled={isVerified}
            value={emailCode}
            onChange={(e) => setEmailAuthField('emailCode', e.target.value)}
            className='rounded-lg h-[4.0625rem] text-base font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)] w-[100%]'
          />
          <Button
            onClick={handleVerifyEmail}
            disabled={isVerified || verifyEmailStatus.isPending}
            className='w-[38%] text-base font-normal px-6'
          >
            {verifyEmailStatus.isPending ? '인증중...' : isVerified ? '인증완료' : '인증하기'}
          </Button>
        </div>
      </FormField>

      <FormField label='비밀번호 입력' required>
        <Input
          placeholder='비밀번호를 입력해주세요.'
          type='password'
          value={password}
          onChange={(e) => setEmailAuthField('password', e.target.value)}
          className='rounded-lg h-[4.0625rem] text-base font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)] w-[100%]'
        />
      </FormField>

      <FormField label='비밀번호 확인' required>
        <Input
          placeholder='비밀번호를 다시 한 번 입력해주세요.'
          type='password'
          value={passwordConfirm}
          onChange={(e) => setEmailAuthField('passwordConfirm', e.target.value)}
          onBlur={() => setEmailAuthField('passwordCheck', true)}
          className='rounded-lg h-[4.0625rem] text-base font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)] w-[100%]'
        />
      </FormField>

      <SignUpButton />
    </div>
  );
}
