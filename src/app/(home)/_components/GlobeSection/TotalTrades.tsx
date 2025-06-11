'use client';

import { separateThousand } from '@/utils';
import { animate } from 'motion';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';

interface Props {
  defaultValue: number;
  count: number;
}

export const TotalTrades = ({ defaultValue, count }: Props) => {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true });
  const [played, setPlayed] = useState(false);

  if (isInView && !played)
    animate(defaultValue, count, {
      duration: 2,
      ease: 'easeInOut',
      onUpdate(latest) {
        if (ref?.current)
          ref!.current!.textContent = separateThousand(Math.floor(latest));
      },
      onComplete() {
        setPlayed(true);
      },
    });

  return (
    <div className="relative text-center gap-2 z-10 flex flex-col items-center">
      <h2
        ref={ref}
        className="text-5xl font-extrabold text-white drop-shadow-[0_0_25px_rgba(92,103,242,0.6)]"
      >
        {separateThousand(defaultValue)}
      </h2>
      <div className="gap-6 flex flex-col items-center">
        <p className="text-sm text-gray-300 tracking-wide uppercase">
          number of trades
        </p>
        <button className="uppercase cursor-pointer px-4 py-2 rounded-full bg-[#5c67f2] text-white font-medium hover:bg-[#6f78f5] transition">
          see live
        </button>
      </div>
    </div>
  );
};
