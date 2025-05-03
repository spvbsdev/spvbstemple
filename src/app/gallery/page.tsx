import { Metadata } from 'next'
import { YOUTUBE_PLAYLISTS } from '@/constants/youtubePlaylists'
import GalleryTabs from '@/components/GalleryTabs'

export const revalidate = 60 // Revalidate every minute
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: 'SPVBS Temple | Gallery',
  description: 'View photos and videos from various events and ceremonies at SPVBS Temple',
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
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/youtube/latest`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    return [];
  }
  let data;
  try {
    data = await res.json();
  } catch {
    return [];
  }
  return (data.items as YouTubeApiItem[]).filter(item => item.id && item.id.videoId);
}

async function fetchPlaylistVideos(playlistId: string) {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/youtube/playlist?playlistId=${playlistId}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    return [];
  }
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
      {/* Featured Section */}
      {featured && (
        <section className="mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-heading text-temple-primary text-center mb-4 tracking-tight">
              Featured Video
            </h2>
            <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg mb-4">
              <iframe
                src={`https://www.youtube.com/embed/${featured._id}`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={featured.title}
              />
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