import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-04-30';

// Log configuration in development
if (process.env.NODE_ENV === 'development') {
  console.log('Sanity Configuration:', {
    projectId: projectId ? 'configured' : 'missing',
    dataset,
    apiVersion,
  });
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
})

export function getClient(preview?: boolean) {
  if (preview) {
    return createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: 'previewDrafts',
    })
  }
  return client
} 