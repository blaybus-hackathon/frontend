import { useNavigate } from 'react-router-dom';

import logo from '@/assets/images/logo.png';
import profInit from '@/assets/images/default-profile.png';
import { Button } from '@/components/ui/button';
import patientStore from '@/store/patientStore';

export default function PatientInfo() {
  const navigate = useNavigate();

  const { patientData, recruitData } = patientStore();

  const renderHelp = (array) =>
    array.map((help, idx) => (
      <div
        key={idx}
        className='bg-[var(--button-inactive)] rounded-md h-16 flex justify-center items-center px-3 py-1'
      >
        {help}
      </div>
    ));

  // const renderDementia = () => {
  //   let dementiaStr = '';
  //   patientData.dementia.map((d) => {dementiaStr + });
  // };

  const gotoModify = () => {
    navigate('/modify');
  };
  return (
    <div>
      <header className='bg-[var(--button-inactive)] h-[3.375rem] px-6 flex items-center justify-between'>
        <img src={logo} className='w-27 h-3' />
        <div className='flex items-center gap-3'>
          <span className='font-bold'>직원이름</span>
          <img src={logo} className='size-[37px] rounded-[50%]' />
        </div>
      </header>
      <div className='px-6'>
        <p className='mt-10 font-bold text-2xl mb-7'>{`[${patientData.name}] 어르신 구인합니다.`}</p>
        <div className='border border-[var(--company-primary)] bg-[var(--button-inactive)] flex items-start p-4 rounded-2xl mb-7'>
          <div className='bg-white rounded-[50%] size-16 flex items-center justify-center mr-3'>
            <img src={profInit} className='items-center size-5' />
          </div>
          <div className='flex flex-col items-start gap-1 py-2'>
            <p className='font-semibold text-xl'>
              {patientData.name}
              <span className='bg-black rounded-3xl text-xs text-white py-1 px-1.5 ml-1.5'>
                어르신
              </span>
            </p>
            <p className='font-normal'>{`${patientData.gender}/${patientData.age}세`}</p>
          </div>
        </div>
        <div className='flex items-center mb-9'>
          <span className='text-[var(--company-primary)] font-bold text-2xl justify-center flex justify-center items-center'>
            {`${recruitData.wageType} ${recruitData.wage}원`}
          </span>
          {recruitData.payNego && (
            <span className='inline-block ml-2 bg-black text-xs text-white rounded-3xl h-6 px-2 flex items-center pt-[2px] font-semibold mt-[3vpx]'>
              협의 가능
            </span>
          )}
        </div>
      </div>
      <div className='h-2 bg-[var(--button-inactive)]'></div>
      <div className='py-7 px-6 font-bold flex flex-col gap-3 items-start'>
        <p>
          <span className='text-sm font-normal'>근무 종류</span> {patientData.workType}
        </p>
        <p>
          <span className='text-sm font-normal'>주소지</span> {patientData.address}
        </p>
        <p>
          <span className='text-sm font-normal'>장기요양등급</span> {patientData.grade}
        </p>
        <p>
          <span className='text-sm font-normal'>몸무게</span> {patientData.weight} kg
        </p>
        <p className='flex gap-1'>
          <p className='inline-block text-sm font-normal text-left w-auto'>치매 증상 </p>
          <p className='text-left flex-1'>{patientData.dementia.join(', ')}</p>
        </p>
        <div className='text-left flex gap-1'>
          <span className='text-sm font-normal'>동거인 여부</span>{' '}
          <p className='flex-1'>{patientData.with}</p>
        </div>
      </div>
      <div className='h-2 bg-[var(--button-inactive)]'></div>
      <div className='px-6 pt-8 flex flex-col gap-5 items-start mb-40'>
        <p className='font-bold text-xl'>*케어 필요 항목</p>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>식사 보조</label>
          <div className='w-full grid grid-cols-2 gap-4 font-medium text-lg'>
            {renderHelp(patientData.meal)}
          </div>
        </div>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>배변 보조</label>
          <div className='w-full grid grid-cols-2 gap-4 font-medium text-lg'>
            {renderHelp(patientData.toilet)}
          </div>
        </div>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>이동 보조</label>
          <div className='w-full grid grid-cols-2 gap-4 font-medium text-lg'>
            {renderHelp(patientData.mobile)}
          </div>
        </div>
        <div className='flex flex-col items-start'>
          <label className='font-semibold text-xl mb-4'>일상생활</label>
          <div className='w-full grid grid-cols-2 gap-4 font-medium text-lg'>
            {renderHelp(patientData.daily)}
          </div>
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
