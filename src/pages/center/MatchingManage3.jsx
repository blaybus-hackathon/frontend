import { Input } from '@/components/ui/custom/input';
import { Button } from '@/components/ui/custom/Button';
import { useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/custom/select';
// import patientStore from '@/store/patientStore';
import { request } from '@/api';

export default function MatchingManage3({ handleMatchingPage }) {
  // const { patientData } = patientStore();
  const DAYS = ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'];
  const BENEFIT = [
    '4대보험',
    '교통비 지원',
    '퇴직급여',
    '경조사비',
    '명절선물',
    '식사(비)지원',
    '장기근속 장려금',
    '정부지원금',
    '중증가산수당',
    '운전 수당',
  ];
  const WORKTYPE = ['방문요양', '입주요양', '방문목욕', '주야간보호', '요양원', '병원', '병원동행'];
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

  // select buttons
  const [selectedDays, setSelectedDays] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
  });
  // const [selectedBenefits, setSelectedBenefits] = useState({
  //   0: false,
  //   1: false,
  //   2: false,
  //   3: false,
  //   4: false,
  //   5: false,
  //   6: false,
  //   7: false,
  //   8: false,
  //   9: false,
  // });
  const [selectedWorkType, setSelectedWorkType] = useState();
  const [selectedBenefits, setSelectedBenefits] = useState([]);

  // 날짜, 급여, 협의가능, 복리후생
  const [ptDateBit, setPtDateBit] = useState(0);
  const [wage, setWage] = useState(0);
  // const [payNego, setPayNego] = useState(false);
  // const [ptBeneBit, setPtBeneBit] = useState(0);
  const [timeNego, setTimeNego] = useState(false);
  const [sBoxTime, setSBoxTime] = useState();
  const [sBoxEndVal, setSBoxEndVal] = useState();

  const [recruit, setRecruit] = useState({
    afSeq: 9007199254740991,
    asSeq: 9007199254740991,
    atSeq: 9007199254740991,
    careLevel: 1073741824,
    inmateState: 1073741824,
    workType: 1073741824,
    gender: 1073741824,
    dementiaSymptom: 1073741824,
    serviceMeal: 1073741824,
    serviceToilet: 1073741824,
    serviceMobility: 1073741824,
    serviceDaily: 1073741824,
    name: 'string',
    birthDate: 'string',
    weight: 0.1,
    diseases: 'string',
    timeNegotiation: true,
    requestContents: 'string',
    timeList: [
      {
        ptDate: 0,
        ptStartTime: 'string',
        ptEndTime: 'string',
      },
    ],
    patientSeq: 9007199254740991,
    welfare: 1073741824,
    wageNegotiation: false,
    wageState: 1073741824,
    wage: 1073741824,
  });

  const renderDays = () =>
    DAYS.map((day, idx) => (
      <Button
        key={idx}
        variant={selectedDays[idx] ? 'default' : 'outline'}
        className='h-16 text-lg font-medium w-full mb-0'
        onClick={() => {
          if (selectedDays[idx] === false) {
            setRecruit((prev) => ({
              ...prev,
              timeList: prev.timeList.map((timeListObj, objIdx) =>
                objIdx === 0
                  ? { ...timeListObj, ptDate: timeListObj.ptDate + idx + 1 }
                  : timeListObj,
              ),
            }));
            console.log(recruit.timeList[0]);
            setPtDateBit((prev) => prev + idx + 1);
          } else {
            setRecruit((prev) => ({
              ...prev,
              timeList: prev.timeList.map((timeListObj, objIdx) =>
                objIdx === 0
                  ? { ...timeListObj, ptDate: timeListObj.ptDate - idx - 1 }
                  : timeListObj,
              ),
            }));
            console.log(recruit.timeList[0]);
            setPtDateBit((prev) => prev - idx - 1);
          }

          setSelectedDays((prev) => ({ ...prev, [idx]: !prev[idx] }));
        }}
      >
        {day}
      </Button>
    ));

  const renderBenefit = () =>
    BENEFIT.map((benefit, idx) => (
      <Button
        key={idx}
        variant={selectedBenefits.includes(idx) ? 'default' : 'outline'}
        // variant={selectedBenefits[idx] === true ? 'default' : 'outline'}
        className='w-full mb-0 h-16'
        onClick={() => {
          setSelectedBenefits((prev) =>
            prev.includes(idx) ? prev.filter((x) => x !== idx) : [...prev, idx],
          );

          // if (selectedBenefits[idx] === false) {
          //   setRecruit((prev) => ({ ...prev, welfare: ptBeneBit + idx + 1 }));
          //   setPtBeneBit((prev) => prev + idx + 1);
          // } else {
          //   setRecruit((prev) => ({ ...prev, welfare: ptBeneBit - idx - 1 }));
          //   setPtBeneBit((prev) => prev - idx - 1);
          // }
          // console.log(recruit.welfare);
          // setSelectedBenefits((prev) => ({ ...prev, [idx]: !prev[idx] }));
        }}
      >
        {benefit}
      </Button>
    ));

  const postRecruit = async () => {
    try {
      console.log(recruit);
      const response = await request('post', '/patient/save', recruit);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const renderWorkType = () =>
    // const req = { careTopEnumList: ['WORK_TYPE'] };
    // const res = await request('post', '/cmn/part-request-care-list', req);

    WORKTYPE.map((wt, idx) => (
      <Button
        variant={selectedWorkType === idx ? 'default' : 'outline'}
        onClick={() => {
          setSelectedWorkType(idx);
        }}
        key={idx}
        className='mb-0 w-full h-16'
      >
        {wt}
      </Button>
    ));

  // const renderWelfare = async () => {
  //   const req = { careTopEnumList: ['WELFARE'] };
  //   const res = await request('post', '/cmn/part-request-care-list', req);
  // };

  const renderWorkTime = () =>
    WORKTIME.map((time, idx) => (
      <SelectItem key={idx} value={idx}>
        {time}
      </SelectItem>
    ));

  const checkInvalid = (from, val) => {
    //from == 0 -> 시작시간 선택 시 유효성 판단
    //from == 1 -> 종료시간 선택 시 유효성 판단
    if (from === 0) {
      if (val >= sBoxEndVal) {
        alert('종료시간은 시작시간보다 늦어야합니다.');
        setSBoxTime(sBoxEndVal - 1);
      } else {
        setSBoxTime(val);
      }
    }
    if (from === 1) {
      if (val <= sBoxTime) {
        alert('종료시간은 시작시간보다 늦어야합니다.');
        setSBoxEndVal(sBoxTime + 1);
      } else {
        setSBoxEndVal(val);
      }
    }
  };

  return (
    <>
      <div className='mx-auto flex flex-col items-center max-w-2xl px-[1.5rem] mb-12'>
        <p className='font-bold text-xl tracking-[-0.1rem] pt-8 pb-3 w-full mx-auto text-start'>
          구인정보를 입력해주세요
        </p>
        <p className='font-normal text-xl tracking-[-0.1rem] w-full mx-auto text-start'>
          일정 범위 내 날짜/시간/요일 협의 가능
        </p>
      </div>

      <div className='px-[1.5rem] mx-auto flex flex-col gap-10 max-w-2xl mb-40'>
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
          <div className='flex w-full mb-7'>
            <Select
              value={sBoxTime}
              onValueChange={(startVal) => {
                if (sBoxEndVal) {
                  checkInvalid(0, startVal);
                } else {
                  setSBoxTime(startVal);
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
              value={sBoxEndVal}
              onValueChange={(endVal) => {
                if (sBoxTime) {
                  checkInvalid(1, endVal);
                } else {
                  setSBoxEndVal(endVal);
                }
              }}
            >
              <SelectTrigger className='flex-1 border-[var(--outline)] border-2 h-16 text-xl'>
                <SelectValue placeholder='종료시간' />
              </SelectTrigger>
              <SelectContent>{renderWorkTime()}</SelectContent>
            </Select>
          </div>

          <p
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
          </p>
        </div>

        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>희망급여</label>
          {/* <p className='text-[var(--required-red)]'>시급 기준 최저 13000원 이상</p> */}
          <div className='flex w-full mb-7 gap-4'>
            <Select defaultValue={'hour'}>
              <SelectTrigger className='flex-1 border-[var(--outline)] border-2 h-16 text-xl'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='hour'>시급</SelectItem>
                <SelectItem value='day'>일급</SelectItem>
                <SelectItem value='month'>월급</SelectItem>
              </SelectContent>
            </Select>
            <span className='inline-flex items-center'>~</span>
            <div className='flex-1 h-16 border rounded-md px-3 py-2 border-[var(--outline)] relative'>
              <Input
                width='auto'
                className='border-0 px-0 py-0 h-11.5 text-xl'
                onChange={(e) => {
                  setWage(e);
                }}
                type='number'
              />
              <span className='absolute right-3 top-1/2 -translate-y-1/2 text-lg'>원</span>
            </div>
          </div>
          <p
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
          </p>
        </div>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>
            복리후생<span className='text-[#6C6C6C] text-sm ml-2'>중복선택가능</span>
          </label>
          <div className='w-full grid grid-cols-2 gap-4'>{renderBenefit()}</div>
        </div>
        <Button
          className='h-16 w-4/5 bg-[var(--company-primary)] text-xl hover:bg-[var(--company-primary)]/90 fixed bottom-8 left-1/2 -translate-x-1/2 font-bold'
          disabled={ptDateBit === 0 || wage === 0}
          onClick={() => {
            // setRecruit((prev) => ({
            //   ...prev,
            //   timeList: prev.timeList.map((timeListObj, idx) =>
            //     idx === 0 ? { ...timeListObj, ptDate: ptDateBit } : timeListObj,
            //   ),
            //   wage: wage,
            //   wageNegotiation: payNego,
            //   welfare: ptBeneBit,
            // }));
            postRecruit();
            handleMatchingPage((prev) => {
              return prev + 1;
            });
          }}
        >
          다음
        </Button>
      </div>
    </>
  );
}
