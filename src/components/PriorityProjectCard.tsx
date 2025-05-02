'use client';

import { Project } from '@/types/project';
import { faCalendar, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useState } from 'react';

interface PriorityProjectCardProps {
  project: Project;
  isWide?: boolean;
}

export default function PriorityProjectCard({ project, isWide = false }: PriorityProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const progress = (project.raisedAmount || 0) / project.targetAmount * 100;
  const formattedProgress = progress.toFixed(1);

  return (
    <div className={`bg-white rounded-xl shadow-decorative p-6 ${isWide ? 'lg:max-w-4xl mx-auto' : ''}`}>
      <h3 className="text-2xl font-heading text-temple-primary mb-4">
        {project.title}
      </h3>
      
      <p className="text-temple-text mb-6">
        {project.description}
      </p>

      {/* Progress Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-temple-text font-medium">Progress</span>
          <span className="text-temple-primary font-medium">{formattedProgress}%</span>
        </div>
        <div className="h-2 bg-temple-light rounded-full overflow-hidden">
          <div 
            className="h-full bg-temple-primary rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-2 text-sm text-temple-text/80">
          <span>Raised: ₹{(project.raisedAmount || 0).toLocaleString()}</span>
          <span>Goal: ₹{project.targetAmount.toLocaleString()}</span>
        </div>
      </div>

      {/* Project Benefits */}
      <div className="mb-6">
        <h4 className="text-lg font-heading text-temple-primary mb-3">
          Project Benefits
        </h4>
        <ul className="space-y-2">
          {project.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start text-temple-text">
              <span className="text-temple-primary mr-2">•</span>
              {benefit}
            </li>
          ))}
        </ul>
      </div>

      {/* Timeline */}
      <div className="mb-6">
        <h4 className="text-lg font-heading text-temple-primary mb-3">
          Timeline
        </h4>
        <div className="flex items-center gap-2 text-temple-text">
          <FontAwesomeIcon icon={faCalendar as IconProp} className="text-temple-primary" />
          <span>Start: {project.timeline.startDate}</span>
        </div>
        {project.timeline.endDate && (
          <div className="flex items-center gap-2 text-temple-text mt-2">
            <FontAwesomeIcon icon={faCalendar as IconProp} className="text-temple-primary" />
            <span>Estimated Completion: {project.timeline.endDate}</span>
          </div>
        )}
      </div>

      {/* Contribute Button */}
      <a
        href="/donate"
        className="block w-full bg-temple-primary text-white text-center py-3 rounded-full font-sanskrit hover:bg-temple-secondary transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg mb-4"
      >
        Contribute Now
      </a>

      {/* Learn More Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-center w-full gap-2 text-temple-primary hover:text-temple-secondary transition-colors duration-300"
      >
        <span>{isExpanded ? 'Hide Project Details' : 'View Project Timeline and Details'}</span>
        <FontAwesomeIcon 
          icon={faChevronDown as IconProp} 
          className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-temple-divider">
          {project.timeline.milestones.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-heading text-temple-primary mb-3">
                Project Milestones
              </h4>
              <div className="space-y-4">
                {project.timeline.milestones.map((milestone, index) => (
                  <div key={index} className="border-l-2 border-temple-primary pl-4">
                    <h5 className="font-medium text-temple-primary">{milestone.title}</h5>
                    <p className="text-sm text-temple-text/80 mb-1">{milestone.date}</p>
                    <p className="text-temple-text">{milestone.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Donor Recognition Levels */}
          {project.donorRecognition && project.donorRecognition.length > 0 && (
            <div>
              <h4 className="text-lg font-heading text-temple-primary mb-3">
                Donor Recognition Levels
              </h4>
              <div className="grid gap-4">
                {project.donorRecognition.map((level, index) => (
                  <div key={index} className="bg-temple-light/50 rounded-lg p-4">
                    <h5 className="font-medium text-temple-primary mb-1">{level.level}</h5>
                    <p className="text-sm text-temple-text/80 mb-2">
                      Minimum Contribution: ₹{level.minAmount.toLocaleString()}
                    </p>
                    <p className="text-temple-text">{level.benefits}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 