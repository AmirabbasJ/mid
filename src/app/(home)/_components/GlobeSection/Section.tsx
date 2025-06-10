'use client';

import { MoveDirection, type IOptions, type RecursivePartial } from '@tsparticles/engine';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { AnimatePresence, LayoutGroup, motion, useAnimationFrame, useMotionValue, useScroll, useTransform, wrap } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FadeUpText, FadeUpWords, Title } from '../../../../design';
import { Card } from './Card';
import { GlobeSection } from './GlobeSection';

function ParallaxText({ direction = 'right' }: { direction?: 'left' | 'right' }) {
  const baseX = useMotionValue(0);

  const x = useTransform(baseX, v => `${wrap(-20, -45, v)}%`);

  useAnimationFrame((t, delta) => {
    baseX.set(baseX.get() + 5 * (delta / 1000) * (direction === 'right' ? 1 : -1));
  });

  return (
    <div className="overflow-hidden w-full flex-nowrap flex">
      <motion.div className="flex gap-5 " style={{ x }}>
        {Array(2)
          .fill(null)
          .map(() => (
            <>
              <Card />
              <Card />
              <Card />
              <Card />
            </>
          ))}
      </motion.div>
    </div>
  );
}

export const Section = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    offset: ['start start', 'end 70%'],
    target: ref,
  });
  const globeY = useTransform(scrollYProgress, [0, 1], ['-100px', `${800 - 100 - 300}px`]);
  const globeX = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const slideShowY = useTransform(scrollYProgress, [0.3, 0.7], ['0', '-200px']);
  const slideShowOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const skyOpacity = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);
  const skyY = useTransform(scrollYProgress, [0.3, 0.7], ['-200px', '0px']);

  const [init, setInit] = useState(false);

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
          height: '450px',
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
            value: 2000,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: { min: 0.1, max: 1 },
          },
        },
        detectRetina: true,
      }) satisfies RecursivePartial<IOptions>,
    [],
  );

  return (
    <div className=" flex flex-col gap-[100px] items-center relative">
      {/* <Halo height={800} width={200}></Halo> */}
      <div className=" flex flex-col gap-5 items-center">
        <div className="text-center">
          <FadeUpText>
            <Title level={2} className="uppercase  text-indigo-500">
              Trusted by trades
            </Title>
          </FadeUpText>
          <FadeUpText>
            <Title level={2} className="uppercase">
              Proven by results
            </Title>
          </FadeUpText>
        </div>
        <FadeUpWords
          containerClassName="justify-center max-w-[470px]"
          size="sm"
          muted
          text="Join thousands of traders who trust Technance—backed by impressive stats and real user testimonials"
        />
      </div>
      <LayoutGroup>
        <AnimatePresence>
          <motion.div ref={ref} className="h-[calc(800px)] pt-[100px] overflow-hidden flex flex-col relative w-full">
            <div className="absolute w-full  flex justify-center z-10">
              <motion.div style={{ top: globeY, left: globeX }} className="relative">
                <GlobeSection scrollProgress={scrollYProgress} />
              </motion.div>
            </div>
            <motion.div style={{ opacity: slideShowOpacity, y: slideShowY }} className=" flex flex-col gap-5">
              <ParallaxText />
              <ParallaxText direction="left" />
            </motion.div>
            <motion.div
              style={{
                bottom: skyY,
                opacity: skyOpacity,
              }}
              className="absolute left-0  w-full"
            >
              {init ? <Particles id="tsparticles" className="w-full" options={options} /> : null}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </LayoutGroup>
    </div>
  );
};
