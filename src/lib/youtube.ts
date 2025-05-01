export function getYouTubeVideoId(url: string): string | null {
  try {
    const urlObj = new URL(url);
    
    // Handle youtu.be URLs
    if (urlObj.hostname === 'youtu.be') {
      return urlObj.pathname.slice(1);
    }
    
    // Handle youtube.com URLs
    if (urlObj.hostname === 'youtube.com' || urlObj.hostname === 'www.youtube.com') {
      // Handle watch URLs
      const videoId = urlObj.searchParams.get('v');
      if (videoId) return videoId;
      
      // Handle embed URLs
      if (urlObj.pathname.startsWith('/embed/')) {
        return urlObj.pathname.split('/')[2];
      }
    }
    
    return null;
  } catch {
    return null;
  }
}

export function getYouTubeThumbnail(videoId: string, quality: 'default' | 'hq' | 'mq' | 'sd' | 'maxres' = 'hq'): string {
  return `https://img.youtube.com/vi/${videoId}/${quality}default.jpg`;
}

export function getYouTubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${videoId}`;
} 