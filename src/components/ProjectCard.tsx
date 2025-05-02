'use client';

import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import ProjectHighlight from '@/components/ProjectHighlight';
import { useState } from 'react';
import { Project } from '@/types/project';

export default function ProjectCard({ project }: { project: Project }) {
  const [showDetails, setShowDetails] = useState(false);
  const progress = project.raisedAmount && project.targetAmount 
    ? (project.raisedAmount / project.targetAmount) * 100
    : 0;
  const isKalyanaMandapam = project.slug.current === 'kalyana-mandapam';
  
  return (
    <div 
      id={isKalyanaMandapam ? 'kalyana-mandapam' : undefined}
      className="bg-white rounded-xl shadow-decorative border border-temple-divider overflow-hidden hover:border-temple-gold/50 transition-all duration-300"
    >
      {/* Main Card Content */}
      <div className="p-6">
        {/* Project Image */}
        {project.imageUrl && (
          <div className="relative h-48 w-full mb-6 rounded-lg overflow-hidden">
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Project Title and Description */}
        <h3 className="text-2xl font-heading text-temple-primary mb-3">{project.title}</h3>
        <p className="text-temple-text mb-6">{project.description}</p>
        
        {/* Progress Bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-temple-text">Progress</span>
            <span className="text-temple-primary font-medium">{progress.toFixed(1)}%</span>
          </div>
          <div className="w-full h-2 bg-temple-light rounded-full overflow-hidden">
            <div 
              className="h-full bg-temple-primary rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-temple-text">Raised: ₹{project.raisedAmount?.toLocaleString() || '0'}</span>
            <span className="text-temple-text">Goal: ₹{project.targetAmount.toLocaleString()}</span>
          </div>
        </div>

        {/* Project Benefits */}
        <div className="space-y-4 mb-6">
          {project.benefits && project.benefits.length > 0 && (
            <div>
              <h4 className="font-heading text-temple-primary mb-2">Project Benefits</h4>
              <ul className="list-disc list-inside text-temple-text space-y-1">
                {project.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          )}
          
          {/* Basic Timeline */}
          {project.timeline && (
            <div>
              <h4 className="font-heading text-temple-primary mb-2">Timeline</h4>
              <div className="text-temple-text">
                <p>Start: {new Date(project.timeline.startDate).toLocaleDateString()}</p>
                {project.timeline.endDate && (
                  <p>Estimated Completion: {new Date(project.timeline.endDate).toLocaleDateString()}</p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <a
            href={`/donate?project=${project.slug.current}`}
            className="block w-full bg-temple-primary text-white text-center py-3 rounded-lg font-sanskrit hover:bg-temple-secondary transition-colors duration-300"
          >
            Contribute Now
          </a>
          
          {isKalyanaMandapam && (
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="w-full flex items-center justify-center gap-2 bg-temple-light text-temple-primary py-3 rounded-lg font-sanskrit hover:bg-temple-light/80 transition-colors duration-300"
            >
              {showDetails ? 'Hide Project Details' : 'View Detailed Project Information'}
              <FontAwesomeIcon 
                icon={(showDetails ? faChevronUp : faChevronDown) as IconProp}
                className="w-4 h-4"
              />
            </button>
          )}
        </div>
      </div>

      {/* Expanded Details Section */}
      {isKalyanaMandapam && showDetails && (
        <div className="border-t border-temple-divider bg-temple-light/50 p-6">
          <ProjectHighlight variant="full" className="bg-white shadow-sm" />
        </div>
      )}
    </div>
  );
} 