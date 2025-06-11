import { Btc, Eth, Ton } from '@/assets/icons';
import { TradeType, type Trade } from '@/domain';
import { getRandomLatLong, randomItemIndex } from '@/utils';
import { useEffect, useState } from 'react';

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
  return {
    ...item,
    cost: randomCost,
    id: ++count,
    type: index % 2 === 0 ? TradeType.long : TradeType.short,
    location: getRandomLatLong(),
  };
};

interface Config {
  enabled?: boolean;
}

export const useTrades = ({ enabled = true }: Config = {}) => {
  const [trades, setTrades] = useState<Trade[]>([
    genRandomTrade(),
    genRandomTrade(),
    genRandomTrade(),
  ]);

  useEffect(() => {
    const id = setInterval(() => {
      setTrades(cs => [genRandomTrade(), ...cs.slice(0, 2)]);
    }, 5000);
    return () => {
      clearInterval(id);
    };
  }, [enabled]);

  return { trades };
};
