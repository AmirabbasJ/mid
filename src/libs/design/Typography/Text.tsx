import React from 'react';
import { cn } from '../../../utils/cn';

interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  size?: 'sm' | 'base' | 'lg';
  muted?: boolean;
}

const sizeMap = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
};

export const Text = ({ size = 'base', muted = false, className, children, ...props }: TextProps) => {
  return (
    <p className={cn(sizeMap[size], muted ? 'text-gray-500' : 'text-gray-100', 'leading-relaxed', className)} {...props}>
      {children}
    </p>
  );
};
