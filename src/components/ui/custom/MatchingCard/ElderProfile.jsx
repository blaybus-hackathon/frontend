import profile from '@/assets/images/elder-basic-profile.png';

// TODO: 추후 어르신 프로필 사진 설정 필요
export default function ElderProfile({ elderInfo }) {
  return (
    <>
      <div className='flex border-b-1 border-[var(--outline)] pb-[1.19rem]'>
        <img src={profile} alt='어르신 이미지' className='w-[3.5rem] h-auto mr-[1.88rem]' />
        <div className='flex flex-col items-start'>
          <p className='text-[1.125rem] font-semibold text-[var(--text)]'>
            {elderInfo.name} 어르신
          </p>
          <p className='text-[1.125rem] font-normal text-[var(--text)]'>
            {elderInfo.gender} / {elderInfo.age}세
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
          <span className='font-normal text-[var(--text)]'>{elderInfo.serviceType}</span>
          <span className='font-normal text-[var(--text)]'>{elderInfo.address}</span>
          <span className='font-normal text-[var(--text)]'>{elderInfo.careLevel}</span>
        </div>
      </div>
    </>
  );
}
