'use client';

import { useState } from 'react';
import { format } from 'date-fns';

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

interface VideoGalleryProps {
  videos: Video[];
}

// YouTube utility functions
function getYouTubeVideoId(url: string): string | null {
  try {
    const urlObj = new URL(url);
    
    if (urlObj.hostname === 'youtu.be') {
      return urlObj.pathname.slice(1);
    }
    
    if (urlObj.hostname === 'youtube.com' || urlObj.hostname === 'www.youtube.com') {
      const videoId = urlObj.searchParams.get('v');
      if (videoId) return videoId;
      
      if (urlObj.pathname.startsWith('/embed/')) {
        return urlObj.pathname.split('/')[2];
      }
    }
    
    return null;
  } catch {
    return null;
  }
}

function getYouTubeThumbnail(videoId: string): string {
  return `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`;
}

function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
}

export default function VideoGallery({ videos }: VideoGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  // Filter videos by category
  const filteredVideos = videos
    .filter(video => selectedCategory === 'all' || video.category === selectedCategory)
    .sort((a, b) => {
      // Sort by featured first, then by date
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    });

  // Get unique categories
  const categories = ['all', ...new Set(videos
    .map(video => video.category)
    .filter((category): category is string => category !== undefined))];

  // Handle video selection
  const handleVideoSelect = (video: Video) => {
    setSelectedVideo(video);
  };

  return (
    <div className="py-12 bg-temple-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-heading text-temple-primary text-center mb-8">
          Video Gallery
        </h2>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === category
                  ? 'bg-temple-primary text-white'
                  : 'bg-white text-temple-primary hover:bg-temple-primary/10'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Selected Video Player */}
        {selectedVideo && (
          <div className="mb-12">
            <div className="aspect-video w-full max-w-4xl mx-auto mb-6">
              <iframe
                src={getYouTubeEmbedUrl(getYouTubeVideoId(selectedVideo.youtubeUrl) || '')}
                className="w-full h-full rounded-xl shadow-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-heading text-temple-primary mb-2">{selectedVideo.title}</h3>
              {selectedVideo.description && (
                <p className="text-temple-text mb-4">{selectedVideo.description}</p>
              )}
              <p className="text-temple-muted">
                {format(new Date(selectedVideo.publishedAt), 'MMMM d, yyyy')}
              </p>
            </div>
          </div>
        )}

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map(video => {
            const videoId = getYouTubeVideoId(video.youtubeUrl);
            const thumbnailUrl = video.thumbnailUrl || (videoId ? getYouTubeThumbnail(videoId) : '');

            return (
              <div
                key={video._id}
                className="bg-white rounded-xl shadow-soft overflow-hidden cursor-pointer transform transition-transform hover:-translate-y-1"
                onClick={() => handleVideoSelect(video)}
              >
                <div className="aspect-video relative">
                  <img
                    src={thumbnailUrl}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <svg
                      className="w-16 h-16 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  {video.featured && (
                    <div className="absolute top-2 right-2 bg-temple-gold text-white px-2 py-1 rounded text-sm">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-heading text-temple-primary text-lg mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="text-temple-text text-sm mb-2 line-clamp-2">
                      {video.description}
                    </p>
                  )}
                  <p className="text-temple-muted text-sm">
                    {format(new Date(video.publishedAt), 'MMMM d, yyyy')}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 