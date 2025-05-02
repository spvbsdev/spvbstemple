import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Cache configuration for different asset types
const CACHE_CONFIG = {
  images: {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    patterns: ['.jpg', '.jpeg', '.png', '.gif', '.webp']
  },
  static: {
    maxAge: 60 * 60 * 24 * 365, // 1 year
    patterns: ['.svg', '.css', '.js', '.woff2', '.woff', '.ttf']
  }
};

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Get the file extension from the URL
  const url = new URL(request.url);
  const extension = url.pathname.split('.').pop()?.toLowerCase();

  if (extension) {
    // Find matching cache configuration
    const imageConfig = CACHE_CONFIG.images.patterns.includes(`.${extension}`);
    const staticConfig = CACHE_CONFIG.static.patterns.includes(`.${extension}`);
    
    if (imageConfig || staticConfig) {
      const maxAge = imageConfig ? CACHE_CONFIG.images.maxAge : CACHE_CONFIG.static.maxAge;
      
      // Set cache control headers
      response.headers.set(
        'Cache-Control',
        `public, max-age=${maxAge}, stale-while-revalidate`
      );
      
      // Add immutable for static assets
      if (staticConfig) {
        response.headers.append('Cache-Control', 'immutable');
      }
    }
  }

  return response;
} 