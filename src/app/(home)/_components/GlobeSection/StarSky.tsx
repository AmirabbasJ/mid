'use client';

import { type IOptions, MoveDirection, type RecursivePartial } from '@tsparticles/engine';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useEffect, useMemo, useState } from 'react';
import { useIsMobile } from '../../../../hooks';

export const StarSky = () => {
  const [init, setInit] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    initParticlesEngine(async engine => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(
    () =>
      ({
        style: {
          height: isMobile ? '800px' : '450px',
        },
        fullScreen: { enable: false, zIndex: -10 },
        background: {
          color: {
            value: 'transparent',
          },
        },
        fpsLimit: 120,
        particles: {
          color: {
            value: '#ffffff',
          },
          move: {
            direction: MoveDirection.bottom,
            enable: true,
            random: false,
            speed: 0.1,
            straight: true,
          },
          number: {
            value: isMobile ? 100 : 2000,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: isMobile ? { min: 1, max: 2 } : { min: 0.1, max: 1 },
          },
        },
        detectRetina: true,
      }) satisfies RecursivePartial<IOptions>,
    [isMobile],
  );

  return init ? <Particles id="tsparticles" className="w-full" options={options} /> : null;
};
