import { pageMetadata } from '@/constants/pageMetadata';

export function getPageMetadata(path: string) {
  const baseUrl = 'https://www.spvbstemple.org';
  const meta = (pageMetadata as Record<string, any>)[path];

  if (!meta) {
    // Optionally, handle missing metadata (fallback or error)
    return {};
  }

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `${baseUrl}${path}`,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${baseUrl}${path}`,
      type: 'website',
      images: [
        {
          url: `${baseUrl}${meta.ogImage}`,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [`${baseUrl}${meta.ogImage}`],
    },
  };
} 