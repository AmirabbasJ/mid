'use client';

import { motion, useInView, type Variants } from 'motion/react';
import { useRef } from 'react';
import { cn } from '../../../utils/cn';
import { Text, type TextProps } from '../Typography/Text';

const pullupVariant: Variants = {
  initial: { y: -20, opacity: 0, filter: 'blur(5px)' },
  animate: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.05,
    },
  }),
};

interface Props extends TextProps {
  text: string;
  containerClassName: string;
}

export function FadeUpWords({ text, containerClassName: className, ...textProps }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const splittedText = text.split(' ');

  return (
    <div className={cn('flex flex-wrap', className)}>
      {splittedText.map((current, i) => {
        const output = current == '' ? <span>&nbsp;</span> : current;

        return (
          <motion.div
            key={i}
            ref={ref}
            variants={pullupVariant}
            initial="initial"
            animate={isInView ? 'animate' : ''}
            custom={i}
            className={cn('tracking-tighter pr-1')}
          >
            <Text {...textProps}>{output}</Text>
          </motion.div>
        );
      })}
    </div>
  );
}
