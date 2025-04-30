'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { urlForImage, type ImageSource } from '@/lib/sanity.image';

const imageBreakpoints = {
  mobile: { width: 640, height: 480 },
  tablet: { width: 1024, height: 640 },
  desktop: { width: 1920, height: 800 }
} as const;

type Breakpoint = keyof typeof imageBreakpoints;

interface HeroCarouselProps {
  images: ImageSource[];
  captions?: string[];
}

export default function HeroCarousel({ images, captions }: HeroCarouselProps) {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('desktop');
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 640) setCurrentBreakpoint('mobile');
      else if (width < 1024) setCurrentBreakpoint('tablet');
      else setCurrentBreakpoint('desktop');
    };

    setDpr(Math.min(2, window.devicePixelRatio || 1));
    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  const { width, height } = imageBreakpoints[currentBreakpoint];

  return (
    <div className="relative w-full">
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showThumbs={false}
        interval={5000}
        className="w-full"
      >
        {images.map((image, index) => {
          const imageUrl = urlForImage(image, {
            width: width * dpr,
            height: height * dpr,
            quality: index === 0 ? 90 : 75,
            format: 'webp',
            fit: 'fillmax'
          }).url();

          return (
            <div key={index} className="relative w-full" style={{ height: `${height}px` }}>
              <Image
                src={imageUrl}
                alt={captions?.[index] || `Hero image ${index + 1}`}
                fill
                priority={index === 0}
                loading={index === 0 ? 'eager' : 'lazy'}
                className="object-cover"
                sizes={`(max-width: 640px) 640px, (max-width: 1024px) 1024px, 1920px`}
                placeholder="blur"
                blurDataURL={urlForImage(image, {
                  width: 50,
                  height: 50,
                  blur: 20,
                  quality: 30
                }).url()}
              />
              {captions?.[index] && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4">
                  <p className="text-white text-center text-lg md:text-xl">
                    {captions[index]}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
} 