// === Post Recruit Page 2 ===
import { Button } from '@/components/ui/custom/Button';
import { formatTimeList } from '@/utils/formatters/formatTimeList';
import { formatBirthToAge } from '@/utils/formatters/formatBirthToAge';
import { usePatientStore } from '@/store/center/usePatientStore';

import defaultProfile from '@/assets/images/elder-basic-profile.png';

const InfoField = ({ label, value }) => {
  return (
    <div className='grid grid-cols-[1fr_3fr] items-center gap-5 md:gap-16'>
      <p className='flex flex-0 text-start font-semibold text-lg lg:text-xl items-center break-word whitespace-pre-wrap'>
        {label}
      </p>
      <p className='flex flex-0 text-start bg-[var(--button-inactive)] rounded-md text-lg lg:text-xl px-2.5 lg:px-5 py-4 flex-col break-keep whitespace-pre-wrap'>
        {value}
      </p>
    </div>
  );
};

const ElderProfile = ({ elder }) => {
  const profileImage = elder.imgAddress || defaultProfile;

  return (
    <div className='flex pb-5 border-b border-[var(--outline)]'>
      <div className='flex items-center justify-center mr-8'>
        <img
          src={profileImage}
          className='size-25 bg-[var(--button-inactive)] rounded-[50%]'
          alt={`${elder.name} 어르신 프로필`}
        />
      </div>
      <div className='flex flex-col items-start justify-center gap-1 py-2'>
        <p className='font-semibold text-2xl'>{elder.name} 어르신</p>
        <p className='font-normal text-xl'>{`${elder.gender === 1 ? '남성' : '여성'} / ${formatBirthToAge(elder.birthDate)}세`}</p>
      </div>
    </div>
  );
};

const renderCareInfo = (careNames, isArray = false) => {
  if (!careNames || careNames.length === 0) return '없음';

  if (isArray) {
    return careNames.map((name, idx) => <span key={idx}>{name}</span>);
  }
  return careNames.join('\n');
};

export default function MatchingManage2({ handleMatchingPage }) {
  const { patientData, idToName } = usePatientStore();

  const formatBirth = (birth) => birth.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1년 $2월 $3일');

  const handleNextClick = () => {
    window.scrollTo(0, 0);
    handleMatchingPage((prev) => prev + 1);
  };

  return (
    <>
      <div className='mx-auto flex flex-col items-center'>
        <p className='font-bold text-xl tracking-[-0.1rem] py-8 w-full mx-auto text-start mb-4'>
          {patientData.name} 어르신의 정보를 확인해주세요
        </p>
      </div>

      <div className='mx-auto flex flex-col gap-5 mb-3'>
        <ElderProfile elder={patientData} />

        <section className='flex flex-col gap-5'>
          <InfoField label='생년월일' value={formatBirth(patientData.birthDate)} />

          <InfoField label='성별' value={patientData.gender === 1 ? '남성' : '여성'} />

          <InfoField label='몸무게' value={`${patientData.weight}kg`} />

          <InfoField label='근무종류' value={renderCareInfo(idToName.workTypeList, true)} />

          <InfoField label='주소지' value={patientData.address} />

          <InfoField
            label='희망요일/시간'
            value={formatTimeList(patientData.timeList).map((i, idx) => (
              <span key={idx}>{i}</span>
            ))}
          />

          <InfoField label='보유질병' value={patientData.diseases} />

          <InfoField label='장기요양등급' value={renderCareInfo(idToName.careLevelList)} />

          <InfoField label='동거인 여부' value={renderCareInfo(idToName.inmateStateList)} />

          <InfoField label='식사 보조' value={renderCareInfo(idToName.serviceMealList, true)} />

          <InfoField label='배변 보조' value={renderCareInfo(idToName.serviceToiletList, true)} />

          <InfoField label='이동 보조' value={renderCareInfo(idToName.serviceMobilityList, true)} />
        </section>

        <Button
          className='h-16 w-full bg-[var(--company-primary)] text-xl hover:bg-[var(--company-primary)]/90 font-bold'
          onClick={handleNextClick}
        >
          다음
        </Button>
      </div>
    </>
  );
}
