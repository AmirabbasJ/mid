import type { Location } from '@/domain';
import { TradeType, type Trade } from '@/domain';
import { useIsMobile } from '@/hooks';
import createGlobe, { type COBEOptions } from 'cobe';
import {
  motion,
  MotionValue,
  useInView,
  useMotionValueEvent,
  useTransform,
} from 'motion/react';
import { useEffect, useRef, useState } from 'react';

const locationToAngles = ([lat, long]: [number, number]): [number, number] => {
  return [
    Math.PI - ((long * Math.PI) / 180 - Math.PI / 2),
    ((lat - 30) * Math.PI) / 180,
  ];
};

interface Props {
  scrollProgress: MotionValue<number>;
  trades: Trade[];
  selectedLocation?: Location | null;
}

let phi = 0;
let theta = 0;
export const Globe = ({ scrollProgress, trades, selectedLocation }: Props) => {
  const isMobile = useIsMobile();
  const tradesRef = useRef(trades);
  const focusRef = useRef<[number, number] | null>(null);

  const [windowWidth, setWindowWidth] = useState(600);
  const [animationEnded, setAnimationEnded] = useState(false);
  useEffect(() => {
    const widthSetter = () => {
      setWindowWidth(window.innerWidth);
    };
    widthSetter();
    window.addEventListener('resize', widthSetter);
    return () => window.removeEventListener('resize', widthSetter);
  }, []);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isInView = useInView(canvasRef, { once: true });
  const firstDropShadow = useTransform(
    scrollProgress,
    [0.3, 1],
    ['#000', '#91A0FF'],
  );
  const secondDropShadow = useTransform(
    scrollProgress,
    [0.3, 1],
    ['#000', '#91A0FF40'],
  );

  const scale = useTransform(scrollProgress, [0, 0.6, 1], [1, 1.25, 1.75]);
  useMotionValueEvent(scrollProgress, 'change', v => {
    setAnimationEnded(v === 1);
  });

  const filter = useTransform(() => {
    return `drop-shadow(0px 0px 1rem ${firstDropShadow.get()}) drop-shadow(0px 0px 1rem ${secondDropShadow.get()})`;
  });

  const globeSize = windowWidth >= 600 ? 600 * 2 : (windowWidth - 10) * 2;

  useEffect(() => {
    tradesRef.current = animationEnded ? trades : [];
  }, [trades, animationEnded]);

  useEffect(() => {
    focusRef.current =
      animationEnded && selectedLocation
        ? locationToAngles(selectedLocation!)
        : null;
  }, [selectedLocation, animationEnded]);

  useEffect(() => {
    const setting: COBEOptions = {
      devicePixelRatio: 2,
      width: globeSize,
      height: globeSize,
      phi: phi,
      theta: theta,
      dark: 0.6,
      diffuse: 1,
      mapSamples: 55000,
      opacity: 1,
      mapBrightness: 3.4,
      mapBaseBrightness: 0,
      baseColor: [94 / 255, 110 / 255, 255 / 255],
      markerColor: [0.1, 0.8, 1],
      glowColor: [145 / 255, 160 / 255, 255 / 255],
      markers: [],
      onRender: state => {
        state['phi'] = phi;
        state['theta'] = theta;
        if (focusRef.current) {
          const [focusPhi, focusTheta] = focusRef.current;
          const distPositive = (focusPhi - phi + Math.PI * 2) % (Math.PI * 2);
          const distNegative = (phi - focusPhi + Math.PI * 2) % (Math.PI * 2);

          if (distPositive < distNegative) {
            phi += distPositive * 0.08;
          } else {
            phi -= distNegative * 0.08;
          }

          theta = theta * 0.92 + focusTheta * 0.08;
          const dist =
            distPositive < distNegative ? distPositive : distNegative;
          const floored = Math.abs(Math.floor(dist * 100));

          if (floored <= 12) focusRef.current = null;
        }
        state['markers'] = tradesRef.current.map(t => ({
          location: t.location,
          size: 0.05,
          color:
            t.type === TradeType.long
              ? [1 / 255, 153 / 255, 103 / 255]
              : [198 / 255, 0 / 255, 54 / 255],
        }));
        phi += 0.008;
      },
    };
    const globe = createGlobe(canvasRef.current!, setting);
    return () => {
      globe.destroy();
    };
  }, [globeSize, animationEnded]);

  return (
    <>
      <motion.canvas
        initial={{ opacity: 0, scale: 0.7 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        ref={canvasRef}
        style={{
          scale: isMobile ? scale : 1,
          width: globeSize / 2,
          height: globeSize / 2,
          maxWidth: '100%',
          aspectRatio: 1,
          filter: filter,
        }}
      />
    </>
  );
};
