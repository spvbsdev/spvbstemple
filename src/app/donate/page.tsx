import { Metadata } from 'next';
import DonationForm from '@/components/DonationForm';
import DonationCategories from '@/components/DonationCategories';
import { client } from '@/lib/sanity.client';
import { getSiteSettings } from '@/lib/queries';
import type { SiteSettings } from '@/types/site';

interface Project {
  _id: string;
  title: string;
  description?: string;
}

export const metadata: Metadata = {
  title: 'Donate | Sri Veera Brahmendra Swamy Temple',
  description: 'Support our temple through various donation programs and contribute to our sacred initiatives.',
};

async function getProject(projectId: string) {
  if (!projectId) return null;
  return await client.fetch<Project>(`*[_type == "project" && _id == $projectId][0]`, {
    projectId,
  });
}

interface PageProps {
  params: Promise<{ [key: string]: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function DonatePage(props: PageProps) {
  const searchParams = await props.searchParams;
  const projectId = typeof searchParams?.project === 'string' ? searchParams.project : undefined;
  
  const [project, settings] = await Promise.all([
    projectId ? getProject(projectId) : null,
    getSiteSettings()
  ]) as [Project | null, SiteSettings | null];

  if (!settings) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-temple-light pb-16">
      <div className="container mx-auto px-4 pt-24 md:pt-32">
        <h1 className="text-4xl font-heading text-temple-primary text-center mb-8">
          {project ? `Support ${project.title}` : 'Support Our Temple'}
        </h1>
        
        <div className="text-center text-temple-text mb-12">
          <p className="font-medium text-xl">
            Sri Pothuluri Veerabrahmendra Swamivari Devasthanam Trust
          </p>
          <p className="text-sm">
            (Registered Trust No. 4/2017)
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Left Column */}
          <div className="space-y-8">
            {/* Temple Development Section */}
            <div className="bg-white rounded-xl shadow-decorative p-8 h-full">
              <h2 className="text-3xl font-heading text-temple-primary text-center mb-6">
                Temple Development Through Your Support
              </h2>
              
              <div className="prose prose-lg mx-auto text-temple-text space-y-6">
                <div className="mb-8">
                  <h3 className="text-2xl font-heading text-temple-primary mb-4">Completed Projects</h3>
                  <p className="leading-relaxed">
                    Through the generous donations of our devotees, we have successfully completed several 
                    essential infrastructure projects:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Core Temple Structure: Sikharam, Dhwaja Stabham, Mandapam, Antharalayam, and Garbhagudi</li>
                    <li>Support Facilities: Temple Kitchen and Storage Room</li>
                    <li>Worship Areas: Navagraha Mandapam</li>
                    <li>Recent Addition: Large Dome Sun Shade for Anna Prasadam Distribution</li>
                  </ul>
                </div>

                <div className="mb-8">
                  <h3 className="text-2xl font-heading text-temple-primary mb-4">Ongoing Services</h3>
                  <p className="leading-relaxed">
                    For the past 156 weeks (3 years), we have been continuously providing Anna Prasadam to devotees. 
                    During annual celebrations, our temple serves prasadam to over 1,000 devotees, showcasing our 
                    commitment to this sacred tradition.
                  </p>
                </div>

                <div>
                  <h3 className="text-2xl font-heading text-temple-primary mb-4">Current Project: Kalyana Mandapam</h3>
                  <p className="leading-relaxed mb-6">
                    We are now embarking on our next significant project: the construction of a Kalyana Mandapam. 
                    This new facility will serve as a sacred space for ceremonies and community gatherings. Your 
                    support will help us create this important addition to our temple complex.
                  </p>
                  <div className="flex justify-center mb-12">
                    <a
                      href="/donate?project=kalyana-mandapam"
                      className="inline-flex items-center justify-center px-8 py-3 bg-temple-primary text-white rounded-full font-sanskrit hover:bg-temple-secondary transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                    >
                      Support Kalyana Mandapam Project
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>

                  <div className="border-t border-temple-divider pt-8 text-center">
                    <h3 className="text-xl font-heading text-temple-primary mb-4">
                      See Our Completed Projects
                    </h3>
                    <p className="text-temple-text mb-6">
                      Discover how your donations have helped us complete various temple development projects, 
                      including the Sikharam, Dhwaja Stabham, Mandapam, and more. View our gallery of completed projects 
                      and see the direct impact of devotees&apos; contributions.
                    </p>
                    <a
                      href="/projects#completed"
                      className="inline-flex items-center justify-center px-8 py-3 bg-temple-gold/20 text-temple-primary rounded-full font-sanskrit hover:bg-temple-gold hover:text-temple-dark transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
                    >
                      View Completed Projects
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Make a General Donation */}
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

            {/* Quick Donation Options */}
            <div className="bg-white rounded-xl shadow-decorative p-8">
              <h2 className="text-2xl font-heading text-temple-primary text-center mb-8">
                Seva & Donation Categories
              </h2>
              <DonationCategories settings={settings} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 