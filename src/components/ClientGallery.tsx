'use client';

import VideoGallery from './VideoGallery';

interface Video {
  _id: string;
  title: string;
  description?: string;
  youtubeUrl: string;
  publishedAt: string;
  category?: string;
  featured: boolean;
  thumbnailUrl?: string;
}

export default function ClientGallery({ videos }: { videos: Video[] }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <VideoGallery videos={videos} />
    </div>
  );
} 