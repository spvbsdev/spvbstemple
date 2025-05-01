import { MetadataRoute } from 'next';
import { client } from '@/lib/sanity.client';
import { sitemapQuery } from '@/lib/queries';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://spvbstemple.org';

  // Define your static routes
  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/events',
    '/gallery',
    '/contact',
    '/donate',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Fetch dynamic routes from Sanity
  const sanityData = await client.fetch(sitemapQuery);

  // Add event routes
  const eventRoutes = sanityData.events.map((event: { slug: string; _updatedAt: string }) => ({
    url: `${baseUrl}/events/${event.slug}`,
    lastModified: new Date(event._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  // Add project routes
  const projectRoutes = sanityData.projects.map((project: { slug: string; _updatedAt: string }) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project._updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Combine all routes
  return [...staticRoutes, ...eventRoutes, ...projectRoutes];
} 