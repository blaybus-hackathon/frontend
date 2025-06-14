import { useRef } from 'react';
import { Button } from '@/components/ui/custom/Button';
import { FormField } from '@/components/ui/custom/FormField';
import { Radio, RadioItem } from '@/components/ui/custom/multiRadio';

export default function ProfileImageUploader({
  profileOption,
  onOptionChange,
  selectedImage,
  onImageSelect,
}) {
  const fileInputRef = useRef(null);

  const handleImageChange = () => {
    if (fileInputRef.current) fileInputRef.current.value = '';
    fileInputRef.current?.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 1 * 1024 * 1024) {
      alert('파일 크기는 1MB를 초과할 수 없습니다.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }

    onImageSelect(file);
  };

  const handleImageDelete = () => {
    if (selectedImage) URL.revokeObjectURL(selectedImage);
    onImageSelect(null);
  };

  return (
    <FormField label='프로필 사진 등록'>
      <div className='flex flex-col'>
        {onOptionChange && (
          <Radio value={profileOption} onValueChange={onOptionChange} cols={2} className='gap-2'>
            <RadioItem value='1'>
              <p className='text-[1.1rem]'>등록하기</p>
            </RadioItem>
            <RadioItem value='2'>
              <p className='text-[1.1rem]'>아이콘 대체</p>
            </RadioItem>
          </Radio>
        )}

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

            {selectedImage === null ? (
              <div className='flex flex-col items-center gap-2'>
                <Button onClick={handleImageChange} className='px-6 py-3' variant='white'>
                  이미지 선택
                </Button>
              </div>
            ) : (
              <div className='flex flex-col items-start gap-2'>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt='프로필 사진'
                  className='w-32 h-32 rounded-md'
                />
                <div className='flex gap-2'>
                  <Button
                    onClick={handleImageDelete}
                    className='px-6 text-red-500 '
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
  );
}
