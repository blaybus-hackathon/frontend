import { useRef, useCallback } from 'react';
import { Button } from '@/components/ui/custom/Button';
import { Radio, RadioItem } from '@/components/ui/custom/multiRadio';
import { FormField } from '@/components/ui/custom/FormField';
import { useElderRegiStore } from '@/store/center/useElderRegiStore';
import { ElderNextButton } from '@/components/Center/ElderRegistration/Button/ElderNextButton';

export default function ElderServiceInfo({ formOptions }) {
  const serviceInfo = useElderRegiStore((state) => state.registerElder.serviceInfo);
  const setServiceInfo = useElderRegiStore((state) => state.setServiceInfo);
  const setPatientImage = useElderRegiStore((state) => state.setPatientImage);

  const selectedImage = useElderRegiStore((state) => state.selectedImg);
  const setSelectedImage = useElderRegiStore((state) => state.setSelectedImage);
  const profileOption = useElderRegiStore((state) => state.registerElder.profileOption);
  const setProfileOption = useElderRegiStore((state) => state.setProfileOption);

  const fileInputRef = useRef(null);

  const updateMultiSelect = useCallback(
    (category, careVal) => {
      const listKey = `selected${category}List`; // UI array
      const fieldKey = category.replace('Service', 'service');

      const selectedList = serviceInfo[listKey] || [];
      const updatedList = selectedList.includes(careVal)
        ? selectedList.filter((v) => v !== careVal)
        : [...selectedList, careVal];

      const sum = updatedList.reduce((acc, cur) => acc + Number(cur), 0);

      setServiceInfo({
        ...serviceInfo,
        [listKey]: updatedList,
        [fieldKey]: sum,
      });
    },
    [serviceInfo, setServiceInfo],
  );

  const handleProfileOptionChange = (value) => {
    const valueAsString = String(value);
    setProfileOption(valueAsString);

    if (valueAsString === '2') {
      setSelectedImage(null);
      setPatientImage(null);
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

    // check file size (1MB)
    if (file.size > 1 * 1024 * 1024) {
      alert('파일 크기는 1MB를 초과할 수 없습니다.');
      return;
    }

    // check file type (only image file)
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    // save selected image file
    setSelectedImage(file);
  };

  const handleImageDelete = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage);
    }
    setSelectedImage(null);
  };

  return (
    <div className='w-[88%] mx-auto'>
      <FormField label='식사 보조' required isMultiple={true}>
        <div className='grid grid-cols-2 gap-[1.12rem]'>
          {formOptions.serviceMealList.map((meal) => (
            <Button
              key={meal.id}
              variant='outline'
              className='w-full h-[4.0625rem] text-lg sm:text-lg lg:text-xl text-center whitespace-normal break-words'
              selected={serviceInfo.selectedServiceMealList?.includes(meal.careVal)}
              onClick={() => updateMultiSelect('ServiceMeal', meal.careVal)}
            >
              {meal.careName}
            </Button>
          ))}
        </div>
      </FormField>

      <FormField label='배변 보조' required isMultiple={true}>
        <div className='grid grid-cols-2 gap-[1.12rem]'>
          {formOptions.serviceToiletList.map((toilet) => (
            <Button
              key={toilet.id}
              variant='outline'
              className='w-full h-[4.0625rem] text-lg sm:text-lg lg:text-xl text-center whitespace-normal break-words'
              selected={serviceInfo.selectedServiceToiletList?.includes(toilet.careVal)}
              onClick={() => updateMultiSelect('ServiceToilet', toilet.careVal)}
            >
              {toilet.careName}
            </Button>
          ))}
        </div>
      </FormField>

      <FormField label='이동 보조' required isMultiple={true}>
        <div className='grid grid-cols-2 gap-[1.12rem]'>
          {formOptions.serviceMobilityList.map((mobility) => (
            <Button
              key={mobility.id}
              variant='outline'
              className={`w-full h-[4.0625rem] text-lg sm:text-lg lg:text-xl text-center whitespace-normal break-words ${
                serviceInfo.selectedServiceMobilityList?.includes(mobility.careVal)
                  ? 'bg-primary text-white'
                  : ''
              }`}
              selected={serviceInfo.selectedServiceMobilityList?.includes(mobility.careVal)}
              onClick={() => updateMultiSelect('ServiceMobility', mobility.careVal)}
            >
              {mobility.careName}
            </Button>
          ))}
        </div>
      </FormField>

      <FormField label='일상 생활' required isMultiple={true}>
        <div className='grid grid-cols-2 gap-[1.12rem]'>
          {formOptions.serviceDailyList.map((daily) => (
            <Button
              key={daily.id}
              variant='outline'
              className={`w-full h-[4.0625rem] text-lg sm:text-lg lg:text-xl text-center whitespace-normal break-words ${
                serviceInfo.selectedServiceDailyList?.includes(daily.careVal)
                  ? 'bg-primary textwhite'
                  : ''
              }`}
              selected={serviceInfo.selectedServiceDailyList?.includes(daily.careVal)}
              onClick={() => updateMultiSelect('ServiceDaily', daily.careVal)}
            >
              {daily.careName}
            </Button>
          ))}
        </div>
      </FormField>

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
                className='hidden'
                aria-hidden='true'
                accept='image/*'
              />

              {!selectedImage ? (
                <div className='flex flex-col items-center gap-2'>
                  <Button onClick={handleImageChange} className='px-6 py-3' variant='white'>
                    이미지 선택
                  </Button>
                </div>
              ) : (
                <div className='flex flex-col items-start gap-2'>
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt='어르신 프로필 사진'
                    className='w-32 h-32 rounded-md'
                  />
                  <div className='flex gap-2'>
                    <Button
                      onClick={handleImageDelete}
                      className='px-6 text-red-500'
                      variant='ghost'
                    >
                      삭제
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </FormField>

      <ElderNextButton />
    </div>
  );
}
