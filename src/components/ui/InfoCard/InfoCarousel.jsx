import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/custom/carousel';

/**
 * @param {Array} data - carousel에 표시할 데이터 배열
 * @param {function} renderItem - 각 아이템을 렌더링하는 함수(카드 컴포넌트)
 */

export default function InfoCarousel({ data = [], renderItem, className }) {
  return (
    <Carousel opts={{ loop: true }}>
      <CarouselContent className={`w-[97%] mx-auto lg:w-[98%] ${className}`}>
        {data.map((item, index) => (
          <CarouselItem key={index} className='flex basis-[93%] lg:basis-11/12'>
            {renderItem(item)}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
