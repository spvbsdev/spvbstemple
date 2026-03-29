import { getPageMetadata } from '@/lib/getPageMetadata';
import DonorWallGallery from '@/components/DonorWallGallery';
import DonorList from '@/components/DonorList';
import { getDonors } from '@/lib/queries';

export const revalidate = 60;

export async function generateMetadata() {
  return getPageMetadata('/donors');
}

export default async function DonorsPage() {
  const donors = await getDonors();

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

        {donors.length > 0 ? (
          <section className="mb-16" aria-label="Donation records">
            <h2 className="text-2xl font-heading text-temple-primary mb-2 text-center">Donation records</h2>
            <p className="text-temple-text text-center text-sm mb-6 max-w-xl mx-auto">
              Listed below as a table (filter and sort apply to this list). The gallery follows.
            </p>
            <DonorList donors={donors} layout="table" />
          </section>
        ) : (
          <p className="text-center text-temple-text mb-12 max-w-lg mx-auto">
            No donor records are published yet. Add them in Sanity Studio or run the CSV import script from the repo
            (<span className="font-mono text-sm">npm run import-donors -- path/to/file.csv</span>).
          </p>
        )}

        <DonorWallGallery count={33} />
      </div>
    </div>
  );
}
