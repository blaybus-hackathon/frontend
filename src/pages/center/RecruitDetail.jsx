import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/custom/Button';
import { request } from '@/api';
import defaultProfile from '@/assets/images/elder-basic-profile.png';

import recruitStore from '@/store/jbStore/recruitStore';

export default function PatientInfo() {
  const WAGESTATE = ['시급', '일급', '주급'];
  const navigate = useNavigate();

  const { recruitInfo, setRecruit } = recruitStore();

  const [workType, setWorkType] = useState([]);
  const [meal, setMeal] = useState([]);
  const [toilet, setToilet] = useState([]);
  const [mobile, setMobile] = useState([]);
  const [daily, setDaily] = useState([]);
  const [dementia, setDementia] = useState([]);

  useEffect(() => {
    //temporary code
    request('get', '/patient-recruit/1/detail')
      .then((res) => {
        //성별 변경
        const genderStr = res.careChoice.genderList[0] - 67 === 0 ? '남성' : '여성';
        //나이이 변경
        const age = new Date().getFullYear() - res.birthDate.slice(0, 4) + 1;
        setRecruit({ ...res, age, genderStr });
      })
      .catch((e) => console.error(e));
  }, []);

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
            .filter((x) => {
              return recruitInfo.careChoice.dementiaSymptomList.includes(x.id);
            })
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
  }, [recruitInfo]);

  const gotoModify = () => {
    window.scrollTo(0, 0);
    navigate('/center/recruit/modify');
  };
  return (
    <div>
      <div>
        <p className='mt-10 font-semibold max-[412px]:text-base text-xl mb-10'>{`${recruitInfo.name} 어르신 - 요양보호사 구인합니다.`}</p>
        <div className='border-2 border-[var(--outline)] flex items-start px-9 py-4 rounded-2xl mb-7'>
          <img
            src={recruitInfo.imgAddress ? recruitInfo.imgAddress : defaultProfile}
            className='bg-[var(--button-inactive)] size-19 rounded-[50%] mr-8'
          />
          <div className='flex flex-col items-start gap-1 py-2'>
            <p className='font-semibold text-xl'>{recruitInfo.name} 어르신</p>
            <p className='font-normal'>{`${recruitInfo.genderStr} / ${recruitInfo.age}세`}</p>
          </div>
        </div>
      </div>

      <div className='pt-5 pb-13 font-bold flex flex-col gap-6 items-start text-lg'>
        <p>
          {WAGESTATE[recruitInfo.wageState - 1]}
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
      </div>

      <div className='px-5 pt-8 flex flex-col gap-7.5 items-start mb-3'>
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
          className='h-16 w-full bg-[var(--company-primary)] text-xl hover:bg-[var(--company-primary)]/90 font-bold'
          onClick={gotoModify}
        >
          수정하기
        </Button>
      </div>
    </div>
  );
}
