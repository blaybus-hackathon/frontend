import { Input } from '@/components/ui/custom/input';
import { FormField } from '@/components/ui/custom/FormField';
import { RadioItem } from '@/components/ui/custom/multiRadio';
import { ProfileImageUploader } from '@/components/common/ProfileImageUploader';
import { useManagerProfileStore } from '@/store/center/useManagerProfileStore';

const inputClassName =
  'rounded-lg h-[4.0625rem] px-5 text-lg font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)] focus:outline-none';

export default function ManagerInfoEdit({ managerProfile }) {
  const { formData, setFormData } = useManagerProfileStore();

  const updateField = (field, value, isImgChanged = false) => {
    if (!formData) {
      setFormData({
        ...managerProfile,
        profileOption: managerProfile.imgSeq ? '1' : '2',
        photoFile: null,
        [field]: value,
        imgChangeYn: isImgChanged ? true : (formData?.imgChangeYn ?? false),
      });
    } else {
      setFormData({
        ...formData,
        [field]: value,
        imgChangeYn: isImgChanged ? true : formData.imgChangeYn,
      });
    }
  };

  const handleProfileOptionChange = (value) => {
    if (!formData) {
      setFormData({
        ...managerProfile,
        profileOption: value,
        imgChangeYn: value === '2' ? true : false,
        photoFile: value === '2' ? null : null,
      });
    } else {
      setFormData({
        ...formData,
        profileOption: value,
        imgChangeYn: value === '2' ? true : formData.imgChangeYn,
        photoFile: value === '2' ? null : formData.photoFile,
      });
    }
  };

  const profileOptionValue = formData?.profileOption ?? (managerProfile.imgSeq ? '1' : '2');

  return (
    <>
      <FormField label='소속 센터'>
        <Input
          readOnly
          value={managerProfile.centerName}
          className={inputClassName}
          width={'100%'}
        />
      </FormField>

      <FormField label='이름'>
        <Input readOnly value={managerProfile.cmName} className={inputClassName} width={'100%'} />
      </FormField>

      <FormField label='직책' required>
        <Input
          value={formData?.cmPosition ?? managerProfile.cmPosition ?? ''}
          className={inputClassName}
          width={'100%'}
          onChange={(e) => updateField('cmPosition', e.target.value)}
        />
      </FormField>

      <FormField label='프로필 사진 등록'>
        <div className='grid grid-cols-2 gap-2'>
          <RadioItem
            value='1'
            checked={profileOptionValue === '1'}
            onClick={() => handleProfileOptionChange('1')}
            aria-checked={profileOptionValue === '1'}
          >
            <p className='text-[1.1rem] lg:text-xl'>등록하기</p>
          </RadioItem>
          <RadioItem
            value='2'
            checked={profileOptionValue === '2'}
            onClick={() => handleProfileOptionChange('2')}
            aria-checked={profileOptionValue === '2'}
          >
            <p className='text-[1.1rem] lg:text-xl'>아이콘 대체</p>
          </RadioItem>
        </div>

        {profileOptionValue === '1' && (
          <ProfileImageUploader
            profileOption={profileOptionValue}
            selectedImage={formData?.photoFile ?? null}
            onImageSelect={(file) => updateField('photoFile', file, true)}
            initialImage={managerProfile.imgSeq ? managerProfile.imgAddress : null}
          />
        )}
      </FormField>
    </>
  );
}
