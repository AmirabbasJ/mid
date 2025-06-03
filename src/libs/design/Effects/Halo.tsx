'use client';

import { motion, useInView, type Variants } from 'motion/react';
import { useRef } from 'react';
import { cn } from '../../../utils/cn';

interface HaloProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
  color?: string;
}

const variants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 0.3,
    scale: [1, 1.05, 1],
  },
};
export const Halo = ({ size = 200, color = 'white', className }: HaloProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="initial"
      animate={isInView ? 'animate' : ''}
      transition={{
        duration: 2,
        repeat: 0,
        ease: 'easeOut',
      }}
      className={cn('rounded-full absolute blur-3xl', className)}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
      }}
    />
  );
};
