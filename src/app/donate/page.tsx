import { Metadata } from 'next';
import DonationForm from '@/components/DonationForm';
import { client } from '@/lib/sanity.client';

export const metadata: Metadata = {
  title: 'Donate | Sri Veera Brahmendra Swamy Temple',
  description: 'Support our temple development projects and contribute to our sacred initiatives.',
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
  const project = searchParams.project
    ? await getProject(searchParams.project)
    : null;

  return (
    <div className="min-h-screen bg-temple-light py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-decorative p-8">
            <h1 className="text-3xl font-heading text-temple-primary text-center mb-2">
              {project ? `Support ${project.title}` : 'Support Our Temple'}
            </h1>
            
            <div className="text-center text-temple-text mb-4">
              <p className="font-medium">
                Sri Pothuluri Veerabrahmendra Swamivari Devasthanam Trust
              </p>
              <p className="text-sm">
                (Registered Trust No. 4/2017)
              </p>
            </div>

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
              defaultAmount={1100}
            />

            <div className="mt-8 space-y-4">
              <div className="bg-temple-light/50 rounded-lg p-4">
                <h3 className="text-temple-primary font-medium text-center mb-2">Bank Account Details</h3>
                <div className="text-sm text-temple-text grid grid-cols-1 gap-1">
                  <p className="text-center">Bank: State Bank of India, Atmakur</p>
                  <p className="text-center font-medium">A/c No: 3757020206123</p>
                  <p className="text-center font-medium">IFSC Code: SBIN 0021921</p>
                </div>
              </div>

              <div className="text-sm text-temple-text text-center">
                <p>
                  You will receive a donation receipt on your email after successful payment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 