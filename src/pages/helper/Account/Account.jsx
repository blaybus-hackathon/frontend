// ✅ 1. 외부 라이브러리 (React 및 패키지)
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// ✅ 2. 상태 관리 (스토어, 컨텍스트 등)
import useScheduleStore from '@/store/suho/useScheduleStore';
import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';
import useAuthStore from '@/store/useAuthStore';
import useHelperAccountStore from '@/store/helper/useHelperAccoutStore';
import useHelperLocationStore from '@/store/suho/useHelperLocationStore';
// import { useAddressStore } from '@/store/useAddressStore';

// ✅ 3. UI 컴포넌트 (공통 UI → 커스텀 컴포넌트 순)
import { Button } from '@/components/ui/custom/Button';
import { request } from '@/api';

// ✅ 4. 이미지 및 정적 파일
import location_icon from '@/assets/images/location.png';
import overview from '@/assets/images/overview.png';
import backarrow from '@/assets/images/back-arrow.png';
import homecontrols from '@/assets/images/home-controls.png';
import { DAYS } from '@/constants/days';

export default function Account() {
  const { updateSchedule } = useScheduleStore();
  const PAY_TYPES = ['시급', '일급', '주급'];

  const { user } = useAuthStore();
  const { helper, setHelper, workTypeNames, setWorkTypeNames } = useHelperAccountStore();
  const { addDistrict } = useHelperLocationStore();
  // const { getAddressNameById } = useAddressStore();

  const navigate = useNavigate();

  const setHeaderProps = useHeaderPropsStore((state) => state.setHeaderProps);
  const clearHeaderProps = useHeaderPropsStore((state) => state.clearHeaderProps);

  const [afss, setAfss] = useState([]);
  const [asss, setAsss] = useState([]);
  const [atss, setAtss] = useState([]);

  useEffect(() => {
    setHeaderProps({
      type: 'back',
      title: '나의 계정',
      onBack: () => {
        navigate(-1);
      },
    });
    return () => {
      clearHeaderProps();
    };
  }, []);

  useEffect(() => {
    getInitialInfo();
  }, []);

  const handleEdit = () => {
    navigate('/helper/account/edit', {
      state: { from: '/helper/account' },
    });
  };

  const getInitialInfo = async () => {
    const helperSeq = user.helperSeq;
    try {
      const helperInfo = await request('post', '/detail/helper-info', { helperSeq });
      setHelper(helperInfo);

      // const { afSeq, asSeq, atSeq } = helperInfo.helperWorkLocation[0];
      // console.log(getAddressNameById({ afSeq, asSeq, atSeq }));

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

        addDistrict(first.name, second.name, third.name);

        for (let sch of helperInfo.helperWorkTime) {
          updateSchedule(DAYS[sch.date - 1][0], 'start', sch.startTime);
          updateSchedule(DAYS[sch.date - 1][0], 'end', sch.endTime);
        }
      }

      const wtype = await request('post', '/cmn/part-request-care-list', {
        careTopEnumList: ['WORK_TYPE'],
      });
      setWorkTypeNames(getWorkType(wtype.workTypeList, helperInfo.workType).split(', '));
    } catch (e) {
      console.error('나의 정보를 가져오는데 실패했습니다 : ' + e);
    }
  };

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
    helper.helperWorkTime.forEach(({ startTime, endTime, date }) => {
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

  const getWorkType = (wtps, wtb) => {
    if (!wtps) return;
    const res = [];

    for (let i = 0; i < 7; i++) {
      const mask = 1 << i;
      if (wtb & mask) {
        res.push(mask);
      }
    }

    const data = wtps.filter((x) => res.includes(x.careVal)).map((y) => y.careName);

    return data.join(', ');
  };

  return (
    <>
      <main className='max-w-md mx-auto flex flex-col '>
        {/* 기본 정보 */}
        <section className='flex flex-col items-stretch gap-12 mt-6'>
          {/* 프로필 이미지 */}
          <section className='flex items-center gap-12 '>
            <div className='relative w-24 h-24'>
              <img
                src={helper.img || '/defaultProfile.png'}
                alt='profile_image'
                className='w-24 h-24 rounded-full bg-[#DCDCDC]'
              />
            </div>
            <div className='flex flex-col gap-5 items-start'>
              <span className='text-[#191919] text-[23px] font-bold leading-none h-auto '>
                {helper.name || '알수 없음'}
              </span>
              <span className='text-[#191919] font-pretendard text-[20px] font-medium leading-none '>
                {helper.addressDetail || '주소 불명'}
              </span>
            </div>
          </section>

          {/* 자기 소개 섹션 */}
          <section className='helper-section'>
            <span className='helper-title'>자기소개</span>
            <div
              className='
  text-left
    resize-none overflow-hidden min-h-[4rem] self-stretch
    p-[26px_17px]
    rounded-[10px] border border-[#C8C8C8] bg-white
  '
            >
              <span
                className={`
      ${helper.introduce ? 'text-[#191919]' : 'text-[#C8C8C8]'}
       profile-section__content-text 
    `}
              >
                {helper.introduce || '소개 없음'}
              </span>
            </div>
          </section>

          {/* 간병 경력 섹션 */}
          <section className='helper-section'>
            <span className='helper-title'>간병경력이 있으신가요?</span>

            <div className='profile-section__content-box justify-center'>
              <span className='profile-section__content-text'>
                {helper.careExperience ? '경력' : '신입'}
              </span>
            </div>
          </section>

          {/* 선호 지역 섹션 */}
          <section className='helper-section'>
            <span className='helper-title'>선호지역</span>

            <div className='profile-section__content-box'>
              <img className='w-[24px] h-[24px]' src={location_icon} alt='location_icon' />
              <div className='flex flex-col items-center gap-1 py-1'>
                {helper.helperWorkLocation.length > 0 ? renderLocation() : <p>근무선호지역 없음</p>}
              </div>
            </div>
          </section>

          {/* 나의 근무 가능 일정 섹션 */}
          <section className='helper-section'>
            <span className='helper-title'>나의 근무 가능 일정</span>
            <div className='profile-section__content-box'>
              <img className='w-[24px] h-[24px] ' src={location_icon} alt='location_icon' />

              <div>
                {helper.helperWorkTime.length > 0 ? renderWorkTime() : <p>근무 가능 시간 없음</p>}
              </div>
            </div>
          </section>

          {/* 급여 섹션 */}
          <section className='helper-section'>
            <span className='helper-title'>나의 희망급여</span>
            <div className='profile-section__content-box'>
              <img className='w-[24px] h-[24px]' src={overview} alt='overview_icon' />
              <span className='profile-section__content-text'>
                {PAY_TYPES[helper.wageState - 1]}
              </span>
              <img src={backarrow} alt='backarrow' className='w-4 h-4 rotate-180' />
              <span className='profile-section__content-text'>{helper.wage}원</span>
            </div>
          </section>

          {/* 돌봄 유형 섹션*/}
          <section className='helper-section'>
            <span className='helper-title'>나의 희망 돌봄유형</span>

            <div className='profile-section__content-box'>
              <img className='w-[24px] h-[24px]' src={homecontrols} alt='homeControls_icon' />
              <span className='profile-section__content-text'>{workTypeNames.join(', ')}</span>
            </div>
          </section>

          {/* 자격증 등록 섹션*/}
          <section className='helper-section'>
            <span className='helper-title'>나의 소지 자격증</span>

            <div className='profile-section__content-box'>
              <img className='w-[24px] h-[24px]' src={homecontrols} alt='homeControls_icon' />
              <span className='profile-section__content-text'>
                {helper.certificates.map((cert) => cert.certName).join(', ')}
              </span>
            </div>
          </section>
        </section>
        <Button variant='white' onClick={handleEdit} className='m-6'>
          수정하기
        </Button>
      </main>
    </>
  );
}
