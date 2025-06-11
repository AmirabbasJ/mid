import { cn } from '@/utils';
import React from 'react';

const sizeMap = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
};

export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: keyof typeof sizeMap;
  muted?: boolean;
}

export const Text = ({ size = 'base', muted = false, className, children, ...props }: TextProps) => {
  return (
    <p className={cn(sizeMap[size], muted ? 'text-gray-500' : 'text-gray-100', 'leading-relaxed', className)} {...props}>
      {children}
    </p>
  );
};
