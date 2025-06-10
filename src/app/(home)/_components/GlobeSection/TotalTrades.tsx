'use client';

import { animate } from 'motion';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Title } from '../../../../design';
import { separateThousand } from '../../../../utils';

interface Props {
  from: number;
  to: number;
}

export function TotalTrades({ from, to }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true });
  if (isInView)
    animate(from, to, {
      duration: 2,
      ease: 'easeInOut',
      onUpdate(latest) {
        if (ref?.current) ref!.current!.textContent = separateThousand(Math.floor(latest));
      },
    });

  return (
    <div className=" bg-transparent text-white flex flex-col md:items-start items-center justify-center gap-6">
      <div className="md:text-left text-center space-y-1">
        <Title level={2} className="uppercase  text-indigo-500">
          Live trades
        </Title>
        <Title level={2} className="uppercase">
          On techhance
        </Title>
      </div>

      <div className="flex items-center space-x-4 text-4xl font-bold">
        <span className="w-4 h-4 bg-white rounded-full animate-pulse"></span>
        <span ref={ref}>{separateThousand(from)}</span>
      </div>

      <div className="flex space-x-6">
        <div className="bg-gray-900 rounded-lg px-6 py-4 text-left">
          <h3 className="text-teal-400 text-sm">Long Trades ↝</h3>
          <p className="text-lg font-semibold">1,234,876</p>
        </div>
        <div className="bg-gray-900 rounded-lg px-6 py-4 text-left">
          <h3 className="text-pink-400 text-sm">Short Trades ↜</h3>
          <p className="text-lg font-semibold">2,032,758</p>
        </div>
      </div>
    </div>
  );
}
