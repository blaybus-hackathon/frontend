import { useState, useRef, useEffect } from 'react';
import NextButton from '@/components/ui/custom/Button/NextButton';
import { Button } from '@/components/ui/custom/Button';
import { useServiceForm } from '@/hooks/center/service/useServiceForm';
import elderRegiDummy from '@/store/jpaper/elderRegiDummy.js';
import { Radio, RadioItem } from '@/components/ui/custom/multiRadio';
import useElderRegiStore from '@/store/center/useElderRegiStore';

const FormField = ({ label, required, children, isMultiple }) => (
  <section className='mb-10'>
    <div className='flex items-center mb-[1.12rem]'>
      <span className='sub-title'>{label}</span>
      <span className='single-select'>{isMultiple ? '(복수선택가능)' : '(단일선택)'}</span>
      {required && <span className='required-text'>필수</span>}
    </div>
    {children}
  </section>
);

const MealSection = ({ serviceMealList, formData, handleInputChange }) => (
  <FormField label='식사 보조' required isMultiple={true}>
    <div className='grid grid-cols-2 gap-[1.12rem]'>
      {serviceMealList.map((meal) => (
        <Button
          key={meal.id}
          variant='outline'
          className='w-full h-[4.0625rem] text-lg sm:text-lg lg:text-xl text-center whitespace-normal break-words'
          selected={formData.selectedMeals?.includes(meal.careVal)}
          onClick={() => handleInputChange('selectedMeals', meal.careVal)}
        >
          {meal.careName}
        </Button>
      ))}
    </div>
  </FormField>
);

const ToiletSection = ({ serviceToiletList, formData, handleInputChange }) => (
  <FormField label='배변 보조' required isMultiple={true}>
    <div className='grid grid-cols-2 gap-[1.12rem]'>
      {serviceToiletList.map((toilet) => (
        <Button
          key={toilet.id}
          variant='outline'
          className='w-full h-[4.0625rem] text-lg sm:text-lg lg:text-xl text-center whitespace-normal break-words'
          selected={formData.selectedToilet?.includes(toilet.careVal)}
          onClick={() => handleInputChange('selectedToilet', toilet.careVal)}
        >
          {toilet.careName}
        </Button>
      ))}
    </div>
  </FormField>
);

const MobilitySection = ({ serviceMobilityList, formData, handleInputChange }) => (
  <FormField label='이동 보조' required isMultiple={true}>
    <div className='grid grid-cols-2 gap-[1.12rem]'>
      {serviceMobilityList.map((mobility) => (
        <Button
          key={mobility.id}
          variant='outline'
          className={`w-full h-[4.0625rem] text-lg sm:text-lg lg:text-xl text-center whitespace-normal break-words ${
            formData.selectedMobility?.includes(mobility.careVal) ? 'bg-primary text-white' : ''
          }`}
          selected={formData.selectedMobility?.includes(mobility.careVal)}
          onClick={() => handleInputChange('selectedMobility', mobility.careVal)}
        >
          {mobility.careName}
        </Button>
      ))}
    </div>
  </FormField>
);

const DailySection = ({ serviceDailyList, formData, handleInputChange }) => (
  <FormField label='일상 생활' required isMultiple={true}>
    <div className='grid grid-cols-2 gap-[1.12rem]'>
      {serviceDailyList.map((daily) => (
        <Button
          key={daily.id}
          variant='outline'
          className={`w-full h-[4.0625rem] text-lg sm:text-lg lg:text-xl text-center whitespace-normal break-words ${
            formData.selectedDaily?.includes(daily.careVal) ? 'bg-primary text-white' : ''
          }`}
          selected={formData.selectedDaily?.includes(daily.careVal)}
          onClick={() => handleInputChange('selectedDaily', daily.careVal)}
        >
          {daily.careName}
        </Button>
      ))}
    </div>
  </FormField>
);

const ElderProfileSection = ({
  profileOption,
  selectedImage,
  handleProfileOptionChange,
  handleImageChange, // image select button click handler
  handleImageDelete, // delete image
  handleImageSave, // save image to server
  isUploading, // uploading image to server
  fileInputRef,
  handleImageUpload, // file select event handler
}) => {
  console.log('ProfileSection rendered:', { profileOption, selectedImage });

  return (
    <FormField label='어르신 프로필 사진 등록'>
      <div className='flex flex-col mt-2'>
        <Radio value={profileOption} onValueChange={handleProfileOptionChange}>
          <RadioItem value='1'>등록하기</RadioItem>
          <RadioItem value='2'>아이콘대체</RadioItem>
        </Radio>

        {profileOption === '1' && (
          <div className='mt-4 flex flex-col items-start gap-4'>
            <input
              type='file'
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept='image/*'
              className='hidden'
              aria-hidden='true'
            />
            {!selectedImage ? (
              <div className='flex flex-col items-center gap-2'>
                <Button onClick={handleImageChange} className='px-6 py-3' variant='white'>
                  이미지 선택
                </Button>
              </div>
            ) : (
              <div className='flex flex-col items-start gap-2'>
                {selectedImage && (
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt='프로필 미리보기'
                    className='w-32 h-32 object-cover rounded-md'
                  />
                )}

                <div className='flex gap-2'>
                  {/* image save button */}
                  <Button
                    onClick={handleImageSave}
                    disabled={isUploading}
                    className='py-3'
                    variant='ghost'
                  >
                    저장하기
                  </Button>
                  <Button onClick={handleImageDelete} className='px-6 text-red-500' variant='ghost'>
                    삭제
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </FormField>
  );
};

export default function ElderService() {
  // 상태 관리
  const [profileOption, setProfileOption] = useState('2'); // default: '아이콘대체'
  const [selectedImage, setSelectedImage] = useState(null); // selected image file
  const [isUploading, setIsUploading] = useState(false); // uploading image status
  const fileInputRef = useRef(null);

  // Todo : 추후 삭제 필요
  // just for debugging
  useEffect(() => {
    console.log('ElderService state updated:', { profileOption, selectedImage });
  }, [profileOption, selectedImage]);

  const { serviceMealList, serviceToiletList, serviceMobilityList, serviceDailyList } =
    elderRegiDummy();
  const { formData, handleInputChange, isFormValid } = useServiceForm();
  const { setProfileImage, registerElder } = useElderRegiStore();

  const handleProfileOptionChange = (value) => {
    console.log('Profile option change requested with value:', value, typeof value);

    if (value) {
      const valueAsString = String(value);
      setProfileOption(valueAsString);

      if (valueAsString === '2') {
        console.log('Clearing selected image');
        setSelectedImage(null);
        setProfileImage(null);
      }
    }
  };

  const handleImageChange = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 파일 크기 체크 (예: 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB를 초과할 수 없습니다.');
      return;
    }

    // 파일 타입 체크 (이미지 파일만 허용)
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    // 선택된 이미지 파일 저장
    setSelectedImage(file);
  };

  const handleImageSave = async () => {
    if (!selectedImage) return;

    setIsUploading(true); // uploading image status
    try {
      const formData = new FormData();
      formData.append('photoFile', selectedImage);
      formData.append('patientSeq', registerElder.patientSeq);

      const response = await fetch('/api/cmn/upload-img/PATIENT', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('failed to upload image');
      }

      const data = await response.json();
      setProfileImage(data.imgSeq);
      setIsUploading(false);
    } catch (error) {
      console.error('이미지 업로드 오류:', error);
      alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');
      setIsUploading(false);
    }
  };

  const handleImageDelete = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }
    setSelectedImage(null);
  };

  return (
    <>
      <MealSection
        serviceMealList={serviceMealList}
        formData={formData}
        handleInputChange={handleInputChange}
      />
      <ToiletSection
        serviceToiletList={serviceToiletList}
        formData={formData}
        handleInputChange={handleInputChange}
      />
      <MobilitySection
        serviceMobilityList={serviceMobilityList}
        formData={formData}
        handleInputChange={handleInputChange}
      />
      <DailySection
        serviceDailyList={serviceDailyList}
        formData={formData}
        handleInputChange={handleInputChange}
      />
      <ElderProfileSection
        profileOption={profileOption}
        selectedImage={selectedImage}
        handleProfileOptionChange={handleProfileOptionChange}
        handleImageChange={handleImageChange}
        handleImageDelete={handleImageDelete}
        handleImageSave={handleImageSave}
        isUploading={isUploading}
        fileInputRef={fileInputRef}
        handleImageUpload={handleImageUpload}
      />

      <NextButton disabled={!isFormValid()} />
    </>
  );
}
