import { useManagerProfileStore } from '@/store/center/useManagerProfileStore';
import { FormField } from '@/components/ui/custom/FormField';
import { Input } from '@/components/ui/custom/input';
import ProfileImageUploader from '@/components/common/ProfileImageUploader';

export default function ManagerInfoEdit() {
  const { formData, setFormData } = useManagerProfileStore();

  const handleProfileOptionChange = (value) => {
    setFormData({
      ...formData,
      profileOption: value,
      imgChangeYn: true,
      photoFile: value === '2' ? null : formData.photoFile,
    });
  };

  return (
    <>
      <FormField label='소속 센터' required>
        <Input
          value={formData.centerName}
          className='rounded-lg h-[4.0625rem] px-5 text-lg font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)] focus:outline-none'
          width={'100%'}
        />
      </FormField>

      <FormField label='이름' required>
        <Input
          value={formData.cmName}
          className='rounded-lg h-[4.0625rem] px-5 text-lg font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)] focus:outline-none'
          width={'100%'}
        />
      </FormField>

      <FormField label='직책' required>
        <Input
          value={formData.cmPosition}
          className='rounded-lg h-[4.0625rem] px-5 text-lg font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)] focus:outline-none'
          width={'100%'}
          onChange={(e) => setFormData({ ...formData, cmPosition: e.target.value })}
        />
      </FormField>

      <ProfileImageUploader
        profileOption={formData.profileOption}
        onOptionChange={handleProfileOptionChange}
        selectedImage={formData.photoFile}
        onImageSelect={(file) => setFormData({ ...formData, photoFile: file, imgChangeYn: true })}
      />
    </>
  );
}
