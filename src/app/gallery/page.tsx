import { groq } from 'next-sanity'
import { client } from '@/lib/sanity.client'
import VideoGallery from '@/components/VideoGallery'

const videosQuery = groq`*[_type == "video"] | order(publishedAt desc) {
  _id,
  title,
  description,
  youtubeUrl,
  publishedAt,
  category,
  featured,
  thumbnailUrl
}`

export const revalidate = 60 // Revalidate every minute

export default async function GalleryPage() {
  const videos = await client.fetch(videosQuery)
  
  return (
    <main className="min-h-screen bg-temple-light">
      <VideoGallery videos={videos} />
    </main>
  )
} 