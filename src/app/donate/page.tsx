import DonationForm from '@/components/DonationForm';
import DonationCategories from '@/components/DonationCategories';
import { client } from '@/lib/sanity.client';
import { getSiteSettings } from '@/lib/queries';
import type { SiteSettings } from '@/types/site';
import LazyYouTube from '@/components/LazyYouTube';
import { getPageMetadata } from '@/lib/getPageMetadata';
import MarTechDelayedLoader from '@/components/MarTechDelayedLoader';

interface Project {
  _id: string;
  title: string;
  description?: string;
}

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

export async function generateMetadata() {
  return getPageMetadata('/donate');
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
    <>
      <MarTechDelayedLoader />
      <div className="bg-temple-light pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center pt-8">
            <h1 className="text-4xl font-heading text-temple-primary mb-4">
              {project ? `Support ${project.title}` : 'Support Our Temple'}
            </h1>
            
            <div className="text-temple-text mb-12">
              <p className="font-medium text-xl mb-2">
                Sri Pothuluri Veerabrahmendra Swamivari Devasthanam Trust
              </p>
              <p className="text-sm text-temple-text/80">
                (Registered Trust No. 4/2017)
              </p>
            </div>
          </div>

 

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-16">

            {/* left Column */}
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
                    <ul className="list-none pl-6 space-y-2">
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

          </div>

                   {/* See Our Temple in Action Section */}
                   <section className="my-12 bg-temple-light rounded-xl shadow-lg p-6 text-center">
            <h2 className="text-2xl font-heading text-temple-primary mb-4">
              See How Your Donations Enriches the Temple
            </h2>
            <p className="mb-6 text-temple-text">
              Your devotion and generosity help sustain our sacred traditions and bring blessings to countless devotees. Watch these moments to witness the divine impact of your support.
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <a href="https://youtu.be/JiciDzAPU9M" target="_blank" rel="noopener noreferrer" className="flex-1">
                <div className="aspect-video rounded-lg overflow-hidden shadow">
                  <LazyYouTube videoId="JiciDzAPU9M" title="Temple Location, Exteriors and Interiors" className="w-full h-full" />
                </div>
                <div className="mt-2 font-semibold text-temple-primary">Temple Location, Exteriors and Interiors</div>
              </a>
              <a href="https://youtu.be/NcxhT_BedMM" target="_blank" rel="noopener noreferrer" className="flex-1">
                <div className="aspect-video rounded-lg overflow-hidden shadow">
                  <LazyYouTube videoId="NcxhT_BedMM" title="Anna Prasadam" className="w-full h-full" />
                </div>
                <div className="mt-2 font-semibold text-temple-primary">Anna Prasadam</div>
              </a>
              <a href="https://youtu.be/Teb2pELPQk0" target="_blank" rel="noopener noreferrer" className="flex-1">
                <div className="aspect-video rounded-lg overflow-hidden shadow">
                  <LazyYouTube videoId="Teb2pELPQk0" title="Pallaki Seva" className="w-full h-full" />
                </div>
                <div className="mt-2 font-semibold text-temple-primary">Pallaki Seva</div>
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
} 