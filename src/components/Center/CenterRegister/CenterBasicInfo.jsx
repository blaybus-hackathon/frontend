import { useRef, useCallback } from 'react';
import { Input } from '@/components/ui/custom/input';
import { Button } from '@/components/ui/custom/Button';
import { FormField } from '@/components/ui/custom/FormField';
import { Radio, RadioItem } from '@/components/ui/custom/multiRadio';
import { CenterNextButton } from '@/components/Center/CenterRegister/CenterNextButton';
import { useCenterRegiStore } from '@/store/center/useCenterRegiStore';

export default function CenterBasicInfo() {
  const detailAdressRef = useRef(null);
  const centerForm = useCenterRegiStore((s) => s.registerCenter);
  const setBasicInfoField = useCenterRegiStore((s) => s.setBasicInfoField);

  const handleSearchAddress = useCallback(() => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let basicAddr = '';
        let extraAddr = '';

        if (data.userSelectedType === 'R') {
          basicAddr = data.roadAddress;
        } else {
          basicAddr = data.jibunAddress;
        }

        if (data.userSelectedType === 'R') {
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
          }
          if (extraAddr !== '') {
            extraAddr = ` (${extraAddr})`;
          }
        }

        setBasicInfoField('postcode', data.zonecode);
        setBasicInfoField('basicAddress', basicAddr);
        setBasicInfoField('extraAddress', extraAddr);

        // 상세 주소로 포커스 이동
        setTimeout(() => detailAdressRef.current.focus(), 0);
      },
    }).open();
  }, []);

  return (
    <>
      <FormField label='센터 이름' required>
        <Input
          placeholder={'이름을 입력해주세요'}
          className='rounded-lg h-[4.0625rem] text-lg font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)]'
          width={'100%'}
          value={centerForm.basicInfo.name}
          onChange={(e) => setBasicInfoField('name', e.target.value)}
        />
      </FormField>

      <FormField label='전화번호' required>
        <Input
          placeholder={'예) 01012345678'}
          className='rounded-lg h-[4.0625rem] text-lg font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)]'
          width={'100%'}
          maxLength={11}
          value={centerForm.basicInfo.tel}
          onChange={(e) => setBasicInfoField('tel', e.target.value)}
        />
      </FormField>

      <FormField label='목욕 차량 소유 여부' required>
        <Radio
          cols={2}
          onValueChange={(value) => setBasicInfoField('carYn', value)}
          value={centerForm.basicInfo.carYn}
          multiple={false}
        >
          <RadioItem value='예'>예</RadioItem>
          <RadioItem value='아니오'>아니오</RadioItem>
        </Radio>
      </FormField>

      <FormField label='주소' required>
        <div className='flex items-center gap-2 mb-2'>
          <Input
            placeholder={'우편번호'}
            className='rounded-lg h-[4.0625rem] text-lg font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)]'
            readOnly
            width={'35%'}
            value={centerForm.basicInfo.postcode}
            onChange={(e) => setBasicInfoField('postcode', e.target.value)}
          />
          <Button onClick={handleSearchAddress} className='w-[35%] lg:w-[20%] text-lg'>
            주소 찾기
          </Button>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 items-center gap-2 mb-2'>
          <Input
            placeholder={'도로명주소'}
            className='rounded-lg h-[4.0625rem] text-lg font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)] cursor-pointer'
            width={'100%'}
            value={centerForm.basicInfo.basicAddress}
            readOnly
            onChange={(e) => setBasicInfoField('basicAddress', e.target.value)}
          />
          <Input
            placeholder={'참고항목'}
            className='rounded-lg h-[4.0625rem] text-lg font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)]'
            width={'100%'}
            value={centerForm.basicInfo.extraAddress}
            onChange={(e) => setBasicInfoField('extraAddress', e.target.value)}
            readOnly
          />
        </div>
        <Input
          placeholder={'상세 주소'}
          className='rounded-lg h-[4.0625rem] text-lg font-normal text-[var(--button-black)] border border-[var(--outline)] placeholder:text-[var(--placeholder-gray)]'
          width={'100%'}
          ref={detailAdressRef}
          value={centerForm.basicInfo.detailAddress}
          onChange={(e) => {
            const value = e.target.value;
            setBasicInfoField('detailAddress', value);
          }}
        />
      </FormField>
      <CenterNextButton />
    </>
  );
}
