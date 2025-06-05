'use client';

import { type LucideIcon } from '@/assets/icons';
import { usePrices } from '@/hooks';
import { Badge } from '@/libs/design';
import { AnimatePresence, LayoutGroup, useInView } from 'motion/react';
import { useRef } from 'react';
import { LoadingMarketItems } from './LoadingMarketItems';
import { MarketItem } from './MarketItem';

interface Props {
  title: string;
  icon: LucideIcon;
}

const itemCount = 5;
export const MarketBox = ({ icon: Icon, title }: Props) => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const { coins: allCoins, loading } = usePrices({ enabled: isInView });
  const coins = allCoins?.slice?.(0, itemCount);

  return (
    <div
      ref={ref}
      className=" relative w-full inset-shadow-[0px_5px_20px_-23px_#fff] bg-[#12131C] rounded-2xl flex flex-col gap-4 items-start py-4 text-sm shadow-lg border border-white/10"
    >
      <div className="px-4">
        <Badge icon={Icon}>{title}</Badge>
      </div>
      <ul className="h-[260px] overflow-hidden w-full ">
        <LayoutGroup>
          <AnimatePresence initial={false}>
            {loading ? <LoadingMarketItems count={itemCount} /> : coins.map(coin => <MarketItem key={coin.symbol} coin={coin} />)}
          </AnimatePresence>
        </LayoutGroup>
      </ul>
    </div>
  );
};
