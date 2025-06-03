import { type LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Badge } from '../libs/design/Badge';

interface Props {
  title: string;
  icon: LucideIcon;
}

export function MarketBox({ icon: Icon, title }: Props) {
  const [coins, setCoins] = useState([
    {
      symbol: 'BTC',
      pair: 'BTCUSDT',
      price: '109,669.24',
      change: '+0.18%',
      changePositive: true,
      icon: '/icons/btc.png',
    },
    {
      symbol: 'ETH',
      pair: 'ETHUSDT',
      price: '2,644.28',
      change: '+0.50%',
      changePositive: true,
      icon: '/icons/eth.png',
    },
    {
      symbol: 'TON',
      pair: 'TONUSDT',
      price: '2.98',
      change: '-0.56%',
      changePositive: false,
      icon: '/icons/ton.png',
    },
    {
      symbol: 'DOGE',
      pair: 'DOGEUSDT',
      price: '0.23',
      change: '+0.35%',
      changePositive: true,
      icon: '/icons/doge.png',
    },
    {
      symbol: 'SOL',
      pair: 'SOLUSDT',
      price: '175.30',
      change: '+0.87%',
      changePositive: true,
      icon: '/icons/sol.png',
    },
  ]);
  return (
    <div
      onClick={() => {
        setCoins(p => [...p.slice(1), p[0]]);
      }}
      className="bg-[#12131C] w-full rounded-2xl flex flex-col gap-4 items-start p-4 text-sm shadow-lg border border-white/15"
    >
      <Badge icon={Icon}>{title}</Badge>
      <ul className="space-y-4 w-full">
        {coins.map(coin => (
          <motion.li
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
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
              <div className={`text-xs ${coin.changePositive ? 'text-green-600' : 'text-red-600'}`}>{coin.change}</div>
            </div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
