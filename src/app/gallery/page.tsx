import { YOUTUBE_PLAYLISTS } from '@/constants/youtubePlaylists'
import GalleryTabs from '@/components/GalleryTabs'
import { headers } from 'next/headers';
import LazyYouTube from '@/components/LazyYouTube';

export const revalidate = 60 // Revalidate every minute
export const dynamic = "force-dynamic";

export const metadata = {
  title: "Gallery | Veerabrahmendra Swami Temple, Atmakur",
  description: "Photos and videos from events at Sri Veerabrahmendra Swami Temple, Atmakur, Nellore.",
  keywords: "gallery, photos, videos, temple, events, atmakur, nellore, bramhamgari temple"
};

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

interface YouTubeApiItem {
  id: { videoId: string };
  snippet: {
    title: string;
    description: string;
    publishedAt: string;
    thumbnails: {
      high?: { url: string };
      medium?: { url: string };
      default?: { url: string };
    };
  };
}

async function fetchYouTubeVideos() {
  let url = '';
  if (typeof window === 'undefined') {
    // Server-side: build absolute URL
    const host = (await headers()).get('host');
    const protocol = host?.startsWith('localhost') ? 'http' : 'https';
    url = `${protocol}://${host}/api/youtube/latest`;
  } else {
    // Client-side: use relative URL
    url = '/api/youtube/latest';
  }
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  let data;
  try {
    data = await res.json();
  } catch {
    return [];
  }
  return (data.items as YouTubeApiItem[]).filter(item => item.id && item.id.videoId);
}

async function fetchPlaylistVideos(playlistId: string) {
  let url = '';
  if (typeof window === 'undefined') {
    // Server-side: build absolute URL
    const host = (await headers()).get('host');
    const protocol = host?.startsWith('localhost') ? 'http' : 'https';
    url = `${protocol}://${host}/api/youtube/playlist?playlistId=${playlistId}`;
  } else {
    // Client-side: use relative URL
    url = `/api/youtube/playlist?playlistId=${playlistId}`;
  }
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) return [];
  let data;
  try {
    data = await res.json();
  } catch {
    return [];
  }
  return (data.items as YouTubeApiItem[]).filter(item => item.snippet && item.snippet.title && item.id);
}

function mapYouTubeToVideo(youtube: YouTubeApiItem): Video {
  return {
    _id: youtube.id.videoId,
    title: youtube.snippet.title,
    description: youtube.snippet.description,
    youtubeUrl: `https://www.youtube.com/watch?v=${youtube.id.videoId}`,
    publishedAt: youtube.snippet.publishedAt,
    category: undefined,
    featured: false,
    thumbnailUrl: youtube.snippet.thumbnails?.high?.url || youtube.snippet.thumbnails?.medium?.url || youtube.snippet.thumbnails?.default?.url,
  };
}

function getMonthlyVideos(videos: Video[]): Video[] {
  const now = new Date();
  return videos.filter(video => {
    const published = new Date(video.publishedAt);
    return published.getMonth() === now.getMonth() && published.getFullYear() === now.getFullYear();
  });
}

function getWeeklyVideos(videos: Video[]): Video[] {
  const now = new Date();
  const weekAgo = new Date(now);
  weekAgo.setDate(now.getDate() - 7);
  return videos.filter(video => {
    const published = new Date(video.publishedAt);
    return published >= weekAgo && published <= now;
  });
}

export default async function GalleryPage() {
  // Fetch timeline-based videos
  const youtubeVideos = await fetchYouTubeVideos();
  const allVideos: Video[] = youtubeVideos.map(mapYouTubeToVideo);
  const featured = allVideos[0] || null;
  const monthly = getMonthlyVideos(allVideos);
  const weekly = getWeeklyVideos(allVideos);

  // Fetch playlist videos
  const playlistSections = await Promise.all(
    YOUTUBE_PLAYLISTS.map(async (playlist) => {
      const playlistVideos = (await fetchPlaylistVideos(playlist.id)).map(mapYouTubeToVideo);
      return {
        ...playlist,
        videos: playlistVideos,
      };
    })
  );

  return (
    <main className="min-h-screen bg-temple-light pt-24 px-2 md:px-0">
      <h1 className="sr-only">Gallery - Sri Veerabrahmendra Swami Temple, Atmakur</h1>
      {/* Featured Section */}
      {featured && (
        <section className="mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-heading text-temple-primary text-center mb-4 tracking-tight">
              Featured Video
            </h2>
            <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg mb-4">
              <LazyYouTube videoId={featured._id} title={featured.title} className="w-full h-full" />
            </div>
            <h3 className="text-2xl font-heading text-temple-primary mb-2 text-center">{featured.title}</h3>
          </div>
        </section>
      )}
      {/* Tabbed Filter Section */}
      <GalleryTabs
        featured={featured}
        allVideos={allVideos}
        monthly={monthly}
        weekly={weekly}
        playlists={playlistSections}
      />
    </main>
  )
} 