import Header from '@/components/ui/temp/Header';
import { Button } from '@/components/ui/custom/Button';
import { Input } from '@/components/ui/custom/input';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { request } from '@/api';
import recruitStore from '@/store/jbStore/recruitStore';

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
    '다른가족과 동거 (돌봄 중 집에 있음)',
    '다른 가족과 동거, 돌봄 시간 중 자리 비움',
  ];
  const MEAL = ['스스로 식사 가능', '식사 차려드리기', '요리 필요', '경관식 보조'];
  const TOILET = ['스스로 가능', '기저귀 케어', '실수 시 도움', '장루 관리'];
  const MOBILE = ['스스로 가능', '부축 도움', '휠체어 이동', '거동 불가'];
  const DAILY = [
    '청소, 빨래 보조',
    '목욕 보조',
    '병원 동행',
    '산책, 간단한 운동',
    '말벗, 정서지원',
    '인지자극 활동',
  ];

  // const { patientData, setPatient } = patientStore();
  const { recruitInfo } = recruitStore();

  const navigate = useNavigate();

  const [name, setName] = useState(recruitInfo.name);
  const [birthday, setBirthday] = useState(recruitInfo.birthDate);
  const [gender, setGender] = useState(recruitInfo.genderStr);
  const [grade, setGrade] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState([]);
  const [weight, setWeight] = useState(recruitInfo.weight);
  const [disease, setDisease] = useState(recruitInfo.diseases);
  const [demen, setDemen] = useState([]);
  const [selectedDemen, setSelectedDemen] = useState([]);
  const [withs, setWiths] = useState([]);
  const [selectedWith, setSelectedWith] = useState([]);
  const [meal, setMeal] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState([]);
  const [toilet, setToilet] = useState([]);
  const [selectedToilet, setSelectedToilet] = useState([]);
  const [mobile, setMobile] = useState([]);
  const [selectedMobile, setSelectedMobile] = useState([]);
  const [daily, setDaily] = useState([]);
  const [selectedDaily, setSelectedDaily] = useState([]);
  const [guitar, setGuitar] = useState(recruitInfo.requestContents);

  const [selectedWelfare, setSelectedWelfare] = useState([]);
  const [selectedWorkType, setSelectedWorkType] = useState([]);

  useEffect(() => {
    request('get', '/cmn/all-care-list')
      .then((res) => {
        setGrade(res.careLevelList);
        setDemen(res.dementiaSymptomList);
        setWiths(res.inmateStateList);
        setMeal(res.serviceMealList);
        setToilet(res.serviceToiletList);
        setMobile(res.serviceMobilityList);
        setDaily(res.serviceDailyList);

        setSelectedGrade(
          res.careLevelList
            .filter((x) => recruitInfo.careChoice.careLevelList.includes(x.id))
            .map((c) => c.careVal),
        );
        setSelectedDemen(
          res.dementiaSymptomList
            .filter((x) => recruitInfo.careChoice.dementiaSymptomList.includes(x.id))
            .map((d) => d.careVal),
        );
        setSelectedWith(
          res.inmateStateList
            .filter((x) => recruitInfo.careChoice.inmateStateList.includes(x.id))
            .map((w) => w.careVal),
        );
        setSelectedMeal(
          res.serviceMealList
            .filter((x) => recruitInfo.careChoice.serviceMealList.includes(x.id))
            .map((m) => m.careVal),
        );
        setSelectedToilet(
          res.serviceToiletList
            .filter((x) => recruitInfo.careChoice.serviceToiletList.includes(x.id))
            .map((t) => t.careVal),
        );
        setSelectedMobile(
          res.serviceMobilityList
            .filter((x) => recruitInfo.careChoice.serviceMobilityList.includes(x.id))
            .map((m) => m.careVal),
        );
        setSelectedDaily(
          res.serviceDailyList
            .filter((x) => recruitInfo.careChoice.serviceDailyList.includes(x.id))
            .map((d) => d.careVal),
        );

        setSelectedWelfare(
          res.welfareList
            .filter((x) => recruitInfo.careChoice.welfareList.includes(x.id))
            .map((w) => w.careVal),
        );
        setSelectedWorkType(
          res.workTypeList
            .filter((x) => recruitInfo.careChoice.workTypeList.includes(x.id))
            .map((w) => w.careVal),
        );
      })
      .catch((e) => console.error(e));
  }, []);

  const renderButtons = (items, selectedList = null, setSelectedList = null) =>
    items.map((item, idx) => (
      <Button
        key={idx}
        // variant={selectedList?.includes(item.careVal) ? 'default' : 'outline'}
        className='h-16 text-lg font-medium w-full mb-0'
        // onClick={() => {
        //   if (selectedList.includes(item.careVal)) {
        //     setSelectedList((prev) => prev.filter((x) => x !== item.careVal));
        //   } else {
        //     setSelectedList((prev) => [...prev, item.careVal]);
        //   }
        // }}
      >
        {/* {item.careName} */}
        {item}
      </Button>
    ));

  const modify = () => {
    // setPatient({
    //   name: name,
    //   gender: gender,
    //   grade: grade,
    //   weight: weight,
    //   disease: disease,
    //   dementia: demen,
    //   with: withs,
    //   meal: meal,
    //   toilet: toilet,
    //   mobile: mobile,
    //   daily: daily,
    // });
    const updateData = {
      reMatchYn: false,
      patientLogSeq: recruitInfo.patientSeq,
      linkingYn: recruitInfo.linkingYn,
      welfare: selectedWelfare.reduce((acc, cur) => acc + cur, 0),
      wageNegotiation: recruitInfo.wageNegotiation,
      wageState: recruitInfo.wageState,
      wage: recruitInfo.wage,
      requestContents: guitar,
      name,
      afSeq: recruitInfo.afSeq,
      asSeq: recruitInfo.asSeq,
      atSeq: recruitInfo.atSeq,
      gender: gender === '남성' ? 1 : 2,
      birthDate: birthday,
      weight,
      diseases: recruitInfo.diseases,
      careLevel: selectedGrade.reduce((acc, cur) => acc + cur, 0),
      workType: selectedWorkType.reduce((acc, cur) => acc + cur, 0),
      timeNegotiation: recruitInfo.timeNegotiation,
      timeList: recruitInfo.timeList,
      dementiaSymptom: selectedDemen.reduce((acc, cur) => acc + cur, 0),
      inmateState: selectedWith.reduce((acc, cur) => acc + cur, 0),
      serviceMeal: selectedMeal.reduce((acc, cur) => acc + cur, 0),
      serviceToilet: selectedToilet.reduce((acc, cur) => acc + cur, 0),
      serviceMobility: selectedMobile.reduce((acc, cur) => acc + cur, 0),
      serviceDaily: selectedDaily.reduce((acc, cur) => acc + cur, 0),
    };
    request('post', '/recruit-patient/update', updateData)
      .then(() => {
        navigate('/status');
      })
      .catch((e) => {
        console.error(`공고 수정 실패 : ${e}`);
      });
  };

  return (
    <div>
      <Header title='공고 수정하기' />
      <div className='max-w-2xl mx-auto px-6 mt-8 gap-10 flex flex-col mb-40'>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-5'>
            이름<span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
          </label>
          <Input
            className='h-16 text-lg rounded-md border-[var(--outline)]'
            width='100%'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-5'>
            생년월일<span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
          </label>
          <Input
            className='h-16 text-lg rounded-md border-[var(--outline)]'
            width='100%'
            type='number'
            value={birthday}
            onChange={(e) => {
              setBirthday(e.target.value);
            }}
          />
        </div>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-5'>
            보유질병
            <span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
          </label>
          <Input
            className='h-16 text-lg rounded-md border-[var(--outline)]'
            width='100%'
            value={disease}
            onChange={(e) => {
              setDisease(e.target.value);
            }}
          />
        </div>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-5'>
            몸무게
            <span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
          </label>
          <div className='h-16 text-lg rounded-md border border-[var(--outline)] w-full text-start relative'>
            <input
              type='number'
              className='h-16 w-full px-4'
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
              }}
            />
            <span className='absolute right-3 top-1/2 transform -translate-y-1/2 text-lg'>kg</span>
          </div>
        </div>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-5'>
            성별<span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
          </label>
          <div className='flex gap-4 w-full'>
            <Button
              variant={gender === '여성' ? 'default' : 'outline'}
              className='flex-1 h-16 text-lg mb-0'
              onClick={() => {
                setGender('여성');
              }}
            >
              여성
            </Button>
            <Button
              variant={gender === '남성' ? 'default' : 'outline'}
              className='flex-1 h-16 text-lg mb-0'
              onClick={() => {
                setGender('남성');
              }}
            >
              남성
            </Button>
          </div>
        </div>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-5'>
            장기요양등급
            <span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
          </label>
          <div className='w-full grid grid-cols-2 gap-4'>
            {renderButtons(GRADE, selectedGrade, setSelectedGrade)}
          </div>
        </div>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-5'>
            동거인 여부
            <span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
          </label>
          <div className='w-full grid gap-4'>
            {renderButtons(WITH, selectedWith, setSelectedWith)}
          </div>
        </div>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-5'>
            식사 보조
            <span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
          </label>
          <div className='w-full grid grid-cols-2 gap-4'>
            {renderButtons(MEAL, selectedMeal, setSelectedMeal)}
          </div>
        </div>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>
            이동 보조
            <span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
          </label>
          <div className='w-full grid grid-cols-2 gap-4'>
            {renderButtons(MOBILE, selectedMobile, setSelectedMobile)}
          </div>
        </div>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>
            일상 생활
            <span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
          </label>
          <div className='w-full grid grid-cols-2 gap-4'>
            {renderButtons(DAILY, selectedDaily, setSelectedDaily)}
          </div>
        </div>

        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>
            치매 증상
            {/* <span className='font-normal text-lg'>(복수 선택 가능)</span> */}
            <span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
          </label>
          <div className='w-full grid grid-cols-1 gap-4'>
            {renderButtons(DEMEN, selectedDemen, setSelectedDemen)}
          </div>
        </div>

        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>
            배변보조 <span className='font-normal text-lg'>(복수 선택 가능)</span>
            <span className='text-[var(--required-red)] text-sm ml-2'>필수</span>
          </label>
          <div className='w-full grid grid-cols-2 gap-4'>
            {renderButtons(TOILET, selectedToilet, setSelectedToilet)}
          </div>
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
  );
}
