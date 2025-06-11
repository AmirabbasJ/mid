import { IsMobileContext } from '@/context';
import { useContext } from 'react';

export const useIsMobile = () => {
  const ctx = useContext(IsMobileContext);
  if (ctx == null) throw new Error('IsMobileContext provider has not been set');
  return ctx.isMobile;
};
