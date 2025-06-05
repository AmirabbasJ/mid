'use client';

import { ArrowDown } from '@/assets/icons';
import { Title } from '@/design';
import { motion } from 'motion/react';

export const PageTitle = () => {
  return (
    <div className="flex w-full justify-center items-center gap-4">
      <Title className="text-center">Please scroll down</Title>
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <ArrowDown className="w-10 h-10 text-white" />
      </motion.div>
    </div>
  );
};
