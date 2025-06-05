import { MarketSectionDesktop } from './MarketSectionDesktop';
import { MarketSectionMobile } from './MarketSectionMobile';

export const MarketSection = () => {
  return (
    <>
      <div className="block md:hidden">
        <MarketSectionMobile />
      </div>
      <div className="hidden md:block">
        <MarketSectionDesktop />
      </div>
    </>
  );
};
