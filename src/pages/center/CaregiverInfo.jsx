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
import backarrow from '@/assets/images/back-arrow.png';
import { DAYS } from '@/constants/days';

// 자격증 종류
const CERT = ['요양보호사', '간병사', '병원동행매니저', ' 산후 관리사', '기타'];

export default function CaregiverInfo() {
  const navigate = useNavigate();
  // const helperSeq = useLocation().state.helperSeq;
  const helperSeq = 2;

  const [afss, setAfss] = useState([]);
  const [asss, setAsss] = useState([]);
  const [atss, setAtss] = useState([]);
  const [workTypes, setWorkTypes] = useState([]);

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
    // request('post', '/detail/helper-info', { helperSeq })
    //   .then((res) => {
    //     setHelperInfo(res);
    //   })
    //   .catch(() => {});
    getInitialInfo();
  }, []);

  const getInitialInfo = async () => {
    try {
      const helperInfo = await request('post', '/detail/helper-info', { helperSeq });
      setHelperInfo(helperInfo);

      setAfss([]);
      setAsss([]);
      setAtss([]);
      const fetchedafss = await request('get', '/get-first-addr');
      for (let location of helperInfo.helperWorkLocation) {
        let first = fetchedafss.find((item) => item.id === location.afSeq);
        setAfss((prev) => [...prev, first.name]);
        const fetchedasss = await request('get', `/second/${location.afSeq}`);
        let second = fetchedasss.find((item) => item.id === location.asSeq);
        setAsss((prev) => [...prev, second.name]);
        const fetchedatss = await request('get', `/third/${location.asSeq}`);
        let third = fetchedatss.find((item) => item.id === location.atSeq);
        setAtss((prev) => [...prev, third.name]);
      }

      const wtype = await request('post', '/cmn/part-request-care-list', {
        careTopEnumList: ['WORK_TYPE'],
      });
      setWorkTypes(wtype.workTypeList);
    } catch (e) {
      console.error('요양보호사 정보 가져오기 실패 : ' + e);
    }
  };

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

  const renderLocation = () =>
    afss.map((loc, idx) => {
      return (
        <div key={idx} className='flex items-center'>
          <span className='mr-2'>{loc.length === 4 ? loc[0] + loc[2] : loc.slice(0, 2)}</span>
          <img src={backarrow} className='size-4 rotate-180' />
          <span>{`${asss[idx]}(${atss[idx]})`}</span>
        </div>
      );
    });

  const renderWorkTime = () => {
    const grouped = {};
    helperInfo.helperWorkTime.forEach(({ startTime, endTime, date }) => {
      const time = `${startTime} ~ ${endTime}`;
      if (!grouped[time]) grouped[time] = [];
      grouped[time].push(DAYS[date - 1][0]);
    });

    return Object.entries(grouped).map(([t, d], idx) => (
      <div key={idx} className='flex items-center'>
        <span className='mr-2'>{d.join(',')}</span>
        <img src={backarrow} className='size-4 rotate-180' />
        <span>{t}</span>
      </div>
    ));
  };

  const getWorkType = () => {
    if (workTypes.length === 0) return;
    const workTypeBit = helperInfo.workType;
    const res = [];

    for (let i = 0; i < 7; i++) {
      const mask = 1 << i;
      if (workTypeBit & mask) {
        res.push(mask);
      }
    }

    return workTypes
      .filter((x) => res.includes(x.careVal))
      .map((y) => y.careName)
      .join(', ');
  };

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
              <div className='h-full'>{helperInfo.introduce}</div>
            </div>
          </div>
          <div className='flex flex-col w-full'>
            <label className='font-semibold text-xl flex-1 h-full flex items-center mb-5'>
              간병경력
            </label>
            <div className='relative'>
              <div className='text-xl flex gap-8'>
                <div
                  className={`flex-1 border h-16 flex justify-center items-center rounded-[10px] ${
                    helperInfo.careExperience
                      ? 'border-[var(--outline)] border'
                      : 'text-white bg-[var(--main)]'
                  }`}
                >
                  신입
                </div>
                <div
                  className={`flex-1 h-16 flex justify-center items-center rounded-[10px] ${
                    helperInfo.careExperience
                      ? 'text-white bg-[var(--main)]'
                      : 'border-[var(--outline)] border'
                  }`}
                >
                  경력
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-5'>나의 선호 지역</label>
            <div className='h-16 w-full rounded-md flex border border-[#C8C8C8] font-medium text-lg'>
              <div className='flex items-center ml-5 text-xl'>
                <img src={map_pin} className='size-6 mr-5' />
                <div className='text-base'>{renderLocation()}</div>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-4'>나의 근무 가능 일정</label>
            <div className='border border-[#C8C8C8] font-medium text-lg flex justify-center items-center rounded-md w-full p-5 flex'>
              <img src={map_pin} className='size-6 mr-5' />
              <div className='flex-1 text-start'>{renderWorkTime()}</div>
            </div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-5'>희망 급여</label>
            <div className='h-16 border border-[#C8C8C8] font-medium text-lg flex rounded-md w-full'>
              <div className='flex items-center ml-5 text-xl'>
                <img src={card} className='size-6 mr-5' />
                <span className='mr-2'>시급</span> <span> {helperInfo.wage}원</span>
              </div>
            </div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-5'>희망 돌봄유형</label>
            <div className='h-16 border border-[#C8C8C8] font-medium text-lg flex rounded-md w-full'>
              <div className='flex items-center ml-5'>
                <img src={sun} className='size-6 mr-5' />
                {getWorkType()}
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
