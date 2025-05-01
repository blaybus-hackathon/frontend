import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import logo from '@/assets/images/logo.png';
// import profInit from '@/assets/images/default-profile.png';

import { Button } from '@/components/ui/custom/Button';
import { request } from '@/api';

import patientStore from '@/store/jbStore/patientStore';
import recruitStore from '@/store/jbStore/recruitStore';

export default function PatientInfo() {
  const WAGESTATE = ['시급', '일급', '월급'];

  const navigate = useNavigate();

  // const { patientData, setPatient } = patientStore();
  const { recruitInfo } = recruitStore();

  const selectedSeq = 1;

  const [workType, setWorkType] = useState([]);
  const [meal, setMeal] = useState([]);
  const [toilet, setToilet] = useState([]);
  const [mobile, setMobile] = useState([]);
  const [daily, setDaily] = useState([]);
  const [dementia, setDementia] = useState([]);

  // const renderHelp = (array) =>
  //   array.map((help, idx) => (
  //     <div
  //       key={idx}
  //       className='bg-[var(--button-inactive)] rounded-md h-16 flex justify-center items-center px-3 py-1'
  //     >
  //       {help}
  //     </div>
  //   ));

  // const renderDementia = () => {
  //   let dementiaStr = '';
  //   patientData.dementia.map((d) => {dementiaStr + });
  // };

  useEffect(() => {
    request('post', '/cmn/part-request-care-list', {
      careTopEnumList: [
        'DEMENTIA_SYMPTOM',
        'WORK_TYPE',
        'SERVICE_MEAL',
        'SERVICE_TOILET',
        'SERVICE_MOBILITY',
        'SERVICE_DAILY',
      ],
    })
      .then((res) => {
        //치매 증상 정보 가져오기
        setDementia(
          res.dementiaSymptomList
            .filter((x) => recruitInfo.careChoice.dementiaSymptomList.includes(x.id))
            .map((d) => d.careName),
        );
        //근무형태 가져오기
        setWorkType(
          res.workTypeList
            .filter((x) => recruitInfo.careChoice.workTypeList.includes(x.id))
            .map((w) => w.careName),
        );
        //식사 보조 정보 가져오기
        setMeal(
          res.serviceMealList
            .filter((x) => recruitInfo.careChoice.serviceMealList.includes(x.id))
            .map((m) => m.careName),
        );
        //배변 보조 정보 가져오기
        setToilet(
          res.serviceToiletList
            .filter((x) => recruitInfo.careChoice.serviceToiletList.includes(x.id))
            .map((t) => t.careName),
        );
        //이동 보조 정보 가져오기
        setMobile(
          res.serviceMobilityList
            .filter((x) => recruitInfo.careChoice.serviceMobilityList.includes(x.id))
            .map((m) => m.careName),
        );
        //일상생활 정보 가져오기
        setDaily(
          res.serviceDailyList
            .filter((x) => recruitInfo.careChoice.serviceDailyList.includes(x.id))
            .map((d) => d.careName),
        );
      })
      .catch((e) => console.error(e));
    //   request('get', `/patient/${selectedSeq}/detail`)
    //     .then((res) => {
    //       setPatient({ ...res, patientSeq: selectedSeq });
    //       return request('post', '/cmn/part-request-care-list', {
    //         careTopEnumList: [
    //           'WORK_TYPE',
    //           'DEMENTIA_SYMPTOM',
    //           'INMATE_STATE',
    //           'SERVICE_MEAL',
    //           'SERVICE_TOILET',
    //           'SERVICE_MOBILITY',
    //           'SERVICE_DAILY',
    //         ],
    //       });
    //     })
    //     .then((res) => {
    //       //근무형태 가져오기
    //       // setWorkType(res.workTypeList.filter(() => ))
    //       //치매 증상 정보 가져오기
    //       setDementia(
    //         res.dementiaSymptomList
    //           .filter((x) => patientData.careChoice.dementiaSymptomList.includes(x.id))
    //           .map((w) => w.careName),
    //       );
    //       // 동거인 정보 가져오기
    //       setInmate(
    //         res.inmateStateList
    //           .filter((x) => patientData.careChoice.inmateStateList.includes(x.id))
    //           .map((w) => w.careName),
    //       );
    //       //식사 보조 정보 가져오기
    //       setMeal(
    //         res.serviceMealList
    //           .filter((x) => patientData.careChoice.serviceMealList.includes(x.id))
    //           .map((m) => m.careName),
    //       );
    //       //배변 보조 정보 가져오기
    //       setToilet(
    //         res.serviceToiletList
    //           .filter((x) => patientData.careChoice.serviceToiletList.includes(x.id))
    //           .map((t) => t.careName),
    //       );
    //       //이동 보조 정보 가져오기
    //       setMobile(
    //         res.serviceMobilityList
    //           .filter((x) => patientData.careChoice.serviceMobilityList.includes(x.id))
    //           .map((m) => m.careName),
    //       );
    //       //일상생활 정보 가져오기
    //       setDaily(
    //         res.serviceDailyList
    //           .filter((x) => patientData.careChoice.serviceDailyList.includes(x.id))
    //           .map((m) => m.careName),
    //       );
    //     })
    //     .catch((e) => console.error(e));
  }, []);

  const gotoModify = () => {
    window.scrollTo(0, 0);
    navigate('/modify');
  };
  return (
    <div>
      <header className='h-22.5 px-7 flex items-center justify-between'>
        <img src={logo} className='w-50.5 h-5.5' />
      </header>

      <div className='h-4.5 bg-[var(--button-inactive)]'></div>

      <div className='px-6'>
        <p className='mt-10 font-semibold max-[412px]:text-base text-xl mb-10'>{`${recruitInfo.name} 어르신 - 요양보호사 구인합니다.`}</p>
        <div className='border-2 border-[var(--outline)] flex items-start px-9 py-4 rounded-2xl mb-7'>
          {/* <div className='bg-[var(--button-inactive)] size-19 rounded-[50%] mr-8'></div> */}
          <img
            src={recruitInfo.imgAddress}
            className='bg-[var(--button-inactive)] size-19 rounded-[50%] mr-8'
          />
          <div className='flex flex-col items-start gap-1 py-2'>
            <p className='font-semibold text-xl'>{recruitInfo.name} 어르신</p>
            <p className='font-normal'>{`${recruitInfo.genderStr} / ${recruitInfo.age}세`}</p>
          </div>
        </div>
        {/* <div className='flex items-center mb-9'>
          <span className='text-[var(--company-primary)] font-bold text-2xl justify-center flex justify-center items-center'>
            {`${recruitReq.wageType} ${recruitReq.wage}원`}
          </span>
          {recruitReq.payNego && (
            <span className='inline-block ml-2 bg-black text-xs text-white rounded-3xl h-6 px-2 flex items-center pt-[2px] font-semibold mt-[3vpx]'>
              협의 가능
            </span>
          )}
        </div> */}
      </div>

      <div className='pt-5 pb-13 px-6 font-bold flex flex-col gap-6 items-start text-lg'>
        <p>
          {WAGESTATE[recruitInfo.wageState]}
          <span className='font-normal pl-4'> {recruitInfo.wage}원</span>
        </p>
        <p>
          근무종류
          <span className='font-normal pl-4'> {workType.join(', ')}</span>
        </p>
        <p>
          주소지
          <span className='font-normal pl-4'> {recruitInfo.address}</span>
        </p>
        <p>
          장기요양등급
          <span className='font-normal pl-4'> {recruitInfo.careLevelStr}</span>
        </p>
        <p>
          몸무게
          <span className='font-normal pl-4'> {recruitInfo.weight}kg</span>
        </p>
        <div className='flex gap-2'>
          <p className='text-left'>치매증상</p>
          <p className='text-left flex-1 font-normal pl-4'>{dementia.join(', ')}</p>
        </div>
        <div className='flex gap-2'>
          <p className='text-left'>동거인여부</p>
          <p className='text-left flex-1 font-normal pl-4'>{recruitInfo.inmateStateStr}</p>
        </div>
        {/* <div className='text-left flex gap-1'>
          <span className='text-sm font-normal'>동거인 여부</span>{' '}
          <p className='flex-1'>{patientData.with}</p>
        </div> */}
      </div>

      <div className='h-7.5 bg-[var(--button-inactive)]'></div>

      <div className='px-11 pt-8 flex flex-col gap-7.5 items-start mb-40'>
        <div className='w-full flex h-16'>
          <p className='flex flex-1 text-start font-semibold text-xl h-full items-center'>
            보유질병
          </p>
          <p className='flex flex-1 text-start bg-[var(--button-inactive)] h-full items-center rounded-md text-xl px-5'>
            {recruitInfo.diseases}
          </p>
        </div>
        <div className='w-full flex h-16'>
          <p className='flex flex-1 text-start font-semibold text-xl h-full items-center'>
            식사 보조
          </p>
          <p className='flex flex-1 text-start bg-[var(--button-inactive)] h-full items-center rounded-md text-xl px-5'>
            {meal}
          </p>
        </div>
        <div className='w-full flex h-16'>
          <p className='flex flex-1 text-start font-semibold text-xl h-full items-center'>
            배변 보조
          </p>
          <p className='flex flex-1 text-start bg-[var(--button-inactive)] h-full items-center rounded-md text-xl px-5'>
            {toilet.join(', ')}
          </p>
        </div>
        <div className='w-full flex h-16'>
          <p className='flex flex-1 text-start font-semibold text-xl h-full items-center'>
            이동 보조
          </p>
          <p className='flex flex-1 text-start bg-[var(--button-inactive)] h-full items-center rounded-md text-xl px-5'>
            {mobile.join(', ')}
          </p>
        </div>
        <div className='w-full flex h-16'>
          <p className='flex flex-1 text-start font-semibold text-xl h-full items-center'>
            일상생활
          </p>
          <p className='flex flex-1 text-start bg-[var(--button-inactive)] h-full items-center rounded-md text-xl px-5'>
            {daily.join(', ')}
          </p>
        </div>

        <Button
          className='h-16 w-4/5 bg-[var(--company-primary)] text-xl hover:bg-[var(--company-primary)]/90 fixed bottom-8 left-1/2 -translate-x-1/2 font-bold'
          onClick={gotoModify}
        >
          수정하기
        </Button>
      </div>
    </div>
  );
}
