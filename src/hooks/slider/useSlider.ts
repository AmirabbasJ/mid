import useEmblaCarousel from 'embla-carousel-react';
import { useDotButton } from './useDotButton';
import { usePrevNextButtons } from './usePrevNextButtons';

export const useSlider = () => {
  const [sliderRef, sliderApi] = useEmblaCarousel();
  const navigation = usePrevNextButtons(sliderApi);
  const pagination = useDotButton(sliderApi);

  return {
    sliderRef,
    sliderApi,
    ...navigation,
    ...pagination,
  };
};
