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

// Helper to format INR with Lakh/Crore labels
function formatINRWithLabel(amount?: number): string {
  if (amount == null) return 'Not specified';
  if (amount >= 1_00_00_000) {
    return `₹${(amount / 1_00_00_000).toLocaleString('en-IN', { maximumFractionDigits: 2 })} Crore`;
  } else if (amount >= 1_00_000) {
    return `₹${(amount / 1_00_000).toLocaleString('en-IN', { maximumFractionDigits: 2 })} Lakh`;
  } else {
    return `₹${amount.toLocaleString('en-IN')}`;
  }
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
      {/* Total Raised Banner */}
      <div className="bg-green-100 text-green-800 font-bold text-xl rounded-lg p-4 mb-6 text-center shadow">
        Over ₹50,00,000 raised for community projects — Thank you for your support!
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.slug.current}
            className="bg-white rounded-xl shadow-decorative overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            onClick={() => handleProjectClick(project)}
          >
            {/* Show image only if available */}
            {project.imageUrl && (
              <div className="relative h-20">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover rounded-t-xl"
                />
              </div>
            )}
            <div className="p-4">
              <h3 className="text-xl font-heading text-temple-primary mb-2">{project.title}</h3>
              {/* Amount Raised */}
              <p className="font-bold text-green-700 mb-1">
                {formatINRWithLabel(project.raisedAmount ?? project.estimatedCost)} Raised
              </p>
              <p className="text-temple-text line-clamp-2">{project.description}</p>
              {/* Impact/Benefits */}
              {project.benefits && project.benefits.length > 0 && (
                <ul className="mt-2 text-sm text-temple-text/80 list-disc list-inside">
                  {project.benefits.map((point: string, idx: number) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              )}
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

            {/* Show image in modal only if available */}
            {selectedProject.imageUrl && (
              <div className="relative h-32 w-full">
                <Image
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  fill
                  className="object-cover rounded-t-xl"
                />
              </div>
            )}

            {/* Project Content */}
            <div className="p-6">
              <h2 className="text-2xl font-heading text-temple-primary mb-4">
                {selectedProject.title}
              </h2>
              {/* Amount Raised */}
              <p className="font-bold text-green-700 text-lg mb-2">
                {formatINRWithLabel(selectedProject.raisedAmount ?? selectedProject.estimatedCost)} Raised
              </p>
              {/* Impact/Benefits */}
              {selectedProject.benefits && selectedProject.benefits.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-md font-semibold text-temple-primary">Impact</h3>
                  <ul className="list-disc list-inside text-temple-text">
                    {selectedProject.benefits.map((point: string, idx: number) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}
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
                      {formatINRWithLabel(selectedProject.estimatedCost)}
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