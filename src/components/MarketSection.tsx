import { ChevronLeft, ChevronRight, Flame, Star, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { cn } from '../utils/cn';
import { MarketBox } from './MarketBox';
const SliderControls = ({ isEnd, isBeginning }: { isEnd: boolean; isBeginning: boolean }) => {
  const swipper = useSwiper();
  return (
    <>
      <button
        onClick={() => {
          swipper.slidePrev();
        }}
        className={cn(
          'bg-gray-500/90 p-1.5 rounded-full absolute top-[50%] translate-y-[-50%] left-5 translate-x-[-50%] z-10',

          !isBeginning ? '' : 'opacity-50',
        )}
      >
        <ChevronLeft className="w-4 h-4 text-white"></ChevronLeft>
      </button>
      <button
        onClick={() => {
          swipper.slideNext();
        }}
        className={cn(
          'bg-gray-500/90 p-1.5 rounded-full absolute top-[50%] translate-y-[-50%] right-5 translate-x-[50%] z-10',

          !isEnd ? '' : 'opacity-50',
        )}
      >
        <ChevronRight className="w-4 h-4 text-white"></ChevronRight>
      </button>
    </>
  );
};
export const MarketSection = () => {
  const [isEnd, setIsEnd] = useState(false);
  const [isBeginning, setIsBeginning] = useState(true);

  return (
    <div>
      <Swiper
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        onSlideChange={s => {
          setIsBeginning(s.isBeginning);
          setIsEnd(s.isEnd);
        }}
        className="w-full relative px-5"
        slidesPerView={1}
      >
        <SwiperSlide className="px-5">
          <MarketBox icon={Flame} title="Hot List" />
        </SwiperSlide>

        <SwiperSlide className="px-5">
          <MarketBox icon={Star} title="New Coins" />
        </SwiperSlide>

        <SwiperSlide className="px-5">
          <MarketBox icon={TrendingUp} title="Top Gainers" />
        </SwiperSlide>

        <SliderControls isEnd={isEnd} isBeginning={isBeginning} />
      </Swiper>
    </div>
  );
};
