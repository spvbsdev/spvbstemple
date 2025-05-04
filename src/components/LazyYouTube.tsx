'use client';

import React, { useRef, useState, useEffect } from 'react';

interface LazyYouTubeProps {
  videoId: string;
  title?: string;
  className?: string;
}

const getThumbnailUrl = (videoId: string) =>
  `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

const LazyYouTube: React.FC<LazyYouTubeProps> = ({ videoId, title = 'YouTube video', className }) => {
  const [isInView, setIsInView] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isInView) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => observer.disconnect();
  }, [isInView]);

  const handleClick = () => setIsClicked(true);

  const shouldLoadIframe = isInView || isClicked;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', background: '#000' }}
    >
      {shouldLoadIframe ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=${isClicked ? '1' : '0'}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
        />
      ) : (
        <button
          onClick={handleClick}
          aria-label={`Play video: ${title}`}
          style={{
            cursor: 'pointer',
            border: 0,
            padding: 0,
            background: 'none',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            display: 'block',
          }}
        >
          <img
            src={getThumbnailUrl(videoId)}
            alt={`Thumbnail for ${title}`}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            loading="lazy"
          />
          <span
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(0,0,0,0.6)',
              borderRadius: '50%',
              width: 64,
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="18" cy="18" r="18" fill="rgba(0,0,0,0.6)" />
              <polygon points="14,11 27,18 14,25" fill="#fff" />
            </svg>
          </span>
        </button>
      )}
    </div>
  );
};

export default LazyYouTube; 