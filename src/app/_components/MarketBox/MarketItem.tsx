import { Settings2 } from '@/assets/icons';
import type { Coin } from '@/hooks';
import { SubNumber } from '@/libs/design';
import { AnimatePresence, motion, type Variants } from 'motion/react';

interface Props {
  coin: Coin;
}

const settingVariants: Variants = {
  default: { scale: 0 },
  hover: { scale: 1 },
};

export const MarketItem = ({ coin: { icon: Icon, ...coin } }: Props) => {
  return (
    <motion.div initial="default" whileHover="hover" key={coin.symbol} className="flex  items-center">
      <motion.li
        layout
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        transition={{ type: 'spring', stiffness: 500, damping: 30, duration: 0.2 }}
        className="peer cursor-pointer hover:bg-black/30 transition-colors py-2 px-4 flex items-center justify-between w-full"
      >
        <div className="flex items-center gap-3">
          <Icon className="w-6 h-6" />
          <div className="text-gray-200">
            {coin.symbol} <span className="text-xs text-gray-500">({coin.pair})</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-gray-400">
            <SubNumber value={coin.price}></SubNumber>
          </div>
          <div className={`text-xs ${coin.change >= 0 ? 'text-emerald-600' : 'text-rose-700'}`}>
            {coin.change > 0 ? `+${coin.change}` : coin.change}
          </div>
        </div>
      </motion.li>
      <AnimatePresence initial>
        <motion.button
          variants={settingVariants}
          transition={{ delay: 0.1 }}
          className="hover:bg-indigo-500 cursor-pointer right-0 translate-x-[50%]  absolute bg-indigo-400 p-0.5 rounded-sm"
        >
          <div className="border-1 border-white p-0.5 rounded-full">
            <Settings2 className="w-3 h-3 text-white" />
          </div>
        </motion.button>
      </AnimatePresence>
    </motion.div>
  );
};
