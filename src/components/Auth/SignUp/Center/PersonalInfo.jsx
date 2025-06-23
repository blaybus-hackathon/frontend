import { useNavigate } from 'react-router-dom';
import { useSignUpStore } from '@/store/auth/center/useSignUpStore';
import { FormField } from '@/components/ui/custom/FormField';
import { Input } from '@/components/ui/custom/input';
import { Search } from 'lucide-react';
import SignUpButton from '@/components/Auth/SignUp/Center/SignUpButton';

export default function PersonalInfo() {
  const navigate = useNavigate();
  const { signUpForm, setPersonalInfoField } = useSignUpStore();
  const { centerName, name, position, centerSeq } = signUpForm.personalInfo;

  return (
    <div className='flex flex-col gap-2 mt-8'>
      <FormField label='소속 센터' required>
        <div
          className='flex items-center relative'
          onClick={() => {
            setPersonalInfoField('centerSeq', centerSeq);
            setPersonalInfoField('centerName', centerName);
            navigate('/search-center');
          }}
        >
          <input
            readOnly
            value={centerName || ''}
            type='text'
            placeholder='센터 검색'
            className='w-full border-b-[var(--main)] border-b-2 pb-[0.88rem] outline-none text-[var(--text)] pl-2 cursor-pointer'
          />
          <Search className='absolute strple right-4 top-0 text-[var(--main)]' strokeWidth={3} />
        </div>
      </FormField>

      <FormField label='이름' required>
        <Input
          value={name || ''}
          onChange={(e) => setPersonalInfoField('name', e.target.value)}
          placeholder={'예) 홍길동'}
          className='rounded-lg h-[4.0625rem] text-lg font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)]'
        />
      </FormField>

      <FormField label='직급' required>
        <Input
          value={position || ''}
          onChange={(e) => setPersonalInfoField('position', e.target.value)}
          placeholder={'예) 주임'}
          className='rounded-lg h-[4.0625rem] text-lg font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)]'
        />
      </FormField>

      <SignUpButton />
    </div>
  );
}
