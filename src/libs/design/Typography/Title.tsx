import React from 'react';
import { cn } from '../../../utils/cn';

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const sizeMap = {
  1: 'text-4xl',
  2: 'text-3xl',
  3: 'text-2xl',
  4: 'text-xl',
  5: 'text-lg',
  6: 'text-base',
};

export const Title = ({ level = 1, className, children, ...props }: TitleProps) => {
  const Tag = `h${level}` as const;

  return (
    <Tag className={cn(sizeMap[level], 'font-semibold text-white tracking-tight', className)} {...props}>
      {children}
    </Tag>
  );
};
