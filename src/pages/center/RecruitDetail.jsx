import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Button } from '@/components/ui/custom/Button';
import { formatBirthToAge } from '@/utils/formatters/formatBirthToAge';
import { useHeaderPropsStore } from '@/store/useHeaderPropsStore';
import { useRecruitStore } from '@/store/center/useRecruitStore';

import Spinner from '@/components/loading/Spinner';
import defaultProfile from '@/assets/images/elder-basic-profile.png';

const BasicInfoRow = ({ label, value, className = '' }) => (
  <div className='flex'>
    <p className={`${className} text-start font-semibold text-lg lg:text-xl break-keep`}>{label}</p>
    <p className='text-lg lg:text-xl font-normal pl-4 break-keep whitespace-pre-wrap text-start'>
      {value}
    </p>
  </div>
);

const InfoBox = ({ label, value }) => (
  <div className='w-full grid grid-cols-[1fr_3fr] gap-4 lg:gap-6'>
    <p className='flex flex-1 text-start font-semibold whitespace-nowrap text-xl lg:text-2xl h-full items-center '>
      {label}
    </p>
    <p className='flex text-start bg-[var(--button-inactive)] h-full items-center rounded-md text-xl px-5 break-keep whitespace-pre-wrap py-3'>
      {value}
    </p>
  </div>
);

export default function PatientInfo() {
  const WAGESTATE = ['시급', '일급', '주급'];
  const navigate = useNavigate();
  const { patientLogSeq } = useParams();
  const setHeaderProps = useHeaderPropsStore((state) => state.setHeaderProps);

  const { recruitData, idToName, isLoading, fetchRecruitDetail } = useRecruitStore();

  const getMainInfoData = () => [
    { label: WAGESTATE[recruitData.wageState - 1], value: `${recruitData.wage}원` },
    { label: '근무종류', value: idToName.workTypeList.join('\n') },
    { label: '주소지', value: recruitData.addressLabel },
    { label: '장기요양등급', value: idToName.careLevelList.join('\n') },
    { label: '몸무게', value: `${recruitData.weight}kg` },
    { label: '치매증상', value: idToName.dementiaSymptomList.join('\n') },
    { label: '동거인여부', value: idToName.inmateStateList.join('\n') },
  ];

  const getBoxInfoData = () => [
    { label: '보유질병', value: recruitData.diseases },
    { label: '식사 보조', value: idToName.serviceMealList.join('\n') },
    { label: '배변 보조', value: idToName.serviceToiletList.join('\n') },
    { label: '이동 보조', value: idToName.serviceMobilityList.join('\n') },
    { label: '일상생활', value: idToName.serviceDailyList.join('\n') },
  ];

  useEffect(() => {
    setHeaderProps({
      hasBorder: false,
    });
  }, [setHeaderProps]);

  useEffect(() => {
    if (patientLogSeq) {
      fetchRecruitDetail(patientLogSeq);
    }
  }, [patientLogSeq, fetchRecruitDetail]);

  const gotoModify = () => {
    window.scrollTo(0, 0);
    navigate(`/center/recruit/modify/${patientLogSeq}`);
  };

  // 로딩 상태 처리
  if (isLoading) {
    return <Spinner />;
  }

  // 데이터가 없는 경우
  if (!recruitData.name) {
    return (
      <div className='flex flex-col items-center justify-center min-h-[400px]'>
        <p className='text-gray-600'>공고 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      <div className='bg-[#f6f6f6] h-5 w-full' />
      <section className='w-[88%] mx-auto'>
        <p className='mt-8 lg:mt-10 font-semibold max-[412px]:text-lg text-xl mb-10 text-start'>{`${recruitData.name} 어르신 - 요양보호사 구인합니다.`}</p>
        <div className='border-2 border-[var(--outline)] flex items-start px-5 lg:px-9 py-4 rounded-2xl mb-7'>
          <img
            src={recruitData.imgAddress ? recruitData.imgAddress : defaultProfile}
            className='bg-[var(--button-inactive)] size-19 rounded-[50%] mr-8'
          />
          <div className='flex flex-col items-start gap-1 py-2'>
            <p className='font-semibold text-lg lg:text-xl text-start whitespace-pre'>
              {recruitData.name} 어르신
            </p>
            <p className='font-normal text-lg lg:text-xl text-start'>{`${recruitData.gender === 1 ? '남성' : '여성'} / ${formatBirthToAge(recruitData.birthDate)}세`}</p>
          </div>
        </div>

        <div className='pt-3 lg:pt-5 pb-7 lg:pb-10 flex flex-col gap-6 items-start text-lg lg:text-xl'>
          {getMainInfoData().map((info, index) => (
            <BasicInfoRow key={index} label={info.label} value={info.value} />
          ))}
        </div>
      </section>

      <div className='bg-[#f6f6f6] h-8 w-full' />

      <section className='w-[83%] mx-auto pt-8 flex flex-col gap-7.5 items-start'>
        {getBoxInfoData().map((info, index) => (
          <InfoBox key={index} label={info.label} value={info.value} />
        ))}
      </section>

      <Button
        className='h-16 w-[88%] mx-auto bg-[var(--company-primary)] text-xl hover:bg-[var(--company-primary)]/90 font-bold my-6 lg:my-8'
        onClick={gotoModify}
      >
        수정하기
      </Button>
    </>
  );
}
