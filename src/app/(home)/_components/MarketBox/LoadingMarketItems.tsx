import { motion } from 'motion/react';

interface Props {
  count: number;
}
export const LoadingMarketItems = ({ count }: Props) => {
  return Array(count)
    .fill(null)
    .map((_, i) => (
      <motion.div exit={{ opacity: 0, transition: { duration: 0.2 } }} key={i} className="flex items-center">
        <li className="animate-pulse cursor-pointer hover:bg-black/30 transition-colors py-2 px-4 flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 bg-white/15 rounded-full" />
            <div className="w-20 h-4 bg-white/15 rounded-full " />
          </div>
          <div className="text-right flex flex-col items-end gap-2">
            <div className="h-4 w-16 bg-white/15 rounded-full" />
            <div className="h-3 w-10 bg-white/15 rounded-full" />
          </div>
        </li>
      </motion.div>
    ));
};
