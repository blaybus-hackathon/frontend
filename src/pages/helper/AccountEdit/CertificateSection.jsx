import { Radio, RadioItem } from '@/components/ui/custom/multiRadio';
import { Input } from '@/components/ui/custom/input';
import useProfileStore from '@/store/useProfileStore';
import useHelperAccountStore from '@/store/helper/useHelperAccoutStore';

const CertificationSection = () => {
  const { profileEdit, updateProfileField } = useProfileStore();
  const { helper } = useHelperAccountStore();
  const certificates = ['요양보호사', '간병사', '병원동행매니저', '산후관리사'];

  const handleRadioChange = (certificate, isChecked) => {
    updateProfileField('selectedOptions', {
      ...profileEdit.selectedOptions,
      [certificate]: isChecked,
    });
    // 체크가 해제되면 해당 자격증 정보 입력 필드도 초기화 (선택 사항)
    if (!isChecked && profileEdit.inputs[certificate]) {
      updateProfileField('inputs', {
        ...profileEdit.inputs,
        [certificate]: '',
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateProfileField('inputs', {
      ...profileEdit.inputs,
      [name]: value,
    });
  };

  return (
    <section className=' helper-section'>
      <div className='flex flex-col items-start gap-2.5 self-stretch'>
        <span className='helper-title'>나의 소지 자격증</span>
      </div>

      <Radio cols={1} multiple className='gap-4'>
        {certificates.map((certificate) => {
          const isChecked = helper.certificates.includes(certificate);
          return (
            <div key={certificate} className='flex flex-col gap-2'>
              <RadioItem
                value={certificate}
                checked={isChecked}
                onClick={() => handleRadioChange(certificate, !isChecked)}
              >
                {certificate}
              </RadioItem>
              {isChecked && (
                <Input
                  type='text'
                  name={certificate}
                  value={profileEdit.inputs[certificate] || ''}
                  onChange={handleInputChange} // event 객체 전달
                  placeholder={`${certificate} 자격증 정보를 입력하세요`}
                  className=''
                />
              )}
            </div>
          );
        })}
      </Radio>
    </section>
  );
};

export default CertificationSection;
