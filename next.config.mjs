// Convert to ESM for Next.js config
import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/c973pa4u/**',
      }
    ],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  typescript: {
    ignoreBuildErrors: process.env.NODE_ENV === 'development'
  },
  eslint: {
    ignoreDuringBuilds: process.env.VERCEL_ENV === 'production',
  },
  experimental: {
    optimizePackageImports: ['@fortawesome/free-solid-svg-icons']
  },
  // Enable source maps in production
  productionBrowserSourceMaps: true,
  webpack: (config, { dev, isServer }) => {
    // Only use source-map in production
    if (!dev && !isServer) {
      config.devtool = 'source-map';
    }
    return config;
  }
};

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})(nextConfig); 