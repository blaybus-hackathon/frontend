import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AddressSearch from '@/components/SignUp/AddressSearch';

export default function SignTest({ onNext, onPrev }) {
  // TODO : 상태 저장에 대해서는 여유보고 추가할 것

  const [formData, setFormData] = useState({
    email: '',
    name: '',
    phone: '',
    password: '',
    addressData: {
      postcode: '',
      address: '',
      detailAddress: '',
      extraAddress: '',
    },
    car: null,
    dementia: null,
    licenses: [],
    licenseDetails: {
      license1: '',
      license2: '',
      license3: '',
      license4: '',
      license5: '',
    },
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleNext = () => {
    // 필수가 선택되었는지 체크할 필요가 있음
    onNext();
  };

  const handlePrev = () => {
    onPrev();
  };

  const handleCarSelection = (value) => {
    setFormData((prev) => ({
      ...prev,
      car: value,
    }));
  };

  const handleDementiaSelection = (value) => {
    setFormData((prev) => ({
      ...prev,
      dementia: value,
    }));
  };

  const handleAddressChange = (addressData) => {
    setFormData((prev) => ({
      ...prev,
      addressData: {
        postcode: addressData.postcode,
        address: addressData.address,
        detailAddress: addressData.detailAddress,
        extraAddress: addressData.extraAddress,
      },
    }));
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== '' &&
      formData.phone.trim() !== '' &&
      formData.addressData.postcode.trim() !== '' &&
      formData.addressData.address.trim() !== '' &&
      formData.addressData.detailAddress.trim() !== '' &&
      formData.car !== null &&
      formData.dementia !== null &&
      formData.licenses.length > 0
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      return;
    }

    // API 요청을 위한 데이터 준비 (이전과 동일)
    const requestData = {
      email: formData.email,
      password: formData.password,
      roleType: 'MEMBER',
      name: formData.name,
      phone: formData.phone,
      gender: 1,
      birthday: '2002:03:27',
      addressDetail: formData.addressData.address + ' ' + formData.addressData.detailAddress,
      essentialCertNo: formData.licenseDetails.license1,
      careCertNo: formData.licenseDetails.license2,
      nurseCertNo: formData.licenseDetails.license3,
      postPartumCertNo: formData.licenseDetails.license4,
      helperOtherCerts: formData.licenses.filter(
        (license) => !['license1', 'license2', 'license3', 'license4'].includes(license),
      ),
      carOwnYn: formData.car === 'yes',
      eduYn: formData.dementia === 'yes',
    };

    try {
      const response = await request('POST', '/sign/up/helper', requestData)
      console.log('Successfully signed up:', response);
    } catch (error) {
      console.error('Error signing up:', error);
    }

    console.log('requestData:', requestData); // requestData 객체 출력


  const toggleLicense = (licenseType) => {
    setFormData((prev) => {
      const updatedLicenses = prev.licenses.includes(licenseType)
        ? prev.licenses.filter((item) => item !== licenseType)
        : [...prev.licenses, licenseType];

      // 자격증이 해제되면 해당 상세 정보도 초기화
      const updatedDetails = { ...prev.licenseDetails };
      if (!updatedLicenses.includes(licenseType)) {
        updatedDetails[licenseType] = '';
      }

      return {
        ...prev,
        licenses: updatedLicenses,
        licenseDetails: updatedDetails,
      };
    });
  };

  const handleLicenseDetail = (licenseType, value) => {
    setFormData((prev) => ({
      ...prev,
      licenseDetails: {
        ...prev.licenseDetails,
        [licenseType]: value,
      },
    }));
  };

  return (
    <main className='flex flex-col gap-4 max-w-2xl mx-auto'>
      <div className='flex flex-col gap-4'>
        <p className='text-left font-bold'>
          회원가입을 위해
          <br />
          개인정보를 입력해주세요!
        </p>
        <div className='flex items-center gap-2 mt-4 '>
          <span className='font-bold'>이메일</span>
        </div>
        <Input
          id='email'
          type='text'
          value={formData.email}
          onChange={handleChange}
          placeholder='이메일을 입력해주세요.'
          className='h-12'
        />

        <div className='flex items-center gap-2 mt-4 '>
          <span className='font-bold'>비밀번호</span>
          <span className='text-sm text-red-500'>필수</span>
        </div>
        <Input
          id='password'
          type='password'
          value={formData.password}
          onChange={handleChange}
          placeholder='비밀번호를 입력해주세요.'
          className='h-12'
        />

        <div className='flex items-center gap-2 mt-4 '>
          <span className='font-bold'>이름</span>
          <span className='text-sm text-red-500'>필수</span>
        </div>
        <Input
          id='name'
          type='text'
          value={formData.name}
          onChange={handleChange}
          placeholder='예) 홍길동'
          className='h-12'
        />

        <div className='flex items-center gap-2 mt-4 '>
          <span className='font-bold'>전화번호</span>
          <span className='text-sm text-red-500'>필수</span>
        </div>
        <Input
          id='phone'
          type='text'
          value={formData.phone}
          onChange={handleChange}
          placeholder='예) 010-0000-0000'
          className='h-12'
        />

        <div className='flex items-center gap-2 mt-4 '>
          <span className='font-bold'>주소</span>
          <span className='text-sm text-red-500'>필수</span>
        </div>
        <AddressSearch onAddressSelect={handleAddressChange} selectedAddress={formData.address} />

        <div className='flex items-center gap-2 mt-4 '>
          <span className='font-bold'>차량소유여부</span>
          <span className='text-sm text-red-500'>필수</span>
        </div>
        <div className='flex gap-6 items-center justify-center'>
          <Button
            className='flex gap-2 bg-white hover:bg-white text-black border border-gray-300'
            onClick={() => handleCarSelection('yes')}
          >
            <svg
              width='29'
              height='29'
              viewBox='0 0 29 29'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect
                width='29'
                height='29'
                rx='14.5'
                fill={formData.car === 'yes' ? 'var(--helper-primary)' : '#B6B6B6'}
              />
              <path
                d='M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z'
                fill='white'
              />
            </svg>
            예
          </Button>
          <Button
            className='flex gap-2 bg-white hover:bg-white text-black border border-gray-300'
            onClick={() => handleCarSelection('no')}
          >
            <svg
              width='29'
              height='29'
              viewBox='0 0 29 29'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect
                width='29'
                height='29'
                rx='14.5'
                fill={formData.car === 'no' ? 'var(--helper-primary)' : '#B6B6B6'}
              />
              <path
                d='M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z'
                fill='white'
              />
            </svg>
            아니요
          </Button>
        </div>

        <div className='flex items-center gap-2 mt-4 '>
          <span className='font-bold'>치매교육 이수 여부</span>
          <span className='text-sm text-red-500'>필수</span>
        </div>
        <div className='flex gap-6 justify-center'>
          <Button
            className='flex gap-2 bg-white hover:bg-white text-black border border-gray-300'
            onClick={() => handleDementiaSelection('yes')}
          >
            <svg
              width='29'
              height='29'
              viewBox='0 0 29 29'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect
                width='29'
                height='29'
                rx='14.5'
                fill={formData.dementia === 'yes' ? 'var(--helper-primary)' : '#B6B6B6'}
              />
              <path
                d='M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z'
                fill='white'
              />
            </svg>
            예
          </Button>
          <Button
            className='flex items-center gap-2 bg-white hover:bg-white text-black border border-gray-300'
            onClick={() => handleDementiaSelection('no')}
          >
            <svg
              width='29'
              height='29'
              viewBox='0 0 29 29'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect
                width='29'
                height='29'
                rx='14.5'
                fill={formData.dementia === 'no' ? 'var(--helper-primary)' : '#B6B6B6'}
              />
              <path
                d='M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z'
                fill='white'
              />
            </svg>
            아니요
          </Button>
        </div>

        <div className='flex items-center gap-2 mt-4 '>
          <span className='font-bold'>자격증 등록</span>
          <span className='text-sm text-red-500'>필수</span>
        </div>
        <div className='flex flex-col gap-6'>
          <Button
            className='flex items-center gap-2 bg-white hover:bg-white text-black border border-gray-300'
            onClick={() => toggleLicense('license1')}
          >
            <svg
              width='29'
              height='29'
              viewBox='0 0 29 29'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect
                width='29'
                height='29'
                rx='14.5'
                fill={formData.licenses.includes('license1') ? 'var(--helper-primary)' : '#B6B6B6'}
              />
              <path
                d='M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z'
                fill='white'
              />
            </svg>
            요양보호사
          </Button>
          {formData.licenses.includes('license1') && (
            <div className='mt-2'>
              <Input
                type='text'
                placeholder='자격증번호를 입력해주세요'
                value={formData.licenseDetails.license1}
                onChange={(e) => handleLicenseDetail('license1', e.target.value)}
                className='w-full'
              />
            </div>
          )}
          <Button
            className='flex items-center gap-2 bg-white hover:bg-white text-black border border-gray-300'
            onClick={() => toggleLicense('license2')}
          >
            <svg
              width='29'
              height='29'
              viewBox='0 0 29 29'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect
                width='29'
                height='29'
                rx='14.5'
                fill={formData.licenses.includes('license2') ? 'var(--helper-primary)' : '#B6B6B6'}
              />
              <path
                d='M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z'
                fill='white'
              />
            </svg>
            간병사
          </Button>
          {formData.licenses.includes('license2') && (
            <div className='mt-2'>
              <Input
                type='text'
                placeholder='자격증번호를 입력해주세요'
                value={formData.licenseDetails.license2}
                onChange={(e) => handleLicenseDetail('license2', e.target.value)}
                className='w-full'
              />
            </div>
          )}
          <Button
            className='flex items-center gap-2 bg-white hover:bg-white text-black border border-gray-300'
            onClick={() => toggleLicense('license3')}
          >
            <svg
              width='29'
              height='29'
              viewBox='0 0 29 29'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect
                width='29'
                height='29'
                rx='14.5'
                fill={formData.licenses.includes('license3') ? 'var(--helper-primary)' : '#B6B6B6'}
              />
              <path
                d='M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z'
                fill='white'
              />
            </svg>
            병원동행매니저
          </Button>
          {formData.licenses.includes('license3') && (
            <div className='mt-2'>
              <Input
                type='text'
                placeholder='자격증번호를 입력해주세요'
                value={formData.licenseDetails.license3}
                onChange={(e) => handleLicenseDetail('license3', e.target.value)}
                className='w-full'
              />
            </div>
          )}
          <Button
            className='flex items-center gap-2 bg-white hover:bg-white text-black border border-gray-300'
            onClick={() => toggleLicense('license4')}
          >
            <svg
              width='29'
              height='29'
              viewBox='0 0 29 29'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect
                width='29'
                height='29'
                rx='14.5'
                fill={formData.licenses.includes('license4') ? 'var(--helper-primary)' : '#B6B6B6'}
              />
              <path
                d='M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z'
                fill='white'
              />
            </svg>
            산후관리사
          </Button>
          {formData.licenses.includes('license4') && (
            <div className='mt-2'>
              <Input
                type='text'
                placeholder='자격증번호를 입력해주세요'
                value={formData.licenseDetails.license4}
                onChange={(e) => handleLicenseDetail('license4', e.target.value)}
                className='w-full'
              />
            </div>
          )}
          <Button
            className='flex items-center gap-2 bg-white hover:bg-white text-black border border-gray-300'
            onClick={() => toggleLicense('license5')}
          >
            <svg
              width='29'
              height='29'
              viewBox='0 0 29 29'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <rect
                width='29'
                height='29'
                rx='14.5'
                fill={formData.licenses.includes('license5') ? 'var(--helper-primary)' : '#B6B6B6'}
              />
              <path
                d='M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z'
                fill='white'
              />
            </svg>
            기타
          </Button>

          {formData.licenses.includes('license5') && (
            <div className='mt-2'>
              <Input
                type='text'
                placeholder='자격증번호를 입력해주세요'
                value={formData.licenseDetails.license5}
                onChange={(e) => handleLicenseDetail('license5', e.target.value)}
                className='w-full '
              />
            </div>
          )}
        </div>

        <div className='flex justify-between '>
          <Button
            onClick={handlePrev}
            className='bg-[var(--helper-primary)] hover:bg-[var(--helper-primary)]/90 text-white'
          >
            이전
          </Button>

          <Button
            className='bg-[var(--helper-primary)] hover:bg-[var(--helper-primary)]/90 text-white'
            onClick={handleSubmit}
            disabled={!isFormValid()}
          >
            가입하기
          </Button>
        </div>
      </div>
    </main>
  );
}
