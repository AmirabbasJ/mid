'use client';

import { Flame, Star, TrendingUp } from '@/assets/icons';
import { MarketBox } from '../../MarketBox';

export const MarketListDesktop = () => {
  return (
    <div className=" w-full flex justify-center px-6">
      <div className="max-w-[1000px] w-full justify-center flex gap-5">
        <MarketBox icon={Flame} title="Hot List" />
        <MarketBox icon={Star} title="New Coins" />
        <MarketBox icon={TrendingUp} title="Top Gainers" />
      </div>
    </div>
  );
};
