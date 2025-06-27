import { useNavigate } from 'react-router-dom';
import { useSignUpStore } from '@/store/auth/helper/useSignUpStore';
import { FormField } from '@/components/ui/custom/FormField';
import { Input } from '@/components/ui/custom/input';
import { formatPhoneNumber } from '@/utils/formatPhoneNumber';
import { Radio, RadioItem } from '@/components/ui/custom/multiRadio';
import ProfileImageUploader from '@/components/common/ProfileImageUploader';
import SignUpButton from '@/components/Auth/SignUp/helper/SignUpButton';

export default function HelperInfo() {
  const navigate = useNavigate();
  const { signUpForm, setHelperInfoField } = useSignUpStore();
  const { name, phone, birthday, addressDetail } = signUpForm.helperInfo;
  const handleProfileOptionChange = (value) => {
    setHelperInfoField('imgFile', value === '1' ? null : signUpForm.helperInfo.imgFile);
    setHelperInfoField('profilePic', value);
  };

  return (
    <div>
      <h1 className='text-[var(--text)] text-[1.44rem] font-semibold leading-normal text-start mb-5'>
        회원가입을 위해
        <br />
        개인 정보를 입력해주세요!
      </h1>

      <FormField label='이름' required>
        <Input
          placeholder='예) 홍길동'
          value={name}
          maxLength={10}
          onChange={(e) => setHelperInfoField('name', e.target.value)}
          className='rounded-lg h-[4.0625rem] text-base font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)] w-[100%]'
        />
      </FormField>

      <FormField label='전화번호' required>
        <Input
          placeholder='예) 010-1234-5678'
          value={phone}
          onChange={(e) => {
            const formatted = formatPhoneNumber(e.target.value);
            setHelperInfoField('phone', formatted);
          }}
          inputMode='numeric'
          maxLength={13}
          className='rounded-lg h-[4.0625rem] text-base font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)] w-[100%]'
        />
      </FormField>

      <FormField label='성별' required>
        <Radio cols={2} onValueChange={(value) => setHelperInfoField('gender', value)}>
          <RadioItem value={false}>남성</RadioItem>
          <RadioItem value={true}>여성</RadioItem>
        </Radio>
      </FormField>

      <FormField label='생년월일' required>
        <Input
          placeholder='예) 19910305'
          inputMode='numeric'
          maxLength={8}
          value={birthday}
          onChange={(e) => setHelperInfoField('birthday', e.target.value)}
          className='rounded-lg h-[4.0625rem] text-base font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)] w-[100%]'
        />
      </FormField>

      <FormField label='주소' required>
        <div className='flex items-center gap-4' onClick={() => navigate('/helper/address')}>
          <Input
            readOnly
            type={'text'}
            value={addressDetail || ''}
            placeholder={'주소지 등록하러 가기'}
            className='rounded-lg h-[4.0625rem] text-lg font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)] cursor-pointer'
            width={'100%'}
          />
        </div>
      </FormField>

      <FormField label='차량소유여부' required>
        <Radio cols={2} onValueChange={(value) => setHelperInfoField('carOwnYn', value)}>
          <RadioItem value={true}>예</RadioItem>
          <RadioItem value={false}>아니오</RadioItem>
        </Radio>
      </FormField>

      <FormField label='치매교육 이수 여부' required>
        <Radio cols={2} onValueChange={(value) => setHelperInfoField('eduYn', value)}>
          <RadioItem value={true}>예</RadioItem>
          <RadioItem value={false}>아니오</RadioItem>
        </Radio>
      </FormField>

      <ProfileImageUploader
        profileOption={signUpForm.helperInfo.profilePic}
        onOptionChange={handleProfileOptionChange}
        selectedImage={signUpForm.helperInfo.imgFile}
        onImageSelect={(file) => setHelperInfoField('imgFile', file)}
      />
      <SignUpButton />
    </div>
  );
}
