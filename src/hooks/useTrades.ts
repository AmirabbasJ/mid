import { TradeType, type Trade } from '@/domain';
import { randomItemIndex } from '@/utils';
import { useEffect, useState } from 'react';
import { Btc, Eth, Ton } from '../assets/icons';

const initialTrades = [
  {
    symbol: 'BTC',
    icon: Btc,
  },
  {
    symbol: 'ETH',
    icon: Eth,
  },
  {
    symbol: 'TON',
    icon: Ton,
  },
] as const;

let count = 8;

const genRandomTrade = (): Trade => {
  const num = (Math.random() + 1).toFixed(3);
  const randomCost = parseFloat(num);
  const index = randomItemIndex(initialTrades.length);
  const item = initialTrades[index]!;
  return { ...item, cost: randomCost, id: ++count, type: index % 2 === 0 ? TradeType.long : TradeType.short };
};

interface Config {
  enabled?: boolean;
}

export const useTrades = ({ enabled = true }: Config = {}) => {
  const [trades, setTrades] = useState<Trade[]>([genRandomTrade(), genRandomTrade(), genRandomTrade()]);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (enabled) {
      console.log('started updating');
      const id = setInterval(() => {
        setTrades(cs => [genRandomTrade(), ...cs.slice(0, 2)]);
      }, 5000);
      return () => {
        clearInterval(id);
      };
    }
    // if (loading && enabled) {
    //   setTimeout(() => {
    //     setLoading(false);
    //     setTrades(initialTrades);
    //   }, 500);
    // }
    console.log('updating disabled');

    return;
  }, [enabled]);

  return { trades };
};
