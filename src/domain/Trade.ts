import type { FC, SVGProps } from 'react';
import type { Location } from './Location';

export const TradeType = {
  long: 'long',
  short: 'short',
} as const;

export type TradeType = (typeof TradeType)[keyof typeof TradeType];

export interface Trade {
  id: number;
  symbol: string;
  icon: FC<SVGProps<SVGElement>>;
  cost: number;
  type: TradeType;
  location: Location;
}
