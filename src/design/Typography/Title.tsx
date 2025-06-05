import { cn } from '@/utils';

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const sizeMap = {
  1: 'text-4xl font-bold',
  2: 'text-3xl font-semibold',
  3: 'text-2xl font-semibold',
  4: 'text-xl font-medium',
  5: 'text-lg font-medium',
  6: 'text-base font-normal',
};

export const Title = ({ level = 1, className, children, ...props }: TitleProps) => {
  const Tag = `h${level}` as const;

  return (
    <Tag className={cn(sizeMap[level], 'text-white ', className)} {...props}>
      {children}
    </Tag>
  );
};
