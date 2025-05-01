import { createClient } from 'next-sanity'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
export const apiVersion = '2024-03-20'

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
  useCdn: false,
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