import { groq } from 'next-sanity';
import { client } from './sanity.client';
import type { Project } from '@/types/project';
import type { SiteSettings } from '@/types/site';

export interface Location {
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface Contact {
  primaryPhone: string;
  secondaryPhone: string;
  email: string;
  whatsapp: string;
  additionalContacts?: Array<{
    name: string;
    role: string;
    phone: string;
    whatsapp: string;
  }>;
}

export interface TempleHours {
  weekday: string;
  weekend: string;
  specialNote: string;
}

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    templeName,
    templeInfo,
    annadanamInfo,
    eventsInfo,
    teachingsInfo,
    getInvolvedInfo,
    location,
    contact,
    templeHours
  }
`;

export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await client.fetch(siteSettingsQuery);
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}

export const heroCarouselQuery = groq`
  *[_type == "heroCarousel" && active == true][0] {
    "images": images[] {
      "_type": "image",
      asset,
      hotspot,
      crop,
      alt,
      caption,
      order
    } | order(order asc)
  }
`;

export interface HeroImage {
  asset: {
    _ref: string;
    _type: string;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  alt: string;
  caption?: string;
  order: number;
  _type: string;
}

export interface HeroCarousel {
  images: HeroImage[];
}

export const eventsQuery = groq`
  *[_type == "event" && isActive == true] | order(eventDate asc) {
    _id,
    title,
    slug,
    eventDate,
    description,
    detailedDescription,
    flyer,
    isAnnualEvent,
    eventType,
    schedule,
    "imageUrl": flyer.asset->url
  }
`

export interface Event {
  _id: string
  title: string
  slug: { current: string }
  eventDate: string
  description: string
  detailedDescription?: {
    _type: string;
    _key: string;
    markDefs?: Array<{
      _type: string;
      _key: string;
    }>;
    children: Array<{
      _type: string;
      _key: string;
      text: string;
      marks?: string[];
    }>;
  }[]
  flyer?: {
    asset: {
      _ref: string
      _type: string
    }
  }
  imageUrl?: string
  isAnnualEvent: boolean
  eventType: 'jayanthi' | 'aaradhana' | 'shivaratri' | 'navaratri' | 'other'
  schedule?: Array<{
    time: string
    activity: string
  }>
}

// Sitemap Queries
export const sitemapQuery = `{
  "events": *[_type == "event"] {
    "slug": slug.current,
    _updatedAt
  },
  "projects": *[_type == "project"] {
    "slug": slug.current,
    _updatedAt
  }
}`;

export async function getProjects(): Promise<Project[]> {
  const query = groq`
    *[_type == "project"] {
      _id,
      title,
      slug,
      status,
      description,
      detailedDescription,
      "imageUrl": images[0].asset->url,
      targetAmount,
      raisedAmount,
      benefits,
      timeline,
      donorRecognition,
      isHighPriority,
      startDate,
      endDate,
      estimatedCost
    } | order(isHighPriority desc, _createdAt desc)
  `;

  try {
    const projects = await client.fetch<Project[]>(query);
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export const faqQuery = `*[_type == "faq"] | order(_createdAt asc){
  _id,
  question,
  answer
}`; 