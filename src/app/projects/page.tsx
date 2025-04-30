import { groq } from 'next-sanity';
import { client } from '@/lib/sanity.client';
import { Project } from '@/types/project';
import ProjectCard from '@/components/ProjectCard';
import { Metadata } from 'next';

const projectsQuery = groq`
  *[_type == "project" && isActive != false] {
    _id,
    title,
    slug,
    status,
    description,
    detailedDescription,
    "imageUrl": images[0].asset->url,
    targetAmount,
    raisedAmount,
    benefits,
    timeline,
    donorRecognition,
    isHighPriority
  } | order(isHighPriority desc, _createdAt desc)
`;

export const metadata: Metadata = {
  title: 'SPVBS Temple | Projects',
  description: 'Discover our ongoing temple development projects and initiatives at SPVBS Temple',
};

export default async function ProjectsPage() {
  const projects = await client.fetch<Project[]>(projectsQuery);
  const highPriorityProjects = projects.filter(p => p.isHighPriority);
  const otherProjects = projects.filter(p => !p.isHighPriority);

  return (
    <div className="min-h-screen bg-temple-light py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-heading text-temple-primary text-center mb-16">
          Temple Development Projects
        </h1>

        {/* High Priority Projects */}
        {highPriorityProjects.length > 0 && (
          <section className="mb-20">
            <h2 className="text-3xl font-heading text-temple-primary mb-8 text-center">
              Priority Projects
            </h2>
            <div className={`grid md:grid-cols-2 gap-8 ${highPriorityProjects.length === 1 ? 'place-items-center md:grid-cols-1 max-w-2xl mx-auto' : ''}`}>
              {highPriorityProjects.map(project => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </section>
        )}

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <section>
            <h2 className="text-3xl font-heading text-temple-primary mb-8 text-center">
              Other Development Projects
            </h2>
            <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-8 ${otherProjects.length === 1 ? 'place-items-center md:grid-cols-1 max-w-2xl mx-auto' : ''}`}>
              {otherProjects.map(project => (
                <ProjectCard key={project._id} project={project} />
              ))}
            </div>
          </section>
        )}

        {/* Support Message */}
        <section className="mt-20 text-center">
          <h2 className="text-3xl font-heading text-temple-primary mb-8">
            Support Our Temple
          </h2>
          <p className="text-temple-text max-w-2xl mx-auto mb-12">
            Every contribution, regardless of size, is valuable and helps us preserve and enhance our sacred spaces for future generations. We are deeply grateful for your support in maintaining and developing our temple.
          </p>
        </section>
      </div>
    </div>
  );
} 