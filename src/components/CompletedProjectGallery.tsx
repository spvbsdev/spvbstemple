'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Project } from '@/types/project';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { PortableText } from '@portabletext/react';

interface CompletedProjectGalleryProps {
  projects: Project[];
}

export default function CompletedProjectGallery({ projects }: CompletedProjectGalleryProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.slug.current}
            className="bg-white rounded-xl shadow-decorative overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            onClick={() => handleProjectClick(project)}
          >
            <div className="relative h-48">
              <Image
                src={project.imageUrl || '/images/project-placeholder.jpg'}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-heading text-temple-primary mb-2">{project.title}</h3>
              <p className="text-temple-text line-clamp-2">{project.description}</p>
              <div className="mt-4 flex items-center text-temple-text/80">
                <FontAwesomeIcon icon={faCalendarCheck as IconProp} className="w-4 h-4 mr-2" />
                <span className="text-sm">Completed {project.endDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-temple-text/60 hover:text-temple-text transition-colors"
              aria-label="Close modal"
            >
              <FontAwesomeIcon icon={faTimes as IconProp} className="w-6 h-6" />
            </button>

            {/* Project Image */}
            <div className="relative h-64 w-full">
              <Image
                src={selectedProject.imageUrl || '/images/project-placeholder.jpg'}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Project Content */}
            <div className="p-6">
              <h2 className="text-2xl font-heading text-temple-primary mb-4">
                {selectedProject.title}
              </h2>

              {/* Project Details */}
              <div className="prose prose-temple max-w-none">
                {selectedProject.detailedDescription ? (
                  <PortableText value={selectedProject.detailedDescription} />
                ) : (
                  <p>{selectedProject.description}</p>
                )}
              </div>

              {/* Project Metadata */}
              <div className="mt-6 pt-6 border-t border-temple-divider">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-temple-text/60">Start Date</h3>
                    <p className="text-temple-text">{selectedProject.startDate || 'Not specified'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-temple-text/60">Completion Date</h3>
                    <p className="text-temple-text">{selectedProject.endDate || 'Not specified'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-temple-text/60">Total Cost</h3>
                    <p className="text-temple-text">
                      ₹{selectedProject.estimatedCost?.toLocaleString() || 'Not specified'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 