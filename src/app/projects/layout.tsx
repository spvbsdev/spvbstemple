import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SPVBS Temple | Projects',
  description: 'Discover our ongoing temple development projects and initiatives at SPVBS Temple',
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 