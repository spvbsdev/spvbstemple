import Image from 'next/image';
import { urlForImage, type ImageSource } from '@/lib/sanity.image';

export function HeroCarouselFirstImage({ image, caption }: { image: ImageSource; caption?: string }) {
  // Use desktop size for SSR; browser will pick best from srcset
  const width = 1920;
  const height = 800;
  const imageUrl = urlForImage(image, {
    width,
    height,
    quality: 90,
    format: 'webp',
    fit: 'fillmax',
  }).url();
  const blurUrl = urlForImage(image, {
    width: 50,
    height: 50,
    blur: 20,
    quality: 30,
    format: 'webp',
    fit: 'fillmax',
  }).url();
  return (
    <div className="relative w-full aspect-[4/3] md:aspect-[16/9] md:min-h-[500px] md:max-h-[750px] md:h-[65vh]">
      <Image
        src={imageUrl}
        alt={caption || 'Hero image'}
        fill
        priority
        fetchPriority="high"
        loading="eager"
        className="object-cover"
        sizes="100vw"
        placeholder="blur"
        blurDataURL={blurUrl}
      />
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4">
          <p className="text-white text-center text-lg md:text-xl">{caption}</p>
        </div>
      )}
    </div>
  );
} 