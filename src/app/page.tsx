import { client } from '@/lib/sanity.client';
import { heroCarouselQuery } from '@/lib/queries';
import type { HeroCarousel } from '@/lib/queries';
import HomePageClient from '@/app/HomePageClient';

export const metadata = {
  title: "Sri Veerabrahmendra Swami Temple, Atmakur",
  description: "Discover Sri Veerabrahmendra Swami Temple in Atmakur, Nellore. Annadanam, events, timings, and visitor info.",
  keywords: "veerabrahmendra, temple, atmakur, annadanam, nellore, events, spiritual, bramhamgari temple"
};

export default async function HomePage() {
  const heroData: HeroCarousel = await client.fetch(heroCarouselQuery);
  return <HomePageClient heroData={heroData} />;
}
