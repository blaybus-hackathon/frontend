import profInit from '@/assets/images/default-profile.png';

export default function InfoCard({ isChecked, onCheck, showCheck = true, user }) {
  return (
    // <div className='mx-[1.5rem] flex flex-col items-center'>

    <div className={`w-full mb-2.5`}>
      <div
        className={`flex items-center max-w-2xl rounded-[1rem] flex-col px-4 mx-auto ${
          isChecked
            ? 'border-2 border-[var(--company-primary)]'
            : 'border-2 border-[var(--outline)]'
        }`}
      >
        <div className='flex mx-[1rem] w-full my-5 relative'>
          <div className='bg-white rounded-[50%] size-16 flex items-center justify-center mr-3'>
            <img src={profInit} className='items-center size-5' />
          </div>
          <div className='flex flex-col items-start gap-1 py-2'>
            <p className='font-semibold'>{user && user.name} 어르신</p>
            <p className='font-normal'>{user && `${user.gender} / ${user.age}`}세</p>
          </div>
          <div className={`absolute top-0 right-0 ${!showCheck ? 'hidden' : ''}`}>
            <svg
              width='29'
              height='29'
              viewBox='0 0 29 29'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
              onClick={onCheck}
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
        <div className='bg-white mx-auto mt-7 mb-5 w-full rounded-[1rem] font-bold'>
          <p className='text-start pl-2'>
            <span className='w-2/5 inline-block'>근무종류</span>
            <span className='font-normal'>{user && user.workType}</span>
          </p>
          <p className='text-start pl-2'>
            <span className='w-2/5 inline-block'>주소지</span>
            <span className='font-normal'>{user && user.address}</span>
          </p>
          <p className='text-start pl-2'>
            <span className='w-2/5 inline-block'>장기요양등급</span>
            <span className='font-normal'>{user && user.grade}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
