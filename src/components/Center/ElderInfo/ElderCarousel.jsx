import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/custom/carousel';
import ElderCard from '@/components/Center/ElderInfo/ElderCard';
import { useMatchedList } from '@/hooks/center/service/useMatchedList';

export default function ElderCarousel() {
  const { data, isLoading, isError } = useMatchedList();

  if (!data) {
    return (
      <div className='flex justify-center items-center '>
        <p className='text-base font-normal text-[var(--text)]'>매칭된 어르신이 없습니다.</p>
      </div>
    );
  }
  // TODO: 추후 로딩, 에러 처리 추가
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }
  return (
    <Carousel opts={{ loop: true }}>
      <CarouselContent className='w-[99%]'>
        {data.map((elder) => (
          <CarouselItem key={elder.patientSeq} className='flex justify-center'>
            <ElderCard elderInfo={elder} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
