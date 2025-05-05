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
    <div className="relative w-full" aria-labelledby="carousel-instructions">
      {/* Screen reader instructions */}
      <span className="sr-only" id="carousel-instructions">
        Use left and right arrow keys to navigate between images.
      </span>
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showThumbs={false}
        interval={5000}
        className="w-full"
        showArrows={true}
        renderArrowPrev={(onClickHandler, hasPrev) =>
          hasPrev && (
            <button
              type="button"
              onClick={onClickHandler}
              className="hidden md:flex absolute left-2 top-1/2 z-10 bg-temple-gold/90 text-temple-primary rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-temple-primary hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-temple-gold"
              aria-label="Previous Slide"
              tabIndex={0}
              style={{ transform: 'translateY(-50%)', fontSize: '2rem', fontWeight: 'bold' }}
            >
              {'<'}
            </button>
          )
        }
        renderArrowNext={(onClickHandler, hasNext) =>
          hasNext && (
            <button
              type="button"
              onClick={onClickHandler}
              className="hidden md:flex absolute right-2 top-1/2 z-10 bg-temple-gold/90 text-temple-primary rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-temple-primary hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-temple-gold"
              aria-label="Next Slide"
              tabIndex={0}
              style={{ transform: 'translateY(-50%)', fontSize: '2rem', fontWeight: 'bold' }}
            >
              {'>'}
            </button>
          )
        }
        renderIndicator={(onClickHandler, isSelected, index, label) => {
          return (
            <li key={index} style={{ listStyle: 'none', display: 'inline-block' }}>
              <button
                type="button"
                className={
                  isSelected
                    ? 'dot selected inline-block mx-1 w-3 h-3 rounded-full bg-temple-primary border-2 border-temple-gold cursor-pointer'
                    : 'dot inline-block mx-1 w-3 h-3 rounded-full bg-gray-300 border-2 border-temple-gold cursor-pointer'
                }
                aria-label={`${label} ${index + 1}`}
                aria-current={isSelected}
                tabIndex={0}
                onClick={e => onClickHandler(e)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    onClickHandler(e);
                  }
                }}
              />
            </li>
          );
        }}
      >
        {images.map((image, index) => {
          const imageQuality = currentBreakpoint === 'mobile' ? 75 : (index === 0 ? 90 : 75);
          const imageUrl = urlForImage(image, {
            width: width * dpr,
            height: height * dpr,
            quality: imageQuality,
            format: 'webp',
            fit: 'fillmax'
          }).url();

          return (
            <div key={index} className="relative w-full aspect-[4/3] md:aspect-[16/9] md:min-h-[500px] md:max-h-[750px] md:h-[65vh]">
              <Image
                src={imageUrl}
                alt={captions?.[index] || `Hero image ${index + 1}`}
                fill
                priority={index === 0}
                loading={index === 0 ? 'eager' : 'lazy'}
                className="object-cover"
                sizes="100vw"
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