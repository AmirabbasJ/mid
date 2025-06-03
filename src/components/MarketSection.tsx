import { type EmblaCarouselType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Flame, Star, TrendingUp } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { cn } from '../utils/cn';
import './embla.css';
import { MarketBox } from './MarketBox';

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (emblaApi: EmblaCarouselType | undefined): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

type UseDotButtonType = {
  selectedIndex: number;
  scrollSnaps: number[];
  onDotButtonClick: (index: number) => void;
};

export const useDotButton = (emblaApi: EmblaCarouselType | undefined): UseDotButtonType => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return {
    selectedIndex,
    scrollSnaps,
    onDotButtonClick,
  };
};

export const MarketSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);

  return (
    <div className="flex flex-col gap-4">
      <div className="px-6 relative">
        <div className="embla">
          <div className="embla__viewport" ref={emblaRef}>
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
            'embla__prev bg-gray-500/90 p-1.5 rounded-full absolute top-[50%] translate-y-[-50%] left-5 translate-x-[-50%] z-10',
            !prevBtnDisabled ? '' : 'opacity-50',
          )}
        >
          <ChevronLeft className="w-4 h-4 text-white"></ChevronLeft>
        </button>
        <button
          onClick={() => {
            onNextButtonClick();
          }}
          className={cn(
            'embla__next bg-gray-500/90 p-1.5 rounded-full absolute top-[50%] translate-y-[-50%] right-5 translate-x-[50%] z-10',
            !nextBtnDisabled ? '' : 'opacity-50',
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
            className={cn('w-2 h-2 rounded-full ', index === selectedIndex ? 'bg-indigo-500' : 'bg-gray-300')}
          />
        ))}
      </div>
    </div>
  );
};
