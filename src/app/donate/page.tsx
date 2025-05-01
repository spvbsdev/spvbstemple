import { Metadata } from 'next';
import DonationForm from '@/components/DonationForm';
import DonationCategories from '@/components/DonationCategories';
import { client } from '@/lib/sanity.client';
import { getSiteSettings } from '@/lib/queries';

export const metadata: Metadata = {
  title: 'Donate | Sri Veera Brahmendra Swamy Temple',
  description: 'Support our temple through various donation programs and contribute to our sacred initiatives.',
};

async function getProject(projectId: string) {
  if (!projectId) return null;
  return await client.fetch(`*[_type == "project" && _id == $projectId][0]`, {
    projectId,
  });
}

export default async function DonatePage({
  searchParams,
}: {
  searchParams: { project?: string };
}) {
  const [project, settings] = await Promise.all([
    searchParams.project ? getProject(searchParams.project) : null,
    getSiteSettings()
  ]);

  return (
    <div className="min-h-screen bg-temple-light py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-heading text-temple-primary text-center mb-8">
          {project ? `Support ${project.title}` : 'Support Our Temple'}
        </h1>
        
        <div className="text-center text-temple-text mb-8">
          <p className="font-medium text-xl">
            Sri Pothuluri Veerabrahmendra Swamivari Devasthanam Trust
          </p>
          <p className="text-sm">
            (Registered Trust No. 4/2017)
          </p>
        </div>

        {/* Make a General Donation */}
        <div className="max-w-2xl mx-auto mb-16">
          <div className="bg-white rounded-xl shadow-decorative p-8">
            <h2 className="text-2xl font-heading text-temple-primary text-center mb-6">
              Make a Donation
            </h2>

            {project && (
              <p className="text-temple-text text-center mb-8">
                {project.description}
              </p>
            )}

            {!project && (
              <p className="text-temple-text text-center mb-8">
                Your generous contribution helps us maintain and develop our temple facilities,
                conduct religious ceremonies, and serve our community better.
              </p>
            )}

            <DonationForm
              projectId={project?._id}
            />
          </div>
        </div>

        {/* Donation Categories */}
        <div className="mb-16">
          <h2 className="text-2xl font-heading text-temple-primary text-center mb-8">
            Seva & Donation Categories
          </h2>
          <DonationCategories settings={settings} />
        </div>
      </div>
    </div>
  );
} 