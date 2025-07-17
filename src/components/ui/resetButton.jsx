import close from '@/assets/images/close.png';

function ResetButton(props) {
  const { resetFunc } = props;
  return (
    <button
      className='w-40 h-14 border border-[var(--outline)] rounded-4xl flex items-center justify-center gap-2 text-xl'
      onClick={resetFunc}
    >
      <img src={close} />
      지역 초기화
    </button>
  );
}

export default ResetButton;
