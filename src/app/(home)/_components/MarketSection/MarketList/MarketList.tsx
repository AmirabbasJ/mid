import { MarketListDesktop } from './MarketListDesktop';
import { MarketListMobile } from './MarketListMobile';

export const MarketList = () => {
  return (
    <>
      <div className="block md:hidden">
        <MarketListMobile />
      </div>
      <div className="hidden md:block">
        <MarketListDesktop />
      </div>
    </>
  );
};
