'use client';

import VideoGallery from './VideoGallery';

interface Video {
  title: string;
  videoId: string;
  featured?: boolean;
  isInvalid?: boolean;
}

export default function ClientGallery({ videos }: { videos: Video[] }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <VideoGallery videos={videos} />
    </div>
  );
} 