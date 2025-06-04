import { useEffect, useState } from 'react';
import { randomItemIndex } from '../utils/randomItemIndex';
import { toSorted } from '../utils/toSorted';

export interface Coin {
  symbol: string;
  pair: string;
  price: number;
  change: number;
  icon: string;
}
const initialCoins: Coin[] = [
  {
    symbol: 'BTC',
    pair: 'BTCUSDT',
    price: 109669.24,
    change: 0.018,
    icon: '/icons/btc.svg',
  },
  {
    symbol: 'ETH',
    pair: 'ETHUSDT',
    price: 2644.28,
    change: 0.05,
    icon: '/icons/eth.svg',
  },
  {
    symbol: 'TON',
    pair: 'TONUSDT',
    price: 2.98,
    change: 0.056,
    icon: '/icons/ton.svg',
  },
  {
    symbol: 'DOGE',
    pair: 'DOGEUSDT',
    price: 0.23,
    change: 0.035,
    icon: '/icons/doge.svg',
  },
  {
    symbol: 'SOL',
    pair: 'SOLUSDT',
    price: 175.3,
    change: 0.087,
    icon: '/icons/solana.svg',
  },
  {
    symbol: 'SHB',
    pair: 'SHIBUSD',
    price: 235.3,
    change: 1.67,
    icon: '/icons/shiba.svg',
  },
  {
    symbol: 'USDT',
    pair: 'USDT',
    price: 541.98,
    change: 3.51,
    icon: '/icons/tether.svg',
  },
];

function genRandomPrice(price: number) {
  const change = (Math.random() - 0.5) * 0.1;
  return +(price * (1 + change)).toFixed(2);
}

export const usePrices = () => {
  const [coins, setCoins] = useState(initialCoins);

  useEffect(() => {
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
    }, 2000);
    return () => {
      clearInterval(id);
    };
  }, []);

  return coins;
};
