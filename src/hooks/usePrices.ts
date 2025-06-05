import { randomItemIndex, toSorted } from '@/utils';
import { useEffect, useState, type FC, type SVGProps } from 'react';
import { Btc, Doge, Eth, Popcat, Shiba, Tether, Ton } from '../assets/icons';

export interface Coin {
  symbol: string;
  pair: string;
  price: number;
  change: number;
  icon: FC<SVGProps<SVGElement>>;
}
const initialCoins: Coin[] = [
  {
    symbol: 'BTC',
    pair: 'BTCUSDT',
    price: 109669.24,
    change: 0.018,
    icon: Btc,
  },
  {
    symbol: 'ETH',
    pair: 'ETHUSDT',
    price: 2644.28,
    change: 0.05,
    icon: Eth,
  },
  {
    symbol: 'TON',
    pair: 'TONUSDT',
    price: 2.98,
    change: 0.056,
    icon: Ton,
  },
  {
    symbol: 'DOGE',
    pair: 'DOGEUSDT',
    price: 0.23,
    change: 0.035,
    icon: Doge,
  },
  {
    symbol: 'POPCAT',
    pair: 'POPCATUSDT',
    price: 175.3,
    change: 0.087,
    icon: Popcat,
  },
  {
    symbol: 'SHB',
    pair: 'SHIBUSD',
    price: 235.3,
    change: 1.67,
    icon: Shiba,
  },
  {
    symbol: 'USDT',
    pair: 'USDT',
    price: 541.98,
    change: 3.51,
    icon: Tether,
  },
];

const genRandomPrice = (price: number) => {
  const change = (Math.random() - 0.5) * 0.1;
  return +(price * (1 + change)).toFixed(2);
};

interface Config {
  enabled?: boolean;
}

export const usePrices = ({ enabled = true }: Config = {}) => {
  const [coins, setCoins] = useState(initialCoins);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (enabled && !loading) {
      console.log('started updating');
      const id = setInterval(() => {
        setCoins(cs => {
          const index = randomItemIndex(cs.length);
          const item = cs[index]!;
          const newPrice = genRandomPrice(item.price);
          const newCoins = cs.map((c, i) =>
            i === index ? { ...item, price: newPrice, change: Number.parseFloat((newPrice - item.price).toFixed(2)) } : c,
          );
          return toSorted(newCoins, (a, b) => b.change - a.change);
        });
      }, 5000);
      return () => {
        clearInterval(id);
      };
    }
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    console.log('updating disabled');

    return;
  }, [enabled, loading, setLoading]);

  return { coins, loading };
};
