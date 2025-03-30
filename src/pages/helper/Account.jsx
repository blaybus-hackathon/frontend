import { useNavigate } from 'react-router-dom';

import Header from '@/components/ui/temp/Header';
import { Button } from '@/components/ui/button';

import { TextAreaInput } from '@/components/ui/TextAreaInput';
import useAccountStore from '@/store/suho/useAccountStore';
import { CARE_TYPES } from '@/store/suho/useCareTypeStore'; // 레이블 변환용으로만 사용

import Footer from '@/components/ui/temp/Footer';

// img
import location from '@/assets/images/location.png';

export default function Account() {
  const navigate = useNavigate();
  const profile = useAccountStore((state) => state.profile);

  const getCareTypeLabel = (category) => {
    if (category === 'workTypes') {
      return (
        profile.careTypes?.workTypes
          ?.map((type) => CARE_TYPES.workTypes.find((t) => t.id === type)?.label)
          .join(', ') || '미설정'
      );
    }
    const selected = CARE_TYPES[category]?.find(
      (item) => item.id === profile.careTypes?.[category],
    );
    return selected?.label || '미설정';
  };

  const handleEdit = () => {
    navigate('/helper/account/edit', {
      state: { from: '/helper/account' },
    });
  };

  //TODO 시멘틱코드 의식할것. 
  //TODO 프리티어 설정에서 tailwind 플러그인 도입할것것
  return (
    <>
      <main className='max-w-md mx-auto flex flex-col gap-4 p-4'>
        <Header title='프로필' />

        {/* 기본 정보 */}
        <profile className='space-y-4'>
          {/* 프로필 이미지 */}
          <section className='flex items-center'>
            <div className='flex flex-row justify-between items-center gap-12  h-auto pr-6 pl-6'>
              <img
                src='/defaultProfile.png'
                alt='프로필 이미지'
                className='w-24 h-24 rounded-full '
              />
              <div className='flex flex-col justify-center gap-2 text-left'>
                <span>{profile.name || '홍길동'}</span>

                <p>서울특별시 용산구 거주</p>
              </div>
            </div>
          </section>


{/* 자기 소개 섹션 */}
          <section className='space-y-2-'>

            <div className='flex flex-col pr-6 pl-6 gap-2'>
              <span className='text-left font-bold'>자기소개</span>
              {/* 내용은 zustand에저장한 내용 가져올 것 */}
              <p className='border-1 rounded-2xl text-left p-4'> 한 사람,한 사람의 필요에 맞춰 따뜻하고 세심한 돌봄을 제공하는 요양사입니다</p>
              
            </div>
          </section>

{/* 간병 경력 섹션 */}
          <section className='space-y-2-'>

<div className='flex flex-col pr-6 pl-6 gap-2'>
  <span className='text-left font-bold'>간병경력</span>
<p className='border-2 rounded-2xl text-center p-3'>신입</p>
  
</div>
</section>

{/* 선호 지역 섹션 */}
<section className='space-y-2-'>

<div className='flex flex-col pr-6 pl-6 gap-2'>
  <span className='text-left font-bold'>선호지역</span>
  <div className='flex flex-row border-2 rounded-2xl items-center p-3 gap-2' >
    <img className='w-[24px] h-[24px] ' src={location} alt="" />
    <p className='text-left'>서울 > 서울 전체</p>
    </div>
  
</div>
</section>

{/* 나의 근무 가능 일정 섹션션 */}
{/* 피그마 아이콘 변경 요청 */}

<section className='space-y-2-'>

<div className='flex flex-col pr-6 pl-6 gap-2'>
  <span className='text-left font-bold'>나의 근무 가능 일정</span>
  <div className='flex flex-row border-2 rounded-2xl items-center p-3 gap-2' >
    <img className='w-[24px] h-[24px] ' src={location} alt="" />
    <p className='text-left'>서울 > 서울 전체</p>
    </div>
  
</div>
</section>


          <section className='space-y-2'>
          <p>
              <span className='text-gray-500'>연락처: </span>
              {profile.phone || '미설정'}
            </p>
          </section>
        </profile>

        {/* 희망 급여 섹션 */}
        <section className='space-y-4'>
          <h2 className='font-semibold'>희망 급여</h2>
          <div>
            {profile.pay ? (
              <p>
                {profile.pay.type === 'hourly'
                  ? '시급'
                  : profile.pay.type === 'daily'
                    ? '일급'
                    : '주급'}
                {profile.pay.amount?.toLocaleString()}원
              </p>
            ) : (
              <p>설정된 급여가 없습니다.</p>
            )}
          </div>
        </section>

        

        {/* 돌봄 유형 섹션 */}
        <section className='space-y-4'>
          <h2 className='font-semibold'>돌봄 유형</h2>
          <div className='space-y-2 text-sm'>
            <p>
              <span className='text-gray-500'>근무 종류: </span>
              {getCareTypeLabel('workTypes')}
            </p>
            <p>
              <span className='text-gray-500'>장기요양등급: </span>
              {getCareTypeLabel('careGrade')}
            </p>

            <p>
              <span className='text-gray-500'>동거인 여부: </span>
              {getCareTypeLabel('livingArrangement')}
            </p>
            <p>{getCareTypeLabel('gender')}</p>
            <p>
              <span className='text-gray-500'>식사보조: </span>
              {getCareTypeLabel('mealCare')}
            </p>
            <p>
              <span className='text-gray-500'>이동보조: </span>
              {getCareTypeLabel('mobilitySupport')}
            </p>
            <p>
              <span className='text-gray-500'>일상생활: </span>
              {getCareTypeLabel('dailyLife')}
            </p>
          </div>
        </section>

        {/* 선호 지역 섹션 */}
        <section className='space-y-4'>
          <h2 className='font-semibold'>선호 지역</h2>
          <div>
            {Object.entries(profile.locations || {})
              .filter(([_, districts]) => districts.length > 0)
              .map(([city, districts]) => districts.map((district) => `${city}-${district}`))
              .flat()
              .join(', ') || '선택된 지역이 없습니다.'}
          </div>
        </section>

        {/* 근무 가능 시간 섹션 */}
        <section className='space-y-4'>
          <h2 className='font-semibold'>근무 가능 시간</h2>
          <div>
            {Object.entries(profile.schedules || {})
              .map(([day, time]) => `${day}요일 ${time.start}시-${time.end}시`)
              .join(', ') || '설정된 근무시간이 없습니다.'}
          </div>
        </section>

        <Button onClick={handleEdit} className='mt-4'>
          프로필 수정하기
        </Button>
      </main>
      <Footer />
    </>
  );
}
