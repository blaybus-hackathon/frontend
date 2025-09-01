import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/custom/Button';

import useProfileStore from '@/store/useProfileStore';
import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';
import useHelperAccountStore from '@/store/helper/useHelperAccoutStore';

const CARE_TYPES = {
  workTypes: [
    { id: 'work_homecare', label: '방문요양', careVal: 1 },
    { id: 'work_livein', label: '입주요양', careVal: 2 },
    { id: 'work_bath', label: '방문목욕', careVal: 4 },
    { id: 'work_daycare', label: '주야간보호', careVal: 8 },
    { id: 'work_nursinghome', label: '요양원', careVal: 16 },
    { id: 'temp', label: '병원', careVal: 32 },
    { id: 'work_hospitalescort', label: '병원동행', careVal: 64 },
  ],
  careGrade: [
    { id: 'none', label: '등급 없음', careVal: 1 },
    { id: '1', label: '1등급', careVal: 2 },
    { id: '2', label: '2등급', careVal: 4 },
    { id: '3', label: '3등급', careVal: 8 },
    { id: '4', label: '4등급', careVal: 16 },
    { id: '5', label: '5등급', careVal: 32 },
    { id: '6', label: '인지지원등급', careVal: 64 },
  ],
  gender: [
    { id: 'male', label: '남성' },
    { id: 'female', label: '여성' },
  ],
  livingArrangement: [
    { id: 'alone', label: '독거', careVal: 1 },
    { id: 'Spouse_in', label: '배우자와 동거, 돌봄 시간 중 집에 있음', careVal: 2 },
    { id: 'Spouse_out', label: '배우자와 동거, 돌봄 시간 중 자리 비움', careVal: 4 },
    { id: 'family_in', label: '다른 가족과 동거, 돌봄 시간 중 집에 있음', careVal: 8 },
    { id: 'family_out', label: '다른 가족과 동거, 돌봄 시간 중 집에 비움', careVal: 16 },
  ],
  mealCare: [
    { id: '4', label: '스스로 가능', careVal: 1 },
    { id: '3', label: '식사 차려드리기', careVal: 2 },
    { id: '2', label: '요리 필요', careVal: 4 },
    { id: '1', label: '경관식 보조', careVal: 8 },
  ],
  mobilitySupport: [
    { id: '1', label: '스스로 가능', careVal: 1 },
    { id: '2', label: '부축 도움', careVal: 2 },
    { id: '3', label: '휠체어 이동', careVal: 4 },
    { id: '4', label: '거동 불가', careVal: 8 },
  ],
  dailyLife: [
    { id: 'daily_cleaning', label: '청소, 빨래 보조', careVal: 1 },
    { id: 'daily_bath', label: '목욕 보조', careVal: 2 },
    { id: 'daily_hospital', label: '병원 동행', careVal: 4 },
    { id: 'daily_walk', label: '산책, 간단한 운동', careVal: 8 },
    { id: 'daily_talk', label: '말벗, 정서지원', careVal: 16 },
    { id: 'daily_cognitive', label: '인지자극 활동', careVal: 32 },
  ],
};

export default function AccountCareType() {
  const navigate = useNavigate();
  const { profile, profileEdit, initializeProfileEdit, updateCareTypeField } = useProfileStore();
  const { addWorkTypeNames, deleteWorkTypeName, helper, setPart } = useHelperAccountStore();
  const setHeaderProps = useHeaderPropsStore((state) => state.setHeaderProps);
  const clearHeaderProps = useHeaderPropsStore((state) => state.clearHeaderProps);

  const [workTypeBits, setWorkTypeBits] = useState(new Set());
  const [dailyBits, setDailyBits] = useState(new Set());

  useEffect(() => {
    setHeaderProps({
      type: 'back',
      title: '돌봄유형 설정',
      onBack: () => navigate(-1),
    });
    return () => {
      clearHeaderProps();
    };
  }, []);
  useEffect(() => {
    getWorkTypeBits(helper.workType);
    getDailyBits(helper.serviceDaily);
  }, []);
  useEffect(() => {
    if (!profileEdit) {
      initializeProfileEdit(profile);
    }
  }, [profile, profileEdit, initializeProfileEdit]);

  const handleSave = () => {
    if (helper.workType === 0) {
      alert('근무 종류를 최소 1개 이상 선택해주세요.');
      return;
    }
    navigate('/helper/account/edit'); // Zustand에 저장했으므로 navigate만
  };

  const getWorkTypeBits = (bit) => {
    const res = [];

    for (let i = 0; i < 7; i++) {
      const mask = 1 << i;
      if (bit & mask) {
        res.push(mask);
      }
    }

    setWorkTypeBits(new Set(res));
  };

  const getDailyBits = (bit) => {
    const res = [];

    for (let i = 0; i < 7; i++) {
      const mask = 1 << i;
      if (bit & mask) {
        res.push(mask);
      }
    }

    setDailyBits(new Set(res));
  };

  const toggleWorkType = (label, careVal) => {
    if (workTypeBits.has(careVal)) {
      setWorkTypeBits((prev) => {
        const newSet = new Set(prev);
        newSet.delete(careVal);
        return newSet;
      });
      setPart({ workType: helper.workType - careVal });

      deleteWorkTypeName(label);
    } else {
      setWorkTypeBits((prev) => {
        const newSet = new Set(prev);
        newSet.add(careVal);
        return newSet;
      });
      setPart({ workType: helper.workType + careVal });

      addWorkTypeNames(label);
    }
  };

  const toggleDaily = (careVal) => {
    if (dailyBits.has(careVal)) {
      setDailyBits((prev) => {
        const newSet = new Set(prev);
        newSet.delete(careVal);
        return newSet;
      });
      setPart({ serviceDaily: helper.serviceDaily - careVal });
    } else {
      setDailyBits((prev) => {
        const newSet = new Set(prev);
        newSet.add(careVal);
        return newSet;
      });
      setPart({ serviceDaily: helper.serviceDaily - careVal });
    }
  };

  return (
    <main className='max-w-md mx-auto flex flex-col gap-6'>
      {/* 근무 종류 (다중 선택) */}
      <section className='flex flex-col gap-13 py-10'>
        <section>
          <div className='flex flex-col items-start gap-2.5 self-stretch'>
            <span className='helper-title'>희망하는 근무 종류를 선택해 주세요!</span>
            <span className='profile-section__content-text'>(최대 선택 5개)</span>
          </div>

          <div className='grid grid-cols-1 gap-2 mt-4'>
            {CARE_TYPES.workTypes.map(({ id, label, careVal }) => {
              const isSelected = workTypeBits.has(careVal);

              return (
                <Button
                  key={id}
                  type='button'
                  variant='white'
                  size='default'
                  onClick={() => toggleWorkType(label, careVal)}
                  className='border-gray-400 gap-2 justify-start !px-6 w-full cursor-pointer mb-0 text-black'
                >
                  <svg
                    width='29'
                    height='29'
                    viewBox='0 0 29 29'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-full w-auto'
                  >
                    <rect
                      width='29'
                      height='29'
                      rx='14.5'
                      fill={isSelected ? 'var(--main)' : '#B6B6B6'} // 선택 시 색상 변경
                    />
                    <path
                      d='M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z'
                      fill='white'
                    />
                  </svg>
                  {label} {/* label을 사용하여 레이블을 표시 */}
                </Button>
              );
            })}
          </div>
        </section>

        <section className=''>
          <div className='flex flex-col items-start gap-2.5 self-stretch'>
            <span className='helper-title'>
              장기요양등급
              <span className='helper-title_sub '>선택</span>
            </span>
          </div>

          <div className='grid grid-cols-2 gap-2 mt-4'>
            {CARE_TYPES.careGrade.map(({ id, label, careVal }) => {
              const isSelected = helper.careLevel === careVal;

              return (
                <Button
                  key={id}
                  type='button'
                  variant={isSelected ? 'default' : 'outline'}
                  size='default'
                  onClick={() => setPart({ careLevel: careVal })}
                  className='border-gray-400 gap-2 justify-center !px-6 w-full cursor-pointer mb-0'
                >
                  {label}
                </Button>
              );
            })}
          </div>
        </section>

        {/* 성별 */}
        <section className=''>
          <div className='flex flex-col items-start gap-2.5 self-stretch'>
            <span className='helper-title'>
              성별
              <span className='helper-title_sub '>선택</span>
            </span>
          </div>
          <div className='grid grid-cols-2 gap-2 mt-4'>
            {[...Array(2)].map((_, idx) => {
              const isSelected = helper.careGender === idx + 1;

              return (
                <Button
                  key={idx}
                  type='button'
                  variant={isSelected ? 'default' : 'outline'}
                  size='default'
                  onClick={() => setPart({ careGender: idx + 1 })}
                  className='border-gray-400 gap-2 justify-center !px-6 w-full cursor-pointer mb-0'
                >
                  {idx === 0 ? '남성' : '여성'}
                </Button>
              );
            })}
          </div>
        </section>

        {/* 동거인 여부 */}
        <section className=''>
          <div className='flex flex-col items-start gap-2.5 self-stretch mt-4'>
            <span className='helper-title'>
              동거인 여부
              <span className='helper-title_sub '>선택</span>
            </span>
          </div>
          <div className='grid gap-2 mt-4'>
            {CARE_TYPES.livingArrangement.map(({ id, label, careVal }) => {
              const isSelected = helper.inmateState === careVal;

              return (
                <Button
                  key={id}
                  type='button'
                  variant={isSelected ? 'default' : 'outline'}
                  size='default'
                  onClick={() => setPart({ inmateState: careVal })}
                  className='border-gray-400 gap-2 justify-start pl-6 w-full cursor-pointer mb-0'
                >
                  {label}
                </Button>
              );
            })}
          </div>
        </section>

        {/* 식사보조 */}
        <section className=''>
          <div className='flex flex-col items-start gap-2.5 self-stretch '>
            <span className='helper-title'>
              식사 보조
              <span className='helper-title_sub '>선택</span>
            </span>
          </div>

          <div className='grid grid-cols-2 gap-2 mt-4'>
            {CARE_TYPES.mealCare.map(({ id, label, careVal }) => {
              const isSelected = helper.serviceMeal === careVal;

              return (
                <Button
                  key={id}
                  type='button'
                  variant={isSelected ? 'default' : 'outline'}
                  size='default'
                  onClick={() => setPart({ serviceMeal: careVal })}
                  className='border-gray-400 gap-2 justify-center !px-6 w-full cursor-pointer mb-0'
                >
                  {label}
                </Button>
              );
            })}
          </div>
        </section>

        {/* 이동보조 */}
        <section className=''>
          <div className='flex flex-col items-start gap-2.5 self-stretch '>
            <span className='helper-title'>
              이동 보조
              <span className='helper-title_sub '>선택</span>
            </span>
          </div>
          <div className='grid grid-cols-2 gap-2 mt-4'>
            {CARE_TYPES.mobilitySupport.map(({ id, label, careVal }) => {
              const isSelected = helper.serviceMobility === careVal;

              return (
                <Button
                  key={id}
                  type='button'
                  variant={isSelected ? 'default' : 'outline'}
                  size='default'
                  onClick={() => setPart({ serviceMobility: careVal })}
                  className='border-gray-400 gap-2 justify-center !px-6 w-full cursor-pointer mb-0'
                >
                  {label}
                </Button>
              );
            })}
          </div>
        </section>

        {/* 일상생활 */}
        <section className=''>
          <div className='flex flex-col items-start gap-2.5 self-stretch'>
            <span className='helper-title'>
              일상 생활
              <span className='helper-title_sub '>선택</span>
            </span>
          </div>
          <div className='grid grid-cols-2 gap-2 mt-4'>
            {CARE_TYPES.dailyLife.map(({ id, label, careVal }) => {
              const isSelected = dailyBits.has(careVal);
              return (
                <Button
                  key={id}
                  type='button'
                  variant={isSelected ? 'default' : 'outline'}
                  size='default'
                  onClick={() => toggleDaily(careVal)}
                  className='border-gray-400 gap-2 justify-center !px-6 w-full cursor-pointer mb-0'
                >
                  {label}
                </Button>
              );
            })}
          </div>
        </section>

        {/* 저장 버튼 */}
        <Button onClick={handleSave} className='w-full mt-4'>
          저장하기
        </Button>
      </section>
    </main>
  );
}
