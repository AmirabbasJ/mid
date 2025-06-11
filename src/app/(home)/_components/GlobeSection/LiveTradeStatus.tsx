'use client';

import { animate } from 'motion';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Title } from '../../../../design';
import { separateThousand } from '../../../../utils';

interface Props {
  defaultCount: number;
  count: number;
}

export function LiveTradeStatus({ defaultCount, count }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true });
  if (isInView)
    animate(defaultCount, count, {
      duration: 2,
      ease: 'easeInOut',
      onUpdate(latest) {
        if (ref?.current) ref!.current!.textContent = separateThousand(Math.floor(latest));
      },
    });

  return (
    <div className=" bg-transparent text-white flex flex-col md:items-start items-center justify-center gap-6">
      <div className="md:text-left text-center gap-1">
        <Title level={2} className="uppercase  text-indigo-500">
          Live trades
        </Title>
        <Title level={2} className="uppercase">
          On techhance
        </Title>
      </div>

      <div className="flex items-center gap-4 text-4xl font-bold">
        <span className="w-4 h-4 bg-white rounded-full"></span>
        <span ref={ref}>{separateThousand(defaultCount)}</span>
      </div>

      <div className="flex gap-6">
        <div className="bg-gray-900 rounded-lg px-3 py-2 text-left flex flex-col gap-2">
          <h3 className="text-teal-400 text-lg md:text-xs text-nowrap">Long Trades ↝</h3>
          <p className="text-xl md:text-sm font-semibold">1,234,876</p>
        </div>
        <div className="bg-gray-900 rounded-lg px-3 py-2 text-left flex flex-col gap-2">
          <h3 className="text-pink-400 text-lg md:text-xs text-nowrap">Short Trades ↜</h3>
          <p className="text-xl md:text-sm font-semibold">2,032,758</p>
        </div>
      </div>
    </div>
  );
}
