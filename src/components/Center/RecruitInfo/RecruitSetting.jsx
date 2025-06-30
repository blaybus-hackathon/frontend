// === Post Recruit Page 3 ===
import { Input } from '@/components/ui/custom/input';
import { Button } from '@/components/ui/custom/Button';
import { useState, useEffect } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/custom/select';
import patientStore from '@/store/jbStore/patientStore';
import { request } from '@/api';

export default function MatchingManage3({ handleMatchingPage }) {
  const { patientData, setRecruit } = patientStore();

  //날짜, 시간 값
  const DAYS = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];
  const WORKTIME = [
    '00:00',
    '01:00',
    '02:00',
    '03:00',
    '04:00',
    '05:00',
    '06:00',
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
    '23:00',
  ];

  // selected buttons
  const [selectedDays, setSelectedDays] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });
  const [selectedWorkType, setSelectedWorkType] = useState();
  const [selectedBenefits, setSelectedBenefits] = useState([]);

  // 날짜, 급여, 협의가능, 복리후생
  const [wage, setWage] = useState(0);
  const [wageState, setWageState] = useState(1);
  const [payNego, setPayNego] = useState(false);
  const [benefits, setBenefits] = useState([]);
  const [workTypes, setWorkTypes] = useState([]);
  const [timeNego, setTimeNego] = useState(false);
  const [workStartTimes, setWorkStartTimes] = useState({});
  const [workEndTimes, setWorkEndTimes] = useState({});

  //비트값
  const [ptDateBit, setPtDateBit] = useState(0);
  const [benefitBit, setBenefitBit] = useState(0);
  const [workTypeBit, setWorkTypeBit] = useState(0);

  useEffect(() => {
    console.log(patientData.afSeq, typeof patientData.afSeq);
    request('post', '/cmn/part-request-care-list', {
      careTopEnumList: ['WORK_TYPE', 'WELFARE'],
    })
      .then((res) => {
        setWorkTypes(res.workTypeList);
        setBenefits(res.welfareList);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  //요일 선택 렌더링
  const renderDays = () =>
    DAYS.map((day, idx) => (
      <Button
        key={idx}
        variant={selectedDays[idx] ? 'default' : 'outline'}
        className='h-16 text-lg font-medium w-full mb-0'
        onClick={() => {
          if (selectedDays[idx] === false) {
            setPtDateBit((prev) => prev + idx + 1);
          } else {
            setPtDateBit((prev) => prev - idx - 1);
            setWorkStartTimes((prev) => {
              const { [idx]: _, ...rest } = prev;
              return rest;
            });
            setWorkEndTimes((prev) => {
              const { [idx]: _, ...rest } = prev;
              return rest;
            });
          }

          setSelectedDays((prev) => ({ ...prev, [idx]: !prev[idx] }));
        }}
      >
        {day}
      </Button>
    ));

  //복리후생 렌더링
  const renderBenefit = () =>
    benefits.map((benefit, idx) => (
      <Button
        key={idx}
        variant={selectedBenefits.includes(idx) ? 'default' : 'outline'}
        className='w-full mb-0 h-16'
        onClick={() => {
          if (selectedBenefits.includes(idx)) {
            setBenefitBit((prev) => prev - benefit.careVal);
          } else {
            setBenefitBit((prev) => prev + benefit.careVal);
          }
          setSelectedBenefits((prev) =>
            prev.includes(idx) ? prev.filter((x) => x !== idx) : [...prev, idx],
          );
        }}
      >
        {benefit.careName}
      </Button>
    ));

  //공고 등록
  const postRecruit = () => {
    const timeList = Object.entries(selectedDays)
      .filter(([_, isSelected]) => isSelected === true)
      .map(([dayIdx]) => ({
        ptDate: dayIdx + 1,
        ptStartTime: WORKTIME[workStartTimes[dayIdx]],
        ptEndTime: WORKTIME[workEndTimes[dayIdx]],
      }));
    const data = {
      linkingYn: true,
      welfare: benefitBit,
      wageNegotiation: payNego,
      wageState,
      wage: parseInt(wage),
      requestContents: '',
      patientSeq: patientData.patientSeq,
      name: patientData.name,
      afSeq: patientData.afSeq,
      asSeq: patientData.asSeq,
      atSeq: patientData.atSeq,
      gender: patientData.genderStr === '남성' ? 1 : 2,
      birthDate: patientData.birthDate,
      weight: patientData.weight,
      diseases: patientData.diseases,
      careLevel: getSelectionBit(patientData.careChoice.careLevelList, 21),
      workType: workTypeBit,
      timeNegotiation: timeNego,
      timeList,
      dementiaSymptom: getSelectionBit(patientData.careChoice.dementiaSymptomList, 29),
      inmateState: getSelectionBit(patientData.careChoice.inmateStateList, 38),
      serviceMeal: getSelectionBit(patientData.careChoice.serviceMealList, 45),
      serviceToilet: getSelectionBit(patientData.careChoice.serviceToiletList, 50),
      serviceMobility: getSelectionBit(patientData.careChoice.serviceMobilityList, 55),
      serviceDaily: getSelectionBit(patientData.careChoice.serviceDailyList, 60),
    };
    console.log(data);

    setRecruit(data);

    request('post', '/patient-recruit/helper', data)
      .then((res) => {
        console.log(res);
        handleMatchingPage((prev) => {
          return prev + 1;
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  //근무형태 렌더링
  const renderWorkType = () =>
    workTypes.map((wt, idx) => (
      <Button
        variant={selectedWorkType === idx ? 'default' : 'outline'}
        onClick={() => {
          setSelectedWorkType(idx);
          setWorkTypeBit(wt.careVal);
        }}
        key={idx}
        className='mb-0 w-full h-16'
      >
        {wt.careName}
      </Button>
    ));

  //근무시간 select box 내부 시간 렌더링
  const renderWorkTime = () =>
    WORKTIME.map((time, idx) => (
      <SelectItem key={idx} value={idx}>
        {time}
      </SelectItem>
    ));

  //근무시간 유효성 확인
  const checkInvalid = (from, val, index) => {
    //from == 0 -> 시작시간 선택 시 유효성 판단
    //from == 1 -> 종료시간 선택 시 유효성 판단
    if (from === 0) {
      if (val >= workEndTimes[index]) {
        alert('종료시간은 시작시간보다 늦어야합니다.');
        setWorkStartTimes((prev) => ({ ...prev, [index]: workEndTimes[index] - 1 }));
      } else {
        setWorkStartTimes((prev) => ({ ...prev, [index]: val }));
      }
    }
    if (from === 1) {
      if (val <= workStartTimes[index]) {
        alert('종료시간은 시작시간보다 늦어야합니다.');
        setWorkEndTimes((prev) => ({ ...prev, [index]: workStartTimes[index] + 1 }));
      } else {
        setWorkEndTimes((prev) => ({ ...prev, [index]: val }));
      }
    }
  };

  //요일별 시간 설정
  const renderTimeSet = () =>
    Object.entries(selectedDays)
      .filter(([_, isSelected]) => isSelected)
      .map(([dayIdx], idx) => (
        <div key={idx} className='w-full text-start'>
          <label className='inline-block mb-2'>{DAYS[dayIdx]}</label>
          <div className='flex w-full mb-7'>
            <Select
              value={workStartTimes[dayIdx]}
              onValueChange={(startVal) => {
                if (dayIdx in workEndTimes) {
                  checkInvalid(0, startVal, dayIdx);
                } else {
                  setWorkStartTimes((prev) => ({ ...prev, [dayIdx]: startVal }));
                }
              }}
            >
              <SelectTrigger className='flex-1 border-[var(--outline)] border-2 h-16 text-xl'>
                <SelectValue placeholder='시작시간' />
              </SelectTrigger>
              <SelectContent>{renderWorkTime()}</SelectContent>
            </Select>
            <span className='mx-4 inline-flex items-center'>~</span>
            <Select
              value={workEndTimes[dayIdx]}
              onValueChange={(endVal) => {
                if (dayIdx in workStartTimes) {
                  checkInvalid(1, endVal, dayIdx);
                } else {
                  setWorkEndTimes((prev) => ({ ...prev, [dayIdx]: endVal }));
                }
              }}
            >
              <SelectTrigger className='flex-1 border-[var(--outline)] border-2 h-16 text-xl'>
                <SelectValue placeholder='종료시간' />
              </SelectTrigger>
              <SelectContent>{renderWorkTime()}</SelectContent>
            </Select>
          </div>
        </div>
      ));

  // 선택 항목들 비트 합 구하기 (arr = 선택값 배열, base = 가장 낮은 id값)
  const getSelectionBit = (arr, base) => arr.reduce((acc, cur) => acc + 2 ** (cur - base), 0);

  const getAddressSeq = () => {};

  return (
    <>
      <div className='mx-auto flex flex-col items-center max-w-2xl mb-12'>
        <p className='font-bold text-xl tracking-[-0.1rem] pt-8 pb-3 w-full mx-auto text-start'>
          구인정보를 입력해주세요
        </p>
        <p className='font-normal text-xl tracking-[-0.1rem] w-full mx-auto text-start'>
          일정 범위 내 날짜/시간/요일 협의 가능
        </p>
      </div>

      <div className='mx-auto flex flex-col gap-10 max-w-2xl mb-20'>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>근무 종류</label>
          <div className='grid grid-cols-2 w-full gap-4'>{renderWorkType()}</div>
        </div>

        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>
            근무지 주소
            <span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
          </label>
          <Input
            className='h-16 rounded-md border-[var(--outline)]'
            width='100%'
            placeholder='주소입력'
          />
        </div>

        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>
            구인 날짜<span className='text-[#6C6C6C] text-sm ml-2'>중복선택가능</span>
          </label>
          <div className='w-full grid grid-cols-2 gap-4'>{renderDays()}</div>
        </div>

        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>구인 시간</label>
          {renderTimeSet()}

          <div
            className='flex text-xl'
            onClick={() => {
              setTimeNego((prev) => !prev);
            }}
          >
            <svg
              width='29'
              height='29'
              viewBox='0 0 29 29'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='!size-7 mr-3'
            >
              <rect
                width='29'
                height='29'
                rx='14.5'
                fill={timeNego ? 'var(--company-primary)' : '#B6B6B6'}
                className='!size-7'
              />
              <path
                d='M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z'
                fill='white'
              />
            </svg>
            협의 가능
          </div>
        </div>

        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>희망급여</label>
          {/* <p className='text-[var(--required-red)]'>시급 기준 최저 13000원 이상</p> */}
          <div className='flex w-full mb-7 gap-4'>
            <Select
              defaultValue={1}
              value={wageState}
              onValueChange={(val) => {
                setWageState(val);
              }}
            >
              <SelectTrigger className='flex-1 border-[var(--outline)] border-2 h-16 text-xl'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={1}>시급</SelectItem>
                <SelectItem value={2}>일급</SelectItem>
                <SelectItem value={3}>주급</SelectItem>
              </SelectContent>
            </Select>
            <span className='inline-flex items-center'>~</span>
            <div className='flex-1 h-16 border rounded-md px-3 py-2 border-[var(--outline)] relative'>
              <Input
                width='auto'
                className='border-0 px-0 py-0 h-11.5 text-xl'
                onChange={(e) => {
                  setWage(e.target.value);
                }}
                type='number'
              />
              <span className='absolute right-3 top-1/2 -translate-y-1/2 text-lg'>원</span>
            </div>
          </div>
          <p
            className='flex text-xl'
            onClick={() => {
              setPayNego((prev) => !prev);
            }}
          >
            <svg
              width='29'
              height='29'
              viewBox='0 0 29 29'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              className='!size-7 mr-3'
            >
              <rect
                width='29'
                height='29'
                rx='14.5'
                fill={payNego ? 'var(--company-primary)' : '#B6B6B6'}
                className='!size-7'
              />
              <path
                d='M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z'
                fill='white'
              />
            </svg>
            협의 가능
          </p>
        </div>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>
            복리후생<span className='text-[#6C6C6C] text-sm ml-2'>중복선택가능</span>
          </label>
          <div className='w-full grid grid-cols-2 gap-4'>{renderBenefit()}</div>
        </div>
        <Button
          className='h-16 w-4/5 bg-[var(--company-primary)] text-xl hover:bg-[var(--company-primary)]/90 fixed bottom-[5rem] left-1/2 -translate-x-1/2 font-bold'
          disabled={ptDateBit === 0 || wage === 0}
          onClick={() => {
            postRecruit();
          }}
        >
          다음
        </Button>
      </div>
    </>
  );
}
