'use client';

import { FadeUpText, FadeUpWords, Halo, Title } from '@/design';
import type { Location } from '@/domain';
import { useIsMobile, useTrades } from '@/hooks';
import {
  AnimatePresence,
  motion,
  useInView,
  useScroll,
  useTransform,
} from 'motion/react';
import { useRef, useState } from 'react';
import { CardsMarquee } from './CardsMarquee';
import { Globe } from './Globe';
import { LatestTrades } from './LatestTrades';
import { LiveTradeStatus } from './LiveTradeStatus';
import { StarSky } from './StarSky';
import { TotalTrades } from './TotalTrades';

export const GlobeSection = () => {
  const ref = useRef(null);
  const totalTradesRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const isMobile = useIsMobile();
  const { trades: allTrades } = useTrades();

  const { scrollYProgress } = useScroll({
    offset: isMobile ? ['start 30%', 'end 100%'] : ['start start', 'end 70%'],
    target: ref,
  });

  const isTotalTradesInView = useInView(totalTradesRef, { once: true });

  const globeY = useTransform(
    scrollYProgress,
    [0, 1],
    ['-100px', !isMobile ? '350px' : '1600px'],
  );
  const globeX = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', isMobile ? '0%' : '20%'],
  );

  const slideShowY = useTransform(scrollYProgress, [0.3, 0.7], ['0', '-200px']);
  const slideShowOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const skyOpacity = useTransform(
    scrollYProgress,
    [0.3, isMobile ? 1 : 0.7],
    [0, 1],
  );
  const skyY = useTransform(
    scrollYProgress,
    [0.3, isMobile ? 1 : 0.7],
    ['-200px', '0px'],
  );

  const tradeCountOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const latestTradesOpacity = useTransform(scrollYProgress, [0.8, 1], [0, 1]);
  const latestTradesX = useTransform(scrollYProgress, [0.8, 1], [-50, 0]);

  return (
    <div className=" flex flex-col items-center relative">
      <div className=" flex flex-col gap-5 items-center relative">
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
        <Halo className="-top-8" size={200} color="white" />
      </div>
      <AnimatePresence>
        <motion.div
          ref={ref}
          className="h-[2000px] md:h-[800px] pt-[100px] overflow-hidden flex flex-col relative w-full"
        >
          <div className="absolute w-full  z-10">
            <motion.div
              style={{ top: globeY, left: globeX }}
              className=" relative flex justify-center"
            >
              <motion.div
                className="absolute flex items-center justify-center left-[50%] translate-[-50%] z-20 top-[50%] "
                initial={{ opacity: 0, scale: 0.7 }}
                animate={isTotalTradesInView ? { scale: 1 } : {}}
                style={{ opacity: tradeCountOpacity }}
                ref={totalTradesRef}
              >
                <TotalTrades defaultValue={1000} count={3_238_563} />
              </motion.div>
              <Globe
                selectedLocation={selectedLocation}
                trades={allTrades}
                scrollProgress={scrollYProgress}
              />
            </motion.div>
          </div>
          <motion.div
            style={{ opacity: slideShowOpacity, y: slideShowY }}
            className=" flex flex-col gap-5"
          >
            <CardsMarquee />
            <CardsMarquee direction="left" />
          </motion.div>
          <motion.div className="bottom-0 absolute left-0 w-full">
            <motion.div
              style={{
                bottom: skyY,
                opacity: skyOpacity,
              }}
            >
              <StarSky />
            </motion.div>
            <motion.div
              style={{
                bottom: skyY,
                opacity: skyOpacity,
              }}
              className="p-8 absolute top-0 md:top-[50%] md:translate-y-[-50%] z-20 md:left-0 left-[50%] translate-x-[-50%] md:translate-x-[0%] "
            >
              <LiveTradeStatus defaultCount={1000} count={3_238_563} />
            </motion.div>
            <motion.div
              style={{
                opacity: latestTradesOpacity,
                x: latestTradesX,
              }}
              className="absolute w-full flex justify-center z-20 bottom-0 pb-4"
            >
              <div className="relative left-auto md:left-[20%]">
                <LatestTrades
                  setSelectedLocation={setSelectedLocation}
                  trades={allTrades}
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
