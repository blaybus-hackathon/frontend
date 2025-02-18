import ButtonGroup from '@/components/ui/Button/ButtonGroup';
import AddressSearch from '../ui/AddressSearch';

export default function CareRequirements() {
  return (
    <div>
      <h1 className='main-title'>돌봄 필요 항목을 선택해주세요!</h1>
      {/* 근무 종류 */}
      <section className='pt-7 flex justify-start flex-col'>
        <div className='flex items-baseline mb-[1.12rem]'>
          <span className='sub-title'>근무 종류</span>
          <span className='text-[#171D1B] text-xl font-normal tracking-[-0.0125rem]'>
            &nbsp;(단일 선택)
          </span>
          <span className='required-text'>&nbsp;필수</span>
        </div>
        <div className='grid grid-cols-2 w-full gap-4'>
          <ButtonGroup
            groupName='careType'
            options={[
              '방문요양',
              '요양원',
              '입주요양',
              '병원',
              '방문목욕',
              '병원동행',
              '주야간보호',
            ]}
          />
        </div>
      </section>
      {/* 근무지 주소 */}
      <section className='pt-7 flex justify-start flex-col'>
        <div className='flex items-baseline mb-[1.12rem]'>
          <span className='sub-title'>근무지 주소</span>
          <span className='required-text'>&nbsp;필수</span>
        </div>
      </section>
    </div>
  );
}
