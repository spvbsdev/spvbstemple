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

  // Shared wrapper for both SSR and hydrated
  return (
    <div className="relative w-full aspect-[4/3] md:aspect-[16/9] md:min-h-[500px] md:max-h-[750px] md:h-[65vh]">
      {!hydrated && images?.[0] && (
        <HeroCarouselFirstImage image={images[0]} caption={captions?.[0]} />
      )}
      {hydrated && (
        <HeroCarousel images={images} captions={captions} />
      )}
    </div>
  );
} 