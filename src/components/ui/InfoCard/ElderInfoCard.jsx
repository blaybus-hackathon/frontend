import profInit from '@/assets/images/elder-basic-profile.png';

export default function ElderInfoCard({ isChecked, onClick, showCheck = true, user }) {
  const fields = [
    {
      label: '근무종류',
      text: user && user.workType,
    },
    {
      label: '주소지',
      text: user && user.address,
    },
    {
      label: '장기요양등급',
      text: user && user.careLevelStr,
    },
  ];

  return (
    <div className={`w-full mb-3 lg:mb-5`} onClick={onClick}>
      <div
        className={`flex items-center rounded-[1rem] flex-col px-4 mx-auto ${
          isChecked
            ? 'border-2 border-[var(--company-primary)]'
            : 'border-2 border-[var(--outline)]'
        }`}
      >
        <div className='flex mx-[1rem] w-full my-5 relative'>
          <div className='bg-white rounded-[50%] size-16 flex items-center justify-center mr-3'>
            <img
              src={user.imgAddress ? user.imgAddress : profInit}
              alt='profile'
              className='items-center size-full'
            />
          </div>
          <div className='flex flex-col items-start gap-1 py-2'>
            <p className='font-semibold'>{user && user.name} 어르신</p>
            <p className='font-normal'>{user && `${user.genderStr} / ${user.age}`}세</p>
          </div>
          <div className={`absolute top-0 right-0 ${!showCheck ? 'hidden' : ''}`}>
            <svg
              width='29'
              height='29'
              viewBox='0 0 29 29'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              // onClick={onCheck}
            >
              <rect
                width='29'
                height='29'
                rx='14.5'
                fill={isChecked ? 'var(--company-primary)' : '#B6B6B6'}
              />
              <path
                d='M8.39775 15.7273C8.17808 15.5076 7.82192 15.5076 7.60225 15.7273C7.38258 15.9469 7.38258 16.303 7.60225 16.5227L10.9773 19.8977C11.1969 20.1174 11.5531 20.1174 11.7727 19.8977L20.0227 11.6477C20.2424 11.4281 20.2424 11.0719 20.0227 10.8523C19.803 10.6326 19.4469 10.6326 19.2273 10.8523L11.375 18.7045L8.39775 15.7273Z'
                fill='white'
              />
            </svg>
          </div>
        </div>
        <hr className='h-[2px] w-full bg-[var(--outline)]' />
        <div className='bg-white w-full rounded-[1rem] font-bold flex flex-col gap-y-3 px-3 py-5 lg:px-5 lg:py-7'>
          {fields.map((field, idx) => (
            <div key={idx} className={`grid grid-cols-[7rem_1fr] items-center gap-5 md:gap-16`}>
              <h4 className='text-start text-[var(--black)] text-lg font-semibold'>
                {field.label}
              </h4>
              <div className='flex justify-start rounded-[0.625rem]'>
                <span className='text-start text-[var(--black)] text-lg font-normal break-keep whitespace-pre-wrap'>
                  {field.text}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
