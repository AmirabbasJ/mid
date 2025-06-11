import { motion, useAnimationFrame, useMotionValue, useTransform, wrap } from 'motion/react';
import { Fragment } from 'react';
import { Card } from './Card';

interface Props {
  direction?: 'left' | 'right';
}

export const CardsMarquee = ({ direction = 'right' }: Props) => {
  const baseX = useMotionValue(0);

  const x = useTransform(baseX, v => `${wrap(-20, -45, v)}%`);

  useAnimationFrame((t, delta) => {
    baseX.set(baseX.get() + 5 * (delta / 1000) * (direction === 'right' ? 1 : -1));
  });

  return (
    <div className="overflow-hidden w-full flex-nowrap flex">
      <motion.div className="flex gap-5 " style={{ x }}>
        {Array(2)
          .fill(null)
          .map((_, i) => (
            <Fragment key={i}>
              <Card />
              <Card />
              <Card />
              <Card />
            </Fragment>
          ))}
      </motion.div>
    </div>
  );
};
