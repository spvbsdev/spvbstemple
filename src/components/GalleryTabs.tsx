'use client';

import { useState } from 'react';
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

export default function GalleryTabs({
  featured,
  allVideos,
  monthly,
  weekly,
  playlists
}: {
  featured: Video | null;
  allVideos: Video[];
  monthly: Video[];
  weekly: Video[];
  playlists: { id: string; title: string; description?: string; videos: Video[] }[];
}) {
  const [tab, setTab] = useState<string>('all');

  // Exclude featured video from all tabs
  const filteredAll = allVideos.filter(v => !featured || v._id !== featured._id);
  const filteredMonthly = monthly.filter(v => !featured || v._id !== featured._id);
  const filteredWeekly = weekly.filter(v => !featured || v._id !== featured._id);
  const playlistTabs = playlists.map(p => ({
    ...p,
    videos: p.videos.filter(v => !featured || v._id !== featured._id)
  }));

  const tabOptions: ({ key: string; label: string; videos: Video[]; description?: string })[] = [
    { key: 'all', label: 'All Videos', videos: filteredAll },
    { key: 'monthly', label: 'This Month', videos: filteredMonthly },
    { key: 'weekly', label: 'This Week', videos: filteredWeekly },
    ...(Array.isArray(playlistTabs) ? playlistTabs.map(p => ({ key: p.id, label: p.title, videos: p.videos, description: p.description })) : [])
  ];

  const currentTab = tabOptions.find(t => t.key === tab) || tabOptions[0];

  if (!currentTab) {
    return <div className="text-center text-temple-muted">No videos available.</div>;
  }

  return (
    <section className="mt-12">
      <div className="flex flex-wrap justify-center gap-4 mb-8 sticky top-0 z-10 bg-temple-light pt-4 pb-2">
        {tabOptions.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-5 py-2 rounded-full font-semibold transition-colors text-lg shadow-sm
              ${tab === t.key ? 'bg-temple-primary text-white' : 'bg-white text-temple-primary hover:bg-temple-primary/10'}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {'description' in currentTab && currentTab.description && (
        <p className="text-center text-temple-muted mb-4">{currentTab.description}</p>
      )}
      {Array.isArray(currentTab.videos) && currentTab.videos.length === 0 ? (
        <div className="text-center text-temple-muted">No videos found for this filter.</div>
      ) : (
        <VideoGallery videos={currentTab.videos} />
      )}
    </section>
  );
} 