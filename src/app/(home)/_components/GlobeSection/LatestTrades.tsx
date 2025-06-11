import { TrendingUp } from 'lucide-react';
import { AnimatePresence, LayoutGroup, motion } from 'motion/react';
import { Text } from '../../../../design';
import { TradeType, type Trade as TradeT } from '../../../../domain';
import { useTrades } from '../../../../hooks/useTrades';
import { cn } from '../../../../utils';

interface Props {
  trade: TradeT;
  className?: string;
}
const Trade = ({ trade, className }: Props) => {
  const Icon = trade.icon;
  return (
    <div
      className={cn(
        'w-full max-w-[400px] md:max-w-[240px] bg-white px-5 md:px-3 py-3 md:py-1 flex gap-3 md:gap-2 rounded-full justify-between items-center',
        className,
      )}
    >
      <div className="flex gap-1 items-center">
        <Icon className="w-6 h-6" />
        <Text className=" text-black font-semibold md:font-medium text-lg  sm:text-2xl md:text-sm">
          {trade.cost} {trade.symbol}
        </Text>
      </div>
      <div className={cn('flex items-center gap-3 md:gap-1', trade.type === TradeType.long ? 'text-emerald-600' : 'text-rose-700')}>
        <Text className={'font-bold uppercase text-inherit  text-sm sm:text-lg md:text-xs'}>{trade.type} trade</Text>
        <TrendingUp className="w-7 h-7 md:w-4 md:h-4 text-inherit" />
      </div>
    </div>
  );
};
export const LatestTrades = () => {
  const { trades: allTrades } = useTrades();
  const trades = allTrades;
  return (
    <div className="flex flex-col px-5 gap-2 items-center">
      <LayoutGroup>
        <AnimatePresence mode="popLayout">
          {trades.map((trade, i) => {
            return (
              <motion.div
                layout
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1 - 0.25 * i, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  scale: 1 - 0.04 * i,
                }}
                key={trade.id}
              >
                <Trade trade={trade} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
};
