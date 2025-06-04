'use client';

import { ChevronLeft, ChevronRight, Flame, Star, TrendingUp } from 'lucide-react';
import { useSlider } from '../../../hooks/slider/useSlider';
import { cn } from '../../../utils/cn';
import { MarketBox } from '../MarketBox';

export const MarketSectionMobile = () => {
  const {
    sliderRef,
    onPrevButtonClick,
    prevBtnDisabled,
    onNextButtonClick,
    nextBtnDisabled,
    scrollSnaps,
    onDotButtonClick,
    selectedIndex,
  } = useSlider();

  return (
    <div className="flex flex-col gap-4">
      <div className="px-6 relative">
        <div className="embla">
          <div className="embla__viewport" ref={sliderRef}>
            <div className="embla__container">
              <div className="embla__slide">
                <MarketBox icon={Flame} title="Hot List" />
              </div>
              <div className="embla__slide">
                <MarketBox icon={Star} title="New Coins" />
              </div>
              <div className="embla__slide">
                <MarketBox icon={TrendingUp} title="Top Gainers" />
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            onPrevButtonClick();
          }}
          className={cn(
            'embla__prev cursor-pointer bg-gray-500/90 p-1.5 rounded-full absolute top-[50%] translate-y-[-50%] left-6 ml-[11px] translate-x-[-50%] z-10',
            { 'opacity-50': prevBtnDisabled },
          )}
        >
          <ChevronLeft className="w-4 h-4 text-white"></ChevronLeft>
        </button>
        <button
          onClick={() => {
            onNextButtonClick();
          }}
          className={cn(
            'embla__next cursor-pointer bg-gray-500/90 p-1.5 rounded-full absolute top-[50%] translate-y-[-50%] right-6 mr-[11px] translate-x-[50%] z-10',
            { 'opacity-50': nextBtnDisabled },
          )}
        >
          <ChevronRight className="w-4 h-4 text-white"></ChevronRight>
        </button>
      </div>
      <div className="embla__dots flex gap-2 justify-center">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={cn('cursor-pointer w-2 h-2 rounded-full ', index === selectedIndex ? 'bg-indigo-500' : 'bg-gray-300')}
          />
        ))}
      </div>
    </div>
  );
};
