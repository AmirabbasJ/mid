'use client';

import { type LucideIcon } from 'lucide-react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { usePrices } from '../../hooks/usePrices';
import { Badge } from '../../libs/design/Badge';

interface Props {
  title: string;
  icon: LucideIcon;
}

export function MarketBox({ icon: Icon, title }: Props) {
  const allCoins = usePrices();
  const coins = allCoins.slice(0, 5);
  return (
    <div className="overflow-hidden w-full inset-shadow-[0px_5px_20px_-23px_#fff] bg-[#12131C] rounded-2xl flex flex-col gap-4 items-start p-4 text-sm shadow-lg border border-white/15">
      <Badge icon={Icon}>{title}</Badge>
      <ul className="h-[244px] space-y-4 w-full">
        <LayoutGroup>
          <AnimatePresence initial={false}>
            {coins.map(coin => (
              <motion.li
                layout
                initial={{
                  opacity: 0,
                  y: 20,
                  scale: 0.98,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                transition={{ type: 'spring', stiffness: 500, damping: 30, duration: 0.2 }}
                className="flex items-center justify-between w-full"
                key={coin.symbol}
              >
                <div className="flex items-center gap-3">
                  <img src={coin.icon} alt={coin.symbol} className="w-6 h-6" />
                  <div className="text-gray-200">
                    {coin.symbol} <span className="text-xs text-gray-500">({coin.pair})</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-gray-400">{coin.price}</div>
                  <div className={`text-xs ${coin.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>{coin.change}</div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </LayoutGroup>
      </ul>
    </div>
  );
}
