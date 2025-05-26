import { Button } from '@/components/ui/custom/Button';
import { request } from '@/api';
import { useState, useEffect } from 'react';
import patientStore from '@/store/jbStore/patientStore';

// import profInit from '@/assets/images/default-profile.png';

export default function MatchingManage2({ handleMatchingPage }) {
  const DAY = ['월', '화', '수', '목', '금', '토', '일'];

  const { patientData } = patientStore();

  const [inmate, setInmate] = useState([]);
  const [meal, setMeal] = useState([]);
  const [toilet, setToilet] = useState([]);
  const [mobile, setMobile] = useState([]);
  const [daily, setDaily] = useState([]);

  useEffect(() => {
    request('post', '/cmn/part-request-care-list', {
      careTopEnumList: [
        'INMATE_STATE',
        'SERVICE_MEAL',
        'SERVICE_TOILET',
        'SERVICE_MOBILITY',
        'SERVICE_DAILY',
      ],
    })
      .then((res) => {
        // 동거인 정보 가져오기
        setInmate(
          res.inmateStateList
            .filter((x) => patientData.careChoice.inmateStateList.includes(x.id))
            .map((w) => w.careName),
        );
        //식사 보조 정보 가져오기
        setMeal(
          res.serviceMealList
            .filter((x) => patientData.careChoice.serviceMealList.includes(x.id))
            .map((m) => m.careName),
        );
        //배변 보조 정보 가져오기
        setToilet(
          res.serviceToiletList
            .filter((x) => patientData.careChoice.serviceToiletList.includes(x.id))
            .map((t) => t.careName),
        );
        //이동 보조 정보 가져오기
        setMobile(
          res.serviceMobilityList
            .filter((x) => patientData.careChoice.serviceMobilityList.includes(x.id))
            .map((m) => m.careName),
        );
        //일상생활 정보 가져오기
        setDaily(
          res.serviceDailyList
            .filter((x) => patientData.careChoice.serviceDailyList.includes(x.id))
            .map((m) => m.careName),
        );
      })
      .catch((e) => console.error(e));
  }, []);

  const renderWorkTime = () =>
    patientData.timeList.map((time, idx) => (
      <p key={idx}>
        {DAY[time.ptDate - 1]} {time.ptStartTime}~{time.ptEndTime}
      </p>
    ));

  const formatBirth = (birth) => birth.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1년 $2월 $3일');

  return (
    <>
      {console.log(patientData)}
      <div className='mx-auto flex flex-col items-center max-w-2xl'>
        <p className='font-bold text-xl tracking-[-0.1rem] py-8 w-full mx-auto text-start px-[1.5rem] mb-4'>
          {patientData.name} 어르신의 정보를 확인해주세요
        </p>
      </div>

      <div className='px-[1.5rem] mx-auto flex flex-col gap-5 max-w-2xl mb-40'>
        <div className='flex pb-5 border-b border-[var(--outline)]'>
          <div className='flex items-center justify-center mr-8'>
            <img
              src={patientData.imgAddress}
              className='size-25 bg-[var(--button-inactive)] rounded-[50%]'
            />
          </div>
          <div className='flex flex-col items-start justify-center gap-1 py-2'>
            <p className='font-semibold text-2xl'>{patientData.name} 어르신</p>
            <p className='font-normal text-xl'>
              {`${patientData.genderStr} / ${patientData.age}`}세
            </p>
          </div>
        </div>

        <div className='px-5'>
          <div className='flex min-h-16'>
            <p className='flex flex-1 text-start font-semibold text-xl items-center'>생년월일</p>
            <p className='flex flex-1 text-start bg-[var(--button-inactive)] items-center rounded-md text-xl px-5'>
              {formatBirth(patientData.birthDate)}
            </p>
          </div>
        </div>
        <div className='px-5'>
          <div className='flex min-h-16'>
            <p className='flex flex-1 text-start font-semibold text-xl items-center'>성별</p>
            <p className='flex flex-1 text-start bg-[var(--button-inactive)] items-center rounded-md text-xl px-5'>
              {patientData.genderStr}
            </p>
          </div>
        </div>
        <div className='px-5'>
          <div className='flex min-h-16'>
            <p className='flex flex-1 text-start font-semibold text-xl items-center'>몸무게</p>
            <p className='flex flex-1 text-start bg-[var(--button-inactive)] items-center rounded-md text-xl px-5'>
              {patientData.weight}kg
            </p>
          </div>
        </div>
        <div className='px-5'>
          <div className='flex min-h-16'>
            <p className='flex flex-1 text-start font-semibold text-xl items-center'>근무종류</p>
            <p className='flex flex-1 text-start bg-[var(--button-inactive)] items-center rounded-md text-xl px-5'>
              {patientData.workType}
            </p>
          </div>
        </div>
        <div className='px-5'>
          <div className='flex min-h-16'>
            <p className='flex flex-1 text-start font-semibold text-xl items-center'>주소지</p>
            <p className='flex flex-1 text-start bg-[var(--button-inactive)] items-center rounded-md text-xl px-5 max-[500px]:text-base'>
              {patientData.address}
            </p>
          </div>
        </div>
        <div className='px-5'>
          <div className='flex min-h-16'>
            <p className='flex flex-1 text-start font-semibold text-xl items-center'>
              희망요일/시간
            </p>
            <div className='flex flex-col justify-center flex-1 text-start bg-[var(--button-inactive)] rounded-md text-xl px-5'>
              {renderWorkTime()}
            </div>
          </div>
        </div>
        <div className='px-5'>
          <div className='flex min-h-16'>
            <p className='flex flex-1 text-start font-semibold text-xl items-center'>보유질병</p>
            <p className='flex flex-1 text-start bg-[var(--button-inactive)] items-center rounded-md text-xl px-5'>
              {patientData.diseases}
            </p>
          </div>
        </div>
        <div className='px-5'>
          <div className='flex min-h-16'>
            <p className='flex flex-1 text-start font-semibold text-xl items-center'>
              장기요양등급
            </p>
            <p className='flex flex-1 text-start bg-[var(--button-inactive)] items-center rounded-md text-xl px-5'>
              {patientData.careLevelStr}
            </p>
          </div>
        </div>
        {/* <div className='px-5'>
          <div className='flex min-h-16'>
            <p className='flex flex-1 text-start font-semibold text-xl items-center'>케어필요</p>
            <p className='flex flex-1 text-start bg-[var(--button-inactive)] items-center rounded-md text-xl px-5'>
              {}
            </p>
          </div>
        </div> */}
        <div className='px-5'>
          <div className='flex min-h-16'>
            <p className='flex flex-1 text-start font-semibold text-xl items-center'>동거인 여부</p>
            <div className='flex flex-col flex-1 text-start bg-[var(--button-inactive)] justify-center rounded-md text-xl px-5'>
              {inmate.map((i, idx) => (
                <p key={idx}>{i}</p>
              ))}
            </div>
          </div>
        </div>
        <div className='px-5'>
          <div className='flex min-h-16'>
            <p className='flex flex-1 text-start font-semibold text-xl items-center'>식사 보조</p>
            <div className='flex flex-col flex-1 text-start bg-[var(--button-inactive)] justify-center rounded-md text-xl px-5'>
              {meal.map((i, idx) => (
                <p key={idx}>{i}</p>
              ))}
            </div>
          </div>
        </div>
        <div className='px-5'>
          <div className='flex min-h-16'>
            <p className='flex flex-1 text-start font-semibold text-xl items-center'>배변 보조</p>
            <div className='flex flex-col flex-1 text-start bg-[var(--button-inactive)] justify-center rounded-md text-xl px-5'>
              {toilet.map((i, idx) => (
                <p key={idx}>{i}</p>
              ))}
            </div>
          </div>
        </div>
        <div className='px-5'>
          <div className='flex min-h-16'>
            <p className='flex flex-1 text-start font-semibold text-xl items-center'>이동 보조</p>
            <div className='flex flex-col justify-center flex-1 text-start bg-[var(--button-inactive)] rounded-md text-xl px-5'>
              {mobile.map((i, idx) => (
                <p key={idx}>{i}</p>
              ))}
            </div>
          </div>
        </div>
        <div className='px-5'>
          <div className='flex min-h-16'>
            <p className='flex flex-1 text-start font-semibold text-xl items-center'>일상생활</p>
            <div className='flex flex-col justify-center flex-1 text-start bg-[var(--button-inactive)] rounded-md text-xl px-5'>
              {daily.map((i, idx) => (
                <p key={idx}>{i}</p>
              ))}
            </div>
          </div>
        </div>
        {/* <div className='px-5'>
          <div className='flex min-h-16'>
            <p className='flex flex-1 text-start font-semibold text-xl items-center'>희망시급</p>
            <p className='flex flex-1 text-start bg-[var(--button-inactive)] items-center rounded-md text-xl px-5'>
              {recruitReq.wage || 10300}
            </p>
          </div>
        </div> */}

        <Button
          className='h-16 w-4/5 bg-[var(--company-primary)] text-xl hover:bg-[var(--company-primary)]/90 fixed bottom-8 left-1/2 -translate-x-1/2 font-bold'
          onClick={() => {
            window.scrollTo(0, 0);
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
