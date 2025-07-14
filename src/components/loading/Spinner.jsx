import { SyncLoader } from 'react-spinners';

function Spinner() {
  return (
    <div className='flex flex-col gap-5 items-center justify-center h-screen'>
      <SyncLoader color={'var(--main)'} />
      <h1 className='text-[var(--main)] font-semibold text-xl'>Loading . . .</h1>
    </div>
  );
}

export default Spinner;
