import type { LucideIcon } from '@/assets/icons';

interface Props {
  children: React.ReactNode;
  icon: LucideIcon;
}
export const Badge = ({ children, icon: Icon }: Props) => {
  return (
    <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-[#0B0C14] text-indigo-300">
      <Icon className="w-3.5 h-3.5" />
      {children}
    </span>
  );
};
