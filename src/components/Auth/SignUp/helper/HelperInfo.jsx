import { useNavigate } from 'react-router-dom';
import { useSignUpStore } from '@/store/auth/helper/useSignUpStore';
import { FormField } from '@/components/ui/custom/FormField';
import { Input } from '@/components/ui/custom/input';
import { formatPhoneNumber } from '@/utils/formatters/formatPhoneNumber';
import { Radio, RadioItem } from '@/components/ui/custom/multiRadio';
import { ProfileImageUploader } from '@/components/common/ProfileImageUploader';
import SignUpButton from '@/components/Auth/SignUp/helper/SignUpButton';

export default function HelperInfo() {
  const navigate = useNavigate();
  const { signUpForm, setHelperInfoField, isFirstCheck } = useSignUpStore();
  const { name, phone, birthday, addressDetail, gender, carOwnYn, eduYn } = signUpForm.helperInfo;
  const handleProfileOptionChange = (value) => {
    setHelperInfoField('imgFile', value === '1' ? null : signUpForm.helperInfo.imgFile);
    setHelperInfoField('profilePic', value);
  };

  const handleBirthday = (e) => {
    let str = e.target.value.replace(/\D/g, '');
    if (str.length > 8) str = str.slice(0, 8);
    setHelperInfoField('birthday', str);
  };

  return (
    <div>
      <h1 className='text-[var(--text)] text-[1.44rem] font-semibold leading-normal text-start mb-5'>
        회원가입을 위해
        <br />
        개인 정보를 입력해주세요!
      </h1>

      <FormField label='이름' required className='mb-5'>
        <Input
          placeholder='예) 홍길동'
          value={name}
          maxLength={10}
          onChange={(e) => setHelperInfoField('name', e.target.value)}
          className={`rounded-lg h-[4.0625rem] text-base font-normal text-[var(--button-black)] border placeholder:text-[var(--placeholder-gray)] w-[100%] ${
            !isFirstCheck && !name ? 'border-[var(--required-red)]' : 'border-[var(--outline)]'
          }`}
        />
        {!isFirstCheck && !name && (
          <p className='text-start text-sm text-[var(--required-red)] font-medium'>
            이름을 입력해주세요
          </p>
        )}
      </FormField>

      <FormField label='전화번호' required className='mb-5'>
        <Input
          placeholder='예) 010-1234-5678'
          value={phone}
          onChange={(e) => {
            const formatted = formatPhoneNumber(e.target.value);
            setHelperInfoField('phone', formatted);
          }}
          inputMode='numeric'
          maxLength={13}
          className={`rounded-lg h-[4.0625rem] text-base font-normal text-[var(--button-black)] border placeholder:text-[var(--placeholder-gray)] w-[100%] ${
            !isFirstCheck && !phone ? 'border-[var(--required-red)]' : 'border-[var(--outline)]'
          }`}
        />
        {!isFirstCheck && !phone && (
          <p className='text-start text-sm text-[var(--required-red)] font-medium'>
            전화번호를 입력해주세요
          </p>
        )}
      </FormField>

      <FormField label='성별' required className='mb-5'>
        <Radio cols={2} onValueChange={(value) => setHelperInfoField('gender', value)}>
          <RadioItem value={false} checked={signUpForm.helperInfo.gender === false}>
            남성
          </RadioItem>
          <RadioItem value={true} checked={signUpForm.helperInfo.gender === true}>
            여성
          </RadioItem>
        </Radio>
        {!isFirstCheck && gender === null && (
          <p className='text-start text-sm text-[var(--required-red)] font-medium'>
            성별을 입력해주세요
          </p>
        )}
      </FormField>

      <FormField label='생년월일' required className='mb-5'>
        <Input
          placeholder='예) 19910305'
          inputMode='numeric'
          maxLength={8}
          value={birthday}
          // onChange={(e) => setHelperInfoField('birthday', e.target.value)}
          onChange={handleBirthday}
          className={`rounded-lg h-[4.0625rem] text-base font-normal text-[var(--button-black)] border placeholder:text-[var(--placeholder-gray)] w-[100%] ${
            !isFirstCheck && !birthday ? 'border-[var(--required-red)]' : 'border-[var(--outline)]'
          }`}
        />
        {!isFirstCheck && !birthday && (
          <p className='text-start text-sm text-[var(--required-red)] font-medium'>
            생년월일을 입력해주세요
          </p>
        )}
      </FormField>

      <FormField label='주소' required className='mb-5'>
        <div className='flex items-center gap-4' onClick={() => navigate('/helper/address')}>
          <Input
            readOnly
            type={'text'}
            value={addressDetail || ''}
            placeholder={'주소지 등록하러 가기'}
            className={`rounded-lg h-[4.0625rem] text-lg font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)] cursor-pointer ${
              !isFirstCheck && !addressDetail
                ? 'border-[var(--required-red)]'
                : 'border-[var(--outline)]'
            }`}
            width={'100%'}
          />
        </div>
        {!isFirstCheck && !addressDetail && (
          <p className='text-start text-sm text-[var(--required-red)] font-medium'>
            주소를 입력해주세요
          </p>
        )}
      </FormField>

      <FormField label='차량소유여부' required className='mb-5'>
        <Radio cols={2} onValueChange={(value) => setHelperInfoField('carOwnYn', value)}>
          <RadioItem value={true} checked={signUpForm.helperInfo.carOwnYn === true}>
            예
          </RadioItem>
          <RadioItem value={false} checked={signUpForm.helperInfo.carOwnYn === false}>
            아니오
          </RadioItem>
        </Radio>
        {!isFirstCheck && carOwnYn === null && (
          <p className='text-start text-sm text-[var(--required-red)] font-medium'>
            차량소유여부를 입력해주세요
          </p>
        )}
      </FormField>

      <FormField label='치매교육 이수 여부' required className='mb-5'>
        <Radio cols={2} onValueChange={(value) => setHelperInfoField('eduYn', value)}>
          <RadioItem value={true} checked={signUpForm.helperInfo.eduYn === true}>
            예
          </RadioItem>
          <RadioItem value={false} checked={signUpForm.helperInfo.eduYn === false}>
            아니오
          </RadioItem>
        </Radio>
        {!isFirstCheck && eduYn === null && (
          <p className='text-start text-sm text-[var(--required-red)] font-medium'>
            치매교육 이수 여부를 입력해주세요
          </p>
        )}
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
