import { getPageMetadata } from '@/lib/getPageMetadata';
import DonorWallGallery from '@/components/DonorWallGallery';

export const revalidate = 60; // Revalidate every minute

export async function generateMetadata() {
  return getPageMetadata('/donors');
}

export default function DonorsPage() {
  return (
    <div className="min-h-screen bg-temple-bg">
      <div className="container mx-auto px-4 pb-12 pt-24 md:pt-32">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading text-temple-primary mb-6">
            Our Generous Donors
          </h1>
          <p className="text-temple-text max-w-2xl mx-auto">
            We are deeply grateful to all our donors who contribute to the growth and maintenance of our temple.
            Their generous support helps us maintain our traditions, conduct festivals, and serve our community.
          </p>
        </div>
        <DonorWallGallery count={33} />
      </div>
    </div>
  );
} 