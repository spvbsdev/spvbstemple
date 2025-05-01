import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SPVBS Temple | Contact',
  description: 'Get in touch with Sri Pothuluri Veera Brahmendra Swami Temple. Find our location, contact numbers, and ways to connect.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 