'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/types/project';
import { getProjects } from '@/lib/queries';
import CompletedProjectGallery from '@/components/CompletedProjectGallery';
import PriorityProjectCard from '@/components/PriorityProjectCard';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const priorityProjects = projects.filter(project => project.isHighPriority);
  const completedProjects = projects.filter(project => project.status === 'completed');
  const ongoingProjects = projects.filter(project => project.status === 'ongoing' && !project.isHighPriority);

  // Determine if we should show priority projects in wide layout
  const shouldShowWide = completedProjects.length === 0 && ongoingProjects.length === 0;

  return (
    <div className="bg-temple-light pb-16">
      <div className="container mx-auto px-4 pt-12 md:pt-16">
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
      </div>
    </div>
  );
} 