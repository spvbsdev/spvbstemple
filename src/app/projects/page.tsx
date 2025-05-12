import { getPageMetadata } from '@/lib/getPageMetadata';
import MarTechDelayedLoader from '@/components/MarTechDelayedLoader';

export async function generateMetadata() {
  return getPageMetadata('/projects');
}

import { Project } from '@/types/project';
import { getProjects } from '@/lib/queries';
import CompletedProjectGallery from '@/components/CompletedProjectGallery';
import PriorityProjectCard from '@/components/PriorityProjectCard';

export default async function ProjectsPage() {
  let projects: Project[] = [];
  try {
    projects = await getProjects();
  } catch (error) {
    console.error('Error fetching projects:', error);
  }

  const priorityProjects = projects.filter(project => project.isHighPriority);
  const completedProjects = projects.filter(project => project.status === 'completed');
  const ongoingProjects = projects.filter(project => project.status === 'ongoing' && !project.isHighPriority);

  // Determine if we should show priority projects in wide layout
  const shouldShowWide = completedProjects.length === 0 && ongoingProjects.length === 0;

  return (
    <>
      <MarTechDelayedLoader />
      <div className="bg-temple-light pb-16">
        <div className="container mx-auto px-4 pt-12 md:pt-16 md:mt-16">
          <div className="text-center mb-16 md:mb-20">
            <h1 className="text-4xl md:text-5xl font-heading text-temple-primary mb-6">
              Temple Projects
            </h1>
            <p className="text-temple-text max-w-3xl mx-auto text-lg">
              Our temple projects represent our commitment to growth and service. Through these initiatives, we continue to enhance our facilities and expand our ability to serve the community.
            </p>
          </div>


          {/* Priority Projects Section */}
          {priorityProjects.length > 0 && (
            <section className="mb-24 md:mb-32">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-heading text-temple-primary mb-6">
                  Priority Projects
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-12">
                {priorityProjects.map(project => (
                  <PriorityProjectCard
                    key={project.slug.current}
                    project={project}
                    isWide={shouldShowWide}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Ongoing Projects Section */}
          {ongoingProjects.length > 0 && (
            <section className="mb-24 md:mb-32">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-heading text-temple-primary mb-6">
                  Ongoing Projects
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {ongoingProjects.map(project => (
                  <PriorityProjectCard
                    key={project.slug.current}
                    project={project}
                  />
                ))}
              </div>
            </section>
          )}

          {/* Completed Projects Section */}
          {completedProjects.length > 0 && (
            <section className="mb-16 md:mb-20">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-heading text-temple-primary mb-6">
                  Completed Projects
                </h2>
              </div>
              <CompletedProjectGallery projects={completedProjects} />
            </section>
          )}

          {/* No Projects Message */}
          {projects.length === 0 && (
            <div className="text-center py-16 md:py-20">
              <h2 className="text-2xl font-heading text-temple-primary mb-6">
                No Projects Available
              </h2>
              <p className="text-temple-text text-lg">
                Check back later for updates on our temple projects.
              </p>
            </div>
          )}

          {/* See Our Temple in Action Section */}
          <section className="my-12 bg-temple-light rounded-xl shadow-lg p-6 text-center">
            <h2 className="text-2xl font-heading text-temple-primary mb-4">
              See Our Temple in Action
            </h2>
            <p className="mb-6 text-temple-text">
              Watch these short videos to get a real sense of our temple, our Anna Prasadam, and the Pallaki Seva. Your support makes all this possible!
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <a href="https://youtu.be/JiciDzAPU9M" target="_blank" rel="noopener noreferrer" className="flex-1">
                <div className="aspect-video rounded-lg overflow-hidden shadow">
                  <iframe
                    src="https://www.youtube.com/embed/JiciDzAPU9M"
                    title="Temple Location, Exteriors and Interiors"
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
                <div className="mt-2 font-semibold text-temple-primary">Temple Location, Exteriors and Interiors</div>
              </a>
              <a href="https://youtu.be/NcxhT_BedMM" target="_blank" rel="noopener noreferrer" className="flex-1">
                <div className="aspect-video rounded-lg overflow-hidden shadow">
                  <iframe
                    src="https://www.youtube.com/embed/NcxhT_BedMM"
                    title="Anna Prasadam"
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
                <div className="mt-2 font-semibold text-temple-primary">Anna Prasadam</div>
              </a>
              <a href="https://youtu.be/Teb2pELPQk0" target="_blank" rel="noopener noreferrer" className="flex-1">
                <div className="aspect-video rounded-lg overflow-hidden shadow">
                  <iframe
                    src="https://www.youtube.com/embed/Teb2pELPQk0"
                    title="Pallaki Seva"
                    className="w-full h-full"
                    allowFullScreen
                  />
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