"use client";
import { useState } from "react";
import Image from 'next/image';

export default function DonorWallGallery({ count = 33 }: { count?: number }) {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-semibold text-temple-primary mb-6 text-center">Donor Wall Gallery</h2>
      <div className="p-4 rounded-xl bg-temple-gold/10 shadow-inner">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {Array.from({ length: count }, (_, i) => {
            const n = i + 1;
            const isLCP = i === 0;
            return (
              <div
                key={n}
                className="overflow-hidden rounded-2xl border-4 border-temple-gold shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl hover:border-temple-primary cursor-pointer bg-temple-bg"
                onClick={() => setLightboxIdx(n)}
              >
                <Image
                  src={`/images/donor-wall/webps/donor-wall-${n}.webp`}
                  alt={`Donor Wall ${n}`}
                  width={600}
                  height={900}
                  className="w-full h-auto object-cover filter brightness-110 contrast-110"
                  priority={isLCP}
                  loading={isLCP ? 'eager' : 'lazy'}
                  fetchPriority={isLCP ? 'high' : undefined}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            );
          })}
        </div>
      </div>
      {/* Lightbox Modal */}
      {lightboxIdx && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setLightboxIdx(null)}
        >
          <div className="relative max-w-3xl w-full mx-4" onClick={e => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 text-white text-3xl font-bold bg-black/50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-temple-gold hover:text-temple-primary transition"
              onClick={() => setLightboxIdx(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <Image
              src={`/images/donor-wall/webps/donor-wall-${lightboxIdx}.webp`}
              alt={`Donor Wall ${lightboxIdx}`}
              width={1200}
              height={1800}
              className="w-full h-auto rounded-xl shadow-2xl border-4 border-temple-gold bg-white filter brightness-110 contrast-110"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </div>
  );
} 