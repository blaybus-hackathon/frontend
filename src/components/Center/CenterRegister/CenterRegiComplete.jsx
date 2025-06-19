import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/custom/button';
import Building from '@/assets/images/building.png';
import { useCenterRegiStore } from '@/store/center/useCenterRegiStore';

export default function CenterRegiComplete() {
  const navigate = useNavigate();
  const { registerCenter } = useCenterRegiStore();

  const handleClick = () => {
    navigate('/signin');
  };

  return (
    <div className='h-80vh flex flex-col justify-between items-center pt-10'>
      <div className='flex flex-col items-center'>
        <div className='w-[13.44rem] h-[13.44rem] rounded-full bg-[var(--button-inactive)] flex items-center justify-center'>
          <img src={Building} alt='center-regi-complete' className='w-[6.68rem] h-[6.68rem]' />
        </div>

        <div className='flex flex-col gap-7 text-center mt-10'>
          <h1 className='text-[var(--text)] text-xl font-bold'>{registerCenter.basicInfo.name}</h1>
          <h2 className='text-[var(--text)] text-lg font-medium leading-[2.025rem]'>
            당신의 편리한 업무 파트너
            <br />
            돌봄워크에 오신 것을 환영합니다!
          </h2>
        </div>
      </div>

      <Button className='w-full my-10' onClick={handleClick}>
        로그인하기
      </Button>
    </div>
  );
}
