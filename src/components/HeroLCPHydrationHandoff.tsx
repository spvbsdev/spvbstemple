"use client";
import { useState, useEffect } from 'react';
import { HeroCarouselFirstImage } from './HeroCarouselFirstImage';
import HeroCarousel from './HeroCarousel';
import type { ImageSource } from '@/lib/sanity.image';

export default function HeroLCPHydrationHandoff({
  images,
  captions,
}: {
  images: ImageSource[];
  captions?: string[];
}) {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => { setHydrated(true); }, []);
  return (
    <>
      {images?.[0] && !hydrated && (
        <div data-ssr-lcp-image>
          <HeroCarouselFirstImage image={images[0]} caption={captions?.[0]} />
        </div>
      )}
      <HeroCarousel images={images} captions={captions} />
    </>
  );
} 