'use client';

import { motion, useInView, type Variants } from 'motion/react';
import { useRef } from 'react';

const variant: Variants = {
  show: { opacity: 1, y: 0, transition: { type: 'spring' } },
  hidden: { opacity: 0, y: 18 },
};

interface Props {
  children: React.ReactNode;
  className?: string;
}

export function FadeUpText({ children, className = '' }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? 'show' : ''} variants={variant} className={className}>
      {children}
    </motion.div>
  );
}
