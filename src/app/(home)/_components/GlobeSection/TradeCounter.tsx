'use client';

import { animate } from 'motion';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { separateThousand } from '../../../../utils';

interface Props {
  from: number;
  to: number;
}

export const TradeCounter = ({ from, to }: Props) => {
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
    <div>
      <div className="absolute w-full rounded-full bg-[#5c67f2]/20 blur-3xl shadow-2xl" />
      <div className="relative text-center z-10">
        <h2 ref={ref} className="text-5xl font-extrabold text-white drop-shadow-[0_0_25px_rgba(92,103,242,0.6)]">
          {separateThousand(from)}
        </h2>
        <p className="text-sm text-gray-300 mt-2 tracking-wide">NUMBER OF TRADES</p>
        <button className="mt-6 px-4 py-2 rounded-full bg-[#5c67f2] text-white font-medium hover:bg-[#6f78f5] transition">SEE LIVE</button>
      </div>
    </div>
  );
};
