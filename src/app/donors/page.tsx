import { groq } from 'next-sanity';
import { client } from '@/lib/sanity.client';
import DonorList from '@/components/DonorList';
import { getPageMetadata } from '@/lib/getPageMetadata';

const donorsQuery = groq`
  *[_type == "donor" && displayOnWebsite == true] {
    _id,
    name,
    amount,
    cause,
    donationDate,
    message,
    isAnonymous
  } | order(donationDate desc)
`;

export const revalidate = 60; // Revalidate every minute

export async function generateMetadata() {
  return getPageMetadata('/donors');
}

export default async function DonorsPage() {
  const donors = await client.fetch(donorsQuery);

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

        <div className="bg-white rounded-xl shadow-decorative border border-temple-divider p-6 md:p-8">
          <DonorList donors={donors} />
        </div>
      </div>
    </div>
  );
} 