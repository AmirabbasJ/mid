'use client';

import { createContext, useEffect, useState } from 'react';

interface IsMobileContextType {
  isMobile: boolean;
}

export const IsMobileContext = createContext<IsMobileContextType>({ isMobile: false });

export const IsMobileProvider = ({ children }: { children: React.ReactNode }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const setter = () => {
      setIsMobile(window.innerWidth < 768);
    };

    setter();
    window.addEventListener('resize', setter);
    return () => window.removeEventListener('resize', setter);
  }, []);

  return <IsMobileContext.Provider value={{ isMobile }}>{children}</IsMobileContext.Provider>;
};
