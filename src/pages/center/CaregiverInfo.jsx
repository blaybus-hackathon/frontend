import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';
import { useHelperInfoStore } from '@/store/center/useHelperInfoStore';
import { Button } from '@/components/ui/custom/Button';
import { request } from '@/api';

import map_pin from '@/assets/images/map-pin.png';
import card from '@/assets/images/card.png';
import sun from '@/assets/images/sun.png';
import defaultProfile from '@/assets/images/elder-basic-profile.png';

// 자격증 종류
const CERT = ['요양보호사', '간병사', '병원동행매니저', ' 산후 관리사', '기타'];

export default function CaregiverInfo() {
  const navigate = useNavigate();
  const helperSeq = useLocation().state.helperSeq;
  // const helperSeq = 1;

  const [censored, setCensored] = useState(true);

  const setHeaderProps = useHeaderPropsStore((state) => state.setHeaderProps);
  const clearHeaderProps = useHeaderPropsStore((state) => state.clearHeaderProps);
  const { helperInfo, setHelperInfo } = useHelperInfoStore();

  // 헤더 세팅
  useEffect(() => {
    setHeaderProps({
      type: 'back',
      title: '요양사 상세 정보',
      onBack: () => {
        navigate(-1);
      },
    });
    return () => {
      clearHeaderProps();
    };
  }, [clearHeaderProps, navigate, setHeaderProps]);

  useEffect(() => {
    request('post', '/detail/helper-info', { helperSeq })
      .then((res) => {
        setHelperInfo(res);
      })
      .catch(() => {});
  }, [helperSeq, setHelperInfo]);

  const renderCertification = () =>
    CERT.map((c, idx) => (
      <div
        key={idx}
        className={`h-16 w-full rounded-[10px] text-xl leading-16 text-center ${
          helperInfo.cetificates?.include(c)
            ? 'bg-[var(--main)] text-white'
            : 'border border-[var(--outline)]'
        }`}
      >
        {c}
      </div>
    ));

  return (
    <div>
      <div className='max-w-2xl mx-auto'>
        <div className='flex mt-10 items-center mb-13'>
          <img src={defaultProfile} className='rounded-[50%] size-25 mr-7' />
          <div className='flex flex-col items-start gap-5'>
            <p className='text-2xl font-bold'>{helperInfo.name}</p>
            <p className='text-lg'>{helperInfo.addressDetail}</p>
          </div>
        </div>
        <div className='flex gap-10 flex-col mb-5'>
          <div className='flex flex-col items-start w-full'>
            <label className='font-semibold text-xl mb-5'>자기소개</label>
            <div className='border border-[#C8C8C8] w-full rounded-md h-34 px-2 py-3 text-left relative'>
              <div className={`h-full ${censored && 'blur-lg'}`}>내가 최고야</div>
              {censored && (
                <p className='font-semibold absolute top-1/2 left-1/2 -translate-1/2'>
                  매칭 후 열람 가능합니다
                </p>
              )}
            </div>
          </div>
          <div className='flex flex-col w-full'>
            <label className='font-semibold text-xl flex-1 h-full flex items-center mb-5'>
              간병경력
            </label>
            <div className='relative'>
              <div className={`text-xl flex ${censored && 'blur-3xl'} gap-8`}>
                <div className='flex-1 border h-16 bg-[var(--main)] flex justify-center items-center rounded-[10px] text-white'>
                  신입
                </div>
                <div className='flex-1 border h-16 border-[var(--outline)] flex justify-center items-center rounded-[10px]'>
                  경력
                </div>
              </div>
              {censored && (
                <p
                  className='font-semibold absolute top-1/2 left-1/2 -translate-1/2'
                  onClick={() => {
                    setCensored(false);
                  }}
                >
                  매칭 후 열람 가능합니다
                </p>
              )}
            </div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-5'>나의 선호 지역</label>
            <div className='h-16 w-full rounded-md flex border border-[#C8C8C8] font-medium text-lg'>
              <div className='flex items-center ml-5 text-xl'>
                <img src={map_pin} className='size-6 mr-5' />
                강남구
              </div>
            </div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-4'>나의 근무 가능 일정</label>
            <div className='border border-[#C8C8C8] font-medium text-lg flex justify-center items-center rounded-md w-full p-5 flex'>
              <img src={map_pin} className='size-6 mr-5' />
              <div className='flex-1'>
                <p>월,화,수 &gt; 13:00~20:00</p>
                <p>목,금,토 &gt; 12:00~18:00</p>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-5'>희망 급여</label>
            <div className='h-16 border border-[#C8C8C8] font-medium text-lg flex rounded-md w-full'>
              <div className='flex items-center ml-5 text-xl'>
                <img src={card} className='size-6 mr-5' />
                {helperInfo.wage}원
              </div>
            </div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-5'>희망 돌봄유형</label>
            <div className='h-16 border border-[#C8C8C8] font-medium text-lg flex rounded-md w-full'>
              <div className='flex items-center ml-5 text-xl'>
                <img src={sun} className='size-6 mr-5' />
                방문요양
              </div>
            </div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-5'>주소지</label>
            <div className='h-16 w-full rounded-md flex border border-[#C8C8C8] font-medium text-lg'>
              <div className='flex items-center ml-5 text-xl'>
                <img src={map_pin} className='size-6 mr-5' />
                {helperInfo.addressDetail}
              </div>
            </div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-4'>자격증</label>
            <div className='w-full flex flex-col gap-5'>{renderCertification()}</div>
          </div>

          <Button className='h-16 w-full bg-[var(--company-primary)] text-xl hover:bg-[var(--company-primary)]/90 font-bold'>
            매칭 요청하기
          </Button>
        </div>
      </div>
    </div>
  );
}
