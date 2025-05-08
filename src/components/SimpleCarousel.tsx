import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import Image from 'next/image';
import { urlForImage, type ImageSource } from '@/lib/sanity.image';
import '../styles/carousel.css';

interface SimpleCarouselProps {
  images: ImageSource[];
  captions?: string[];
  interval?: number; // ms
}

export default function SimpleCarousel({ images, captions, interval = 5000 }: SimpleCarouselProps) {
  const [current, setCurrent] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const numSlides = images.length;

  // Autoplay logic
  useEffect(() => {
    if (numSlides <= 1) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCurrent((prev) => (prev + 1) % numSlides);
    }, interval);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [current, numSlides, interval]);

  // Keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      setCurrent((prev) => (prev - 1 + numSlides) % numSlides);
    } else if (e.key === 'ArrowRight') {
      setCurrent((prev) => (prev + 1) % numSlides);
    }
  };

  // Pause autoplay on hover/focus
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused && timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, [paused]);

  return (
    <div
      className="relative w-full aspect-[4/3] md:aspect-[16/9] md:min-h-[500px] md:max-h-[750px] md:h-[65vh]"
      tabIndex={0}
      aria-roledescription="carousel"
      aria-label="Hero image carousel"
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {images.map((image, idx) => {
        const isActive = idx === current;
        const imageUrl = urlForImage(image, {
          width: 1920,
          height: 800,
          quality: idx === 0 ? 90 : 75,
          format: 'webp',
          fit: 'fillmax',
        }).url();
        const blurUrl = urlForImage(image, {
          width: 50,
          height: 50,
          blur: 20,
          quality: 30,
        }).url();
        return (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-700 ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
            aria-hidden={!isActive}
          >
            <Image
              src={imageUrl}
              alt={captions?.[idx] || `Hero image ${idx + 1}`}
              fill
              priority={idx === 0}
              className="object-cover"
              sizes="(max-width: 400px) 100vw, (max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1024px"
              placeholder="blur"
              blurDataURL={blurUrl}
            />
            {captions?.[idx] && isActive && (
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4">
                <p className="text-white text-center text-lg md:text-xl">{captions[idx]}</p>
              </div>
            )}
          </div>
        );
      })}
      {/* Arrows */}
      {numSlides > 1 && (
        <>
          <button
            type="button"
            onClick={() => setCurrent((prev) => (prev - 1 + numSlides) % numSlides)}
            className="hidden md:flex absolute left-2 top-1/2 z-20 bg-temple-gold/90 text-temple-primary rounded-full w-12 h-12 items-center justify-center shadow-lg hover:bg-temple-primary hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-temple-gold"
            aria-label="Previous Slide"
            style={{ transform: 'translateY(-50%)', fontSize: '2rem', fontWeight: 'bold' }}
          >
            {'<'}
          </button>
          <button
            type="button"
            onClick={() => setCurrent((prev) => (prev + 1) % numSlides)}
            className="hidden md:flex absolute right-2 top-1/2 z-20 bg-temple-gold/90 text-temple-primary rounded-full w-12 h-12 items-center justify-center shadow-lg hover:bg-temple-primary hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-temple-gold"
            aria-label="Next Slide"
            style={{ transform: 'translateY(-50%)', fontSize: '2rem', fontWeight: 'bold' }}
          >
            {'>'}
          </button>
        </>
      )}
      {/* Dots */}
      {numSlides > 1 && (
        <div className="absolute left-0 right-0 bottom-4 flex justify-center z-20">
          <ul className="flex gap-2">
            {images.map((_, idx) => (
              <li key={idx} style={{ listStyle: 'none' }}>
                <button
                  type="button"
                  className={
                    idx === current
                      ? 'dot selected inline-block mx-1 w-3 h-3 rounded-full bg-temple-primary border-2 border-temple-gold cursor-pointer'
                      : 'dot inline-block mx-1 w-3 h-3 rounded-full bg-gray-300 border-2 border-temple-gold cursor-pointer'
                  }
                  aria-label={`Go to slide ${idx + 1}`}
                  aria-current={idx === current}
                  onClick={() => setCurrent(idx)}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Screen reader instructions */}
      <span className="sr-only" id="carousel-instructions">
        Use left and right arrow keys to navigate between images.
      </span>
    </div>
  );
} 