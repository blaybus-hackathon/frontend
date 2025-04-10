import { Button } from '@/components/ui/custom/button';
import Profile from '@/assets/images/elder-basic-profile.png';

export default function ElderRegiComplete() {
  return (
    <section className='flex flex-col items-center justify-center mt-[3.13rem]'>
      <img src={Profile} alt='profile' className='w-[14.375rem] h-auto' />

      <div className='my-[3.06rem] flex flex-col gap-[1.81rem]'>
        <p className='text-[var-(--text)] text-xl font-bold'>어르신이 등록되었습니다!</p>
        {/* todo : 어르신 이름 추가 */}
        <p className='text-[var(--text)] text-[1.125rem] font-medium'>김길자 어르신</p>
      </div>

      <div className='flex flex-col gap-[1.31rem] w-full'>
        {/* todo : 페이지 연결 */}
        <Button className='w-full h-[4.0625rem]'>요양사 매칭하러 가기</Button>
        <Button variant={'white'} className='w-full h-[4.0625rem]'>
          홈으로 가기
        </Button>
      </div>
    </section>
  );
}
