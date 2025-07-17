import { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { FormField } from '@/components/ui/custom/FormField';
import { Input } from '@/components/ui/custom/input';
import { Button } from '@/components/ui/custom/Button';
import { Alert } from '@/components/ui/custom/alert';
import { setTempPassword } from '@/services/findAccountService';

export default function SendTempPwdForm({ onResult }) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const handleCheckEmail = async () => {
    setEmailError('');
    if (!email.trim()) {
      setEmailError('이메일을 입력해주세요.');
      return;
    }
    if (!validateEmail(email)) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await setTempPassword(email);
      onResult({ code: response.code });
    } catch (error) {
      setEmailError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className='px-2 py-4'>
      <FormField label='이메일 입력' required>
        <div className='flex flex-col gap-3 lg:gap-8'>
          <Input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleCheckEmail()}
            placeholder='이메일을 입력해주세요.'
            className={`w-full h-fit font-lg text-[var(--text)] font-normal focus:outline-none focus:ring-0 p-4 rounded-[0.625rem] ${emailError ? 'border-red-500' : ''}`}
          />
          {emailError && (
            <Alert icon={<AlertCircle className='w-4 h-4' />} description={emailError} />
          )}
          <p className='text-start text-sm text-gray-500 pt-3'>
            입력하신 이메일로 임시 비밀번호를 전송해 드려요!
          </p>
          <Button
            className={`w-full h-fit p-3.5 font-normal disabled:opacity-50`}
            onClick={handleCheckEmail}
            disabled={isLoading || !email}
          >
            {isLoading ? '확인중...' : '임시 비밀번호 전송'}
          </Button>
        </div>
      </FormField>
    </section>
  );
}
