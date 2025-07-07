import { useCallback, useMemo } from 'react';
import { RadioItem } from '@/components/ui/custom/multiRadio';
import { Input } from '@/components/ui/custom/input';
import { FormField } from '@/components/ui/custom/FormField';
import { useSignUpStore } from '@/store/auth/helper/useSignUpStore';
import SignUpButton from '@/components/Auth/SignUp/helper/SignUpButton';

const LICENSE_OPTIONS = [
  { key: 'essentialCertNo', label: '요양보호사 자격증' },
  { key: 'careCertNo', label: '간병사 자격증' },
  { key: 'nurseCerNo', label: '병원동행매니저 자격증' },
  { key: 'postPartumCertNo', label: '산후관리사 자격증' },
  { key: 'helperOtherCerts', label: '기타 자격증' },
];

const LICENSE_FIELDS = [
  { name: 'certNum', placeholder: '자격증번호 입력 (예:12345678901A)', type: 'text' },
  { name: 'certDateIssue', placeholder: '발급 연월일 입력 (예:20250101)', type: 'number' },
  { name: 'certSerialNum', placeholder: '자격증 내지번호 입력 (예:0901234567)', type: 'number' },
];

const InputField = ({ placeholder, value, onChange, type }) => (
  <>
    <Input
      className='w-full h-[4.0625rem] text-base font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)]'
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      autoComplete='off'
      type={type}
    />
  </>
);

export default function LicenseInfo() {
  const { signUpForm, setLicenseInfoField } = useSignUpStore();

  const selected = useMemo(
    () => Object.keys(signUpForm.licenseInfo || {}),
    [signUpForm.licenseInfo],
  );

  const handleSelect = useCallback(
    (certKey) => {
      const isSelected = selected.includes(certKey);
      if (isSelected) {
        // 선택 해제 = 해당 필드 값 모두 비우기(빈 객체 전달)
        setLicenseInfoField(certKey, {});
      } else {
        setLicenseInfoField(certKey, {
          certName: LICENSE_OPTIONS.find((o) => o.key === certKey)?.label ?? '',
          certNum: '',
          certDateIssue: '',
          certSerialNum: '',
        });
      }
    },
    [selected, setLicenseInfoField],
  );

  return (
    <>
      <h1 className='text-[var(--text)] text-[1.44rem] font-semibold text-start mb-6'>
        회원가입을 위해
        <br />
        자격증 인증을 진행해주세요!
      </h1>

      <FormField label='자격증 등록' required isMultiple>
        <div className='grid gap-4'>
          {LICENSE_OPTIONS.map((opt) => {
            const certData = signUpForm.licenseInfo[opt.key] || {};
            const isSelected = selected.includes(opt.key);

            return (
              <div key={opt.key}>
                <RadioItem
                  className='w-full'
                  value={opt.key}
                  checked={isSelected}
                  onClick={() => handleSelect(opt.key)}
                >
                  {opt.label}
                </RadioItem>
                {isSelected && (
                  <div className='mt-3 space-y-3'>
                    {LICENSE_FIELDS.map((field) => (
                      <InputField
                        key={field.name}
                        placeholder={field.placeholder}
                        value={certData[field.name] || ''}
                        onChange={(val) =>
                          setLicenseInfoField(opt.key, { ...certData, [field.name]: val })
                        }
                        type={field.type}
                      />
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </FormField>
      <SignUpButton />
    </>
  );
}
