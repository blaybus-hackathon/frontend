import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/custom/carousel';
import MatchingCard from '@/components/ui/custom/MatchingCard/MatchingCard';
import ElderProfile from '@/components/ui/custom/MatchingCard/ElderProfile';
import MatchedCaregiver from '@/components/ui/custom/MatchingCard/MatchedCaregiver';

// TODO: Dummy 데이터 삭제
const elderInfo = {
  name: '박순자',
  gender: '여성',
  age: 80,
  serviceType: '방문요양',
  address: '서울 강남구 서초동',
  careLevel: '등급 없음',
};

export default function ElderInfoCard() {
  return (
    <Carousel className='lg:flex lg:justify-center' opts={{ loop: true }}>
      <CarouselContent className='w-[88%] ml-2'>
        {Array.from({ length: 3 }).map((_, idx) => (
          <CarouselItem key={idx} className='flex justify-center'>
            <MatchingCard>
              <ElderProfile elderInfo={elderInfo} />
              <MatchedCaregiver />
            </MatchingCard>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
