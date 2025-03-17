import Header from '@/components/ui/temp/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import patientStore from '@/store/patientStore';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function ModifyInfo() {
  const GRADE = ['등급 없음', '1등급', '2등급', '3등급', '4등급', '5등급', '인지지원등급'];
  const DEMEN = [
    '정상 (치매 증상 없음)',
    '집 밖을 배회',
    '단기 기억 장애 (했던 말을 반복)',
    '가족을 알아보지 못함',
    '길을 잃거나 자주 가던 곳을 헤맴',
    '사람을 의심하는 망상',
    '어린아이 같은 행동',
    '때리거나 욕설 등 공격적인 행동',
  ];
  const WITH = [
    '독거',
    '배우자와 동거, 돌봄 시간 중 집에 있음',
    '배우자와 동거, 돌봄 시간 중 자리 비움',
    '다른 가족과 동거, 돌봄 시간 중 집에 있음',
    '다른 가족과 동거, 돌봄 시간 중 자리 비움',
  ];
  const MEAL = ['스스로 식사 가능', '식사 차려드리기', '죽, 반찬 등 요리 필요', '경관식 보조'];
  const TOILET = [
    '스스로 배변 가능',
    '기저귀 케어 필요',
    '가끔 대소변 실수 시 도움',
    '유치도뇨/방광루/장루 관리',
  ];
  const MOBILE = ['스스로 거동 가능', '이동시 부축 도움', '휠체어 이동 보조', '거동 불가'];
  const DAILY = [
    '청소, 빨래 보조',
    '목욕 보조',
    '병원 동행',
    '산책, 간단한 운동',
    '말벗 등 정서지원',
    '인지자극 활동',
  ];

  const { patientData, recruitData, setPatient } = patientStore();

  const navigate = useNavigate();

  const [name, setName] = useState(patientData.name);
  const [birthday, setBirthday] = useState(patientData.birth);
  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [gender, setGender] = useState(patientData.gender);
  const [grade, setGrade] = useState(patientData.grade);
  const [weight, setWeight] = useState(patientData.weight);
  const [disease, setDisease] = useState(patientData.disease);
  const [demen, setDemen] = useState(patientData.dementia);
  const [withs, setWiths] = useState(patientData.with);
  const [meal, setMeal] = useState(patientData.meal);
  const [toilet, setToilet] = useState(patientData.toilet);
  const [mobile, setMobile] = useState(patientData.mobile);
  const [daily, setDaily] = useState(patientData.daily);
  const [guitar, setGuitar] = useState('');

  // const [, year, month, day] = birthday.match(/(\d{4})년 (\d{1,2})월 (\d{1,2})일/) || [];

  useEffect(() => {
    const match = birthday.match(/(\d{4})년 (\d{1,2})월 (\d{1,2})일/);
    if (match) {
      setYear(match[1]);
      setMonth(match[2]);
      setDay(match[3]);
    }
  }, [birthday]);

  const renderGrade = () =>
    GRADE.map((gd, idx) => (
      <Button
        key={idx}
        className={`h-16 text-lg font-medium ${
          grade === gd
            ? 'bg-[var(--company-primary)] text-white'
            : 'bg-[var(--button-inactive)] text-black'
        }`}
        onClick={(e) => {
          // console.log(e.target.innerText);
          // setGrade(e.target.innerText);
          setGrade(gd);
        }}
      >
        {gd}
      </Button>
    ));
  const renderDemen = () =>
    DEMEN.map((d, idx) => (
      <Button
        key={idx}
        className={`h-16 text-lg font-medium ${
          demen.includes(d)
            ? 'bg-[var(--company-primary)] text-white'
            : 'bg-[var(--button-inactive)] text-black'
        }`}
        onClick={() => {
          if (demen.includes(d)) setDemen((prev) => prev.filter((item) => item !== d));
          else setDemen((prev) => [...prev, d]);
        }}
      >
        {d}
      </Button>
    ));
  const renderWith = () =>
    WITH.map((w, idx) => (
      <Button
        key={idx}
        className={`h-16 text-lg font-medium ${
          withs === w
            ? 'bg-[var(--company-primary)] text-white'
            : 'bg-[var(--button-inactive)] text-black'
        }`}
        onClick={() => {
          setWiths(w);
        }}
      >
        {w}
      </Button>
    ));
  const renderMeal = () =>
    MEAL.map((d, idx) => (
      <Button
        key={idx}
        className={`h-16 text-lg font-medium ${
          meal.includes(d)
            ? 'bg-[var(--company-primary)] text-white'
            : 'bg-[var(--button-inactive)] text-black'
        }`}
        onClick={() => {
          if (meal.includes(d)) setMeal((prev) => prev.filter((item) => item !== d));
          else setMeal((prev) => [...prev, d]);
        }}
      >
        {d}
      </Button>
    ));
  const renderToilet = () =>
    TOILET.map((d, idx) => (
      <Button
        key={idx}
        className={`h-16 text-lg font-medium ${
          toilet.includes(d)
            ? 'bg-[var(--company-primary)] text-white'
            : 'bg-[var(--button-inactive)] text-black'
        }`}
        onClick={() => {
          if (toilet.includes(d)) setToilet((prev) => prev.filter((item) => item !== d));
          else setToilet((prev) => [...prev, d]);
        }}
      >
        {d}
      </Button>
    ));
  const renderMobile = () =>
    MOBILE.map((d, idx) => (
      <Button
        key={idx}
        className={`h-16 text-lg font-medium ${
          mobile.includes(d)
            ? 'bg-[var(--company-primary)] text-white'
            : 'bg-[var(--button-inactive)] text-black'
        }`}
        onClick={() => {
          if (mobile.includes(d)) setMobile((prev) => prev.filter((item) => item !== d));
          else setMobile((prev) => [...prev, d]);
        }}
      >
        {d}
      </Button>
    ));

  const renderDaily = () =>
    DAILY.map((d, idx) => (
      <Button
        key={idx}
        className={`h-16 text-lg font-medium ${
          daily.includes(d)
            ? 'bg-[var(--company-primary)] text-white'
            : 'bg-[var(--button-inactive)] text-black'
        }`}
        onClick={() => {
          if (daily.includes(d)) setDaily((prev) => prev.filter((item) => item !== d));
          else setDaily((prev) => [...prev, d]);
        }}
      >
        {d}
      </Button>
    ));

  const modify = () => {
    setPatient({
      name: name,
      birth: `${year}년 ${month}월 ${day}일`,
      gender: gender,
      grade: grade,
      weight: weight,
      disease: disease,
      dementia: demen,
      with: withs,
      meal: meal,
      toilet: toilet,
      mobile: mobile,
      daily: daily,
    });
    navigate('/status');
  };

  return (
    <div>
      <Header title='공고 수정하기' />
      <div className='max-w-2xl mx-auto'>
        <p className='mt-10 font-bold text-xl mb-7'>{`(${patientData.name})어르신의 정보를 확인해주세요`}</p>
        <div className='px-6 gap-5 flex flex-col mb-40'>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-4'>
              이름<span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
            </label>
            <Input
              className='h-16 bg-[var(--button-inactive)] font-medium text-lg'
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-4'>
              생년월일<span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
            </label>
            <div className='flex gap-3'>
              <div className='flex flex-1 h-16 bg-[var(--button-inactive)] font-medium text-lg'>
                <Input
                  className='flex-1 h-full text-center border-none'
                  value={year}
                  onChange={(e) => {
                    setYear(e.target.value);
                  }}
                />
                <p className='h-full flex items-center'>년</p>
              </div>
              <div className='flex flex-1 h-16 bg-[var(--button-inactive)] font-medium text-lg'>
                <Input
                  className='flex-1 h-full text-center border-none'
                  value={month}
                  onChange={(e) => {
                    setMonth(e.target.value);
                  }}
                />
                <p className='h-full flex items-center'>월</p>
              </div>
              <div className='flex flex-1 h-16 bg-[var(--button-inactive)] font-medium text-lg'>
                <Input
                  className='flex-1 h-full text-center border-none'
                  value={day}
                  onChange={(e) => {
                    setDay(e.target.value);
                  }}
                />
                <p className='h-full flex items-center'>일</p>
              </div>
              {/* <Input
                className='flex-1 h-16 bg-[var(--button-inactive)] font-medium text-lg'
                value='1'
              />
              <Input
                className='flex-1 h-16 bg-[var(--button-inactive)] font-medium text-lg'
                value='27'
              /> */}
            </div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-4'>
              성별<span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
            </label>
            <div className='flex gap-4 w-full'>
              <Button
                className={`flex-1 h-16 ${
                  gender === '여성'
                    ? 'bg-[var(--company-primary)] text-white'
                    : 'bg-[var(--button-inactive)] text-black'
                } text-lg`}
                onClick={() => {
                  setGender('여성');
                }}
              >
                여성
              </Button>
              <Button
                className={`flex-1 h-16 ${
                  gender === '남성'
                    ? 'bg-[var(--company-primary)] text-white'
                    : 'bg-[var(--button-inactive)] text-black'
                } text-lg`}
                onClick={() => {
                  setGender('남성');
                }}
              >
                남성
              </Button>
            </div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-4'>
              장기요양등급 <span className='font-normal text-lg'>(단일 선택)</span>
              <span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
            </label>
            <div className='w-full grid grid-cols-2 gap-4'>{renderGrade()}</div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-4'>
              몸무게
              <span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
            </label>
            <div className='relative flex items-center w-full'>
              <Input
                type='number'
                className='flex-1 h-16 bg-[var(--button-inactive)] text-lg text-center pr-10'
                value={weight}
                onChange={(e) => {
                  setWeight(e.target.value);
                }}
              />
              <span className='absolute right-2 text-lg'>kg</span>
            </div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-4'>
              보유 질병/질환
              <span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
            </label>
            <Input
              className='h-16 bg-[var(--button-inactive)] font-medium text-lg'
              value={disease}
              onChange={(e) => {
                setDisease(e.target.value);
              }}
            />
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-4'>
              치매 증상 <span className='font-normal text-lg'>(복수 선택 가능)</span>
              <span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
            </label>
            <div className='w-full grid grid-cols-1 gap-4'>{renderDemen()}</div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-4'>
              동거인 여부 <span className='font-normal text-lg'>(단일 선택)</span>
              <span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
            </label>
            <div className='w-full grid gap-4'>{renderWith()}</div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-4'>
              식사 보조 <span className='font-normal text-lg'>(복수 선택 가능)</span>
              <span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
            </label>
            <div className='w-full grid grid-cols-2 gap-4'>{renderMeal()}</div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-4'>
              배변보조 <span className='font-normal text-lg'>(복수 선택 가능)</span>
              <span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
            </label>
            <div className='w-full grid grid-cols-1 gap-4'>{renderToilet()}</div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-4'>
              이동 보조 <span className='font-normal text-lg'>(복수 선택 가능)</span>
              <span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
            </label>
            <div className='w-full grid grid-cols-2 gap-4'>{renderMobile()}</div>
          </div>
          <div className='flex flex-col items-start'>
            <label className='font-semibold text-xl mb-4'>
              일상 생활 <span className='font-normal text-lg'>(복수 선택 가능)</span>
              <span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
            </label>
            <div className='w-full grid grid-cols-2 gap-4'>{renderDaily()}</div>
          </div>
          <div className='flex flex-col items-start relative'>
            <label className='font-semibold text-xl mb-4'>
              기타 요청 사항
              <span className='font-normal text-sm ml-2'>선택</span>
            </label>
            <textarea
              maxLength={300}
              placeholder='기타 작성 (최대 300자)'
              className='border w-full rounded-md h-65 p-4'
              value={guitar}
              onChange={(e) => {
                setGuitar(e.target.value);
              }}
            />
            <span className='absolute -bottom-6 right-3'>{`${guitar.length}/300`}</span>
          </div>
          <Button
            className='h-16 w-4/5 bg-[var(--company-primary)] text-xl hover:bg-[var(--company-primary)]/90 fixed bottom-8 left-1/2 -translate-x-1/2 font-bold'
            onClick={() => {
              modify();
            }}
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
}
