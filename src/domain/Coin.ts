import type { FC, SVGProps } from 'react';

export interface Coin {
  symbol: string;
  pair: string;
  price: number;
  change: number;
  // NOTE: this should be a url if it were to come from server
  icon: FC<SVGProps<SVGElement>>;
}
