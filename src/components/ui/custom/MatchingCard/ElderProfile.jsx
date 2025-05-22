import { useMemo } from 'react';
import profile from '@/assets/images/elder-basic-profile.png';
import { getGenderLabel, getAgeFromBirth } from '@/utils/format';
import { useElderFormData } from '@/hooks/center/service/useElderFormData';

// TODO: 추후 어르신 프로필 사진 설정 필요
export default function ElderProfile({ elderInfo }) {
  const address = `${elderInfo.tblAddressFirst} ${elderInfo.tblAddressSecond} ${elderInfo.tblAddressThird}`;
  const { workTypeList } = useElderFormData();

  const workTypeMap = useMemo(() => {
    const map = new Map();
    for (const item of workTypeList) {
      map.set(item.careVal, item.careName);
    }
    return map;
  }, [workTypeList]);

  const workTypeLabel = workTypeMap.get(elderInfo.workType) ?? '알 수 없음';

  return (
    <>
      <div className='flex border-b-1 border-[var(--outline)] pb-[1.19rem]'>
        <img src={profile} alt='어르신 이미지' className='w-[3.5rem] h-auto mr-[1.88rem]' />
        <div className='flex flex-col items-start'>
          <p className='text-[1.125rem] font-semibold text-[var(--text)]'>
            {elderInfo.name} 어르신
          </p>
          <p className='text-[1.125rem] font-normal text-[var(--text)]'>
            {getGenderLabel(elderInfo.gender)} / {getAgeFromBirth(elderInfo.birth)}세
          </p>
        </div>
      </div>
      <div className='flex items-start mt-[1.41rem] mb-[3.38rem] gap-[0.94rem]'>
        <div className='w-[6.5rem] flex flex-col gap-[0.62rem] items-start'>
          <span className='font-semibold text-[var(--button-black)]'>근무종류</span>
          <span className='font-semibold text-[var(--button-black)]'>주소지</span>
          <span className='font-semibold text-[var(--button-black)]'>장기요양등급</span>
        </div>
        <div className='flex flex-col gap-[0.62rem] items-start'>
          <span className='font-normal text-[var(--text)]'>{workTypeLabel}</span>
          <span className='font-normal text-[var(--text)]'>{address}</span>
          {/* TODO: 장기요양등급 라벨 추가 필요 */}
          <span className='font-normal text-[var(--text)]'>등급없음</span>
        </div>
      </div>
    </>
  );
}
