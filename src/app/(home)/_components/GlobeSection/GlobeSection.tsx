'use client';

import createGlobe, { type COBEOptions } from 'cobe';
import { motion, MotionValue, useInView, useTransform } from 'motion/react';
import { useEffect, useRef } from 'react';

interface Props {
  scrollProgress: MotionValue<number>;
  isMobile?: boolean;
}

export const GlobeSection = ({ scrollProgress, isMobile }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isInView = useInView(canvasRef, { once: true });
  const firstDropShadow = useTransform(scrollProgress, [0.3, 1], ['#000', '#91A0FF']);
  const secondDropShadow = useTransform(scrollProgress, [0.3, 1], ['#000', '#91A0FF60']);
  const scale = useTransform(scrollProgress, [0, 0.6, 1], [1, 1.25, 1.75]);

  const filter = useTransform(() => {
    return `drop-shadow(0px 0px 1rem ${firstDropShadow.get()}) drop-shadow(0px 0px 10rem ${secondDropShadow.get()})`;
  });

  useEffect(() => {
    let phi = 0;
    const setting: COBEOptions = {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: phi,
      theta: 0,
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
        phi += 0.008;
      },
    };
    const globe = createGlobe(canvasRef.current!, setting);

    return () => {
      globe.destroy();
    };
  }, []);

  return (
    <>
      <motion.canvas
        initial={{ opacity: 0, scale: 0.7 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        ref={canvasRef}
        style={{
          scale: isMobile ? scale : 1,
          width: 600,
          height: 600,
          maxWidth: '100%',
          aspectRatio: 1,
          filter: filter,
        }}
      />
      {/* <motion.canvas
      ref={canvasRefMobile}
      className="md:hidden"
      style={{
        width: 400,
        height: 400,
        maxWidth: '100%',
        aspectRatio: 1,
        filter: filter,
      }}
    /> */}
    </>
  );
};
