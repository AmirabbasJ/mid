import createGlobe, { type COBEOptions } from 'cobe';
import { motion, MotionValue, useInView, useTransform } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '../../../../hooks';

interface Props {
  scrollProgress: MotionValue<number>;
}

export const Globe = ({ scrollProgress }: Props) => {
  const isMobile = useIsMobile();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const widthSetter = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', widthSetter);
    return () => window.removeEventListener('resize', widthSetter);
  }, []);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isInView = useInView(canvasRef, { once: true });
  const firstDropShadow = useTransform(scrollProgress, [0.3, 1], ['#000', '#91A0FF']);
  const secondDropShadow = useTransform(scrollProgress, [0.3, 1], ['#000', '#91A0FF40']);
  const scale = useTransform(scrollProgress, [0, 0.6, 1], [1, 1.25, 1.75]);

  const filter = useTransform(() => {
    return `drop-shadow(0px 0px 1rem ${firstDropShadow.get()}) drop-shadow(0px 0px 10rem ${secondDropShadow.get()})`;
  });

  const globeSize = windowWidth > 600 ? 600 * 2 : (windowWidth - 10) * 2;

  useEffect(() => {
    let phi = 0;
    const setting: COBEOptions = {
      devicePixelRatio: 2,
      width: globeSize,
      height: globeSize,
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
  }, [globeSize]);

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
