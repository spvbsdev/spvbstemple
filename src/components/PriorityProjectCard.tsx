'use client';

import Image from 'next/image';
import { Project } from '@/types/project';
import { formatINRWithLabel } from '@/lib/formatINR';
import { faCalendar, faChevronDown, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { useState } from 'react';
import { format } from 'date-fns';

interface PriorityProjectCardProps {
  project: Project;
  isWide?: boolean;
}

function formatMilestoneDate(dateStr: string): string {
  try {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    return format(d, 'MMM yyyy');
  } catch {
    return dateStr;
  }
}

export default function PriorityProjectCard({ project, isWide = false }: PriorityProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const progress = (project.raisedAmount || 0) / project.targetAmount * 100;
  const formattedProgress = progress.toFixed(1);

  const milestones = project.timeline?.milestones ?? [];
  const completedMilestones = [...milestones]
    .filter((m) => m.completed === true)
    .sort((a, b) => {
      const ta = a.date ? new Date(a.date).getTime() : NaN;
      const tb = b.date ? new Date(b.date).getTime() : NaN;
      if (Number.isNaN(ta) || Number.isNaN(tb)) return 0;
      return ta - tb;
    });
  const galleryImages =
    project.projectImages?.filter((img): img is { url: string; caption?: string } => Boolean(img?.url)) ?? [];

  return (
    <div className={`bg-white rounded-xl shadow-decorative p-6 ${isWide ? 'lg:max-w-4xl mx-auto' : ''}`}>
      <h3 className="text-2xl font-heading text-temple-primary mb-4">{project.title}</h3>

      <p className="text-temple-text mb-6">{project.description}</p>

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
          <span>Raised: {formatINRWithLabel(project.raisedAmount)}</span>
          <span>Goal: {formatINRWithLabel(project.targetAmount)}</span>
        </div>
      </div>

      {/* Project Benefits */}
      <div className="mb-6">
        <h4 className="text-lg font-heading text-temple-primary mb-3">Project Benefits</h4>
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
        <h4 className="text-lg font-heading text-temple-primary mb-3">Timeline</h4>
        <div className="flex items-center gap-2 text-temple-text">
          <FontAwesomeIcon icon={faCalendar as IconProp} className="text-temple-primary shrink-0" />
          <span>Start: {project.timeline.startDate}</span>
        </div>
        {(project.timeline.estimatedCompletion ?? project.timeline.endDate) && (
          <div className="flex items-center gap-2 text-temple-text mt-2">
            <FontAwesomeIcon icon={faCalendar as IconProp} className="text-temple-primary shrink-0" />
            <span>
              Estimated Completion: {project.timeline.estimatedCompletion ?? project.timeline.endDate}
            </span>
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
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-center w-full gap-2 text-temple-primary hover:text-temple-secondary transition-colors duration-300"
      >
        <span>{isExpanded ? 'Hide Project Details' : 'View Project Details'}</span>
        <FontAwesomeIcon
          icon={faChevronDown as IconProp}
          className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Expanded: vertical milestone timeline + photo gallery */}
      {isExpanded && (
        <div className="mt-6 pt-6 border-t border-temple-divider space-y-10">
          {completedMilestones.length > 0 && (
            <div>
              <h4 className="text-lg font-heading text-temple-primary mb-6">Completed milestones</h4>
              <div className="relative pl-1 sm:pl-2">
                <div
                  className="absolute left-[15px] sm:left-[17px] top-3 bottom-3 w-px bg-gradient-to-b from-temple-primary/40 via-temple-primary/25 to-temple-primary/10"
                  aria-hidden
                />
                <ul className="space-y-0">
                  {completedMilestones.map((milestone, index) => (
                    <li key={index} className="relative flex gap-4 pb-10 last:pb-0">
                      <div
                        className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-white bg-white shadow-sm ring-2 ring-temple-primary/20"
                        aria-hidden
                      >
                        <FontAwesomeIcon
                          icon={faCircleCheck as IconProp}
                          className="text-green-600 text-lg"
                        />
                      </div>
                      <div className="min-w-0 flex-1 pt-0.5">
                        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                          <h5 className="font-heading text-temple-primary text-base">{milestone.title}</h5>
                          {milestone.date && (
                            <time
                              className="text-xs font-medium uppercase tracking-wide text-temple-muted shrink-0"
                              dateTime={milestone.date}
                            >
                              {formatMilestoneDate(milestone.date)}
                            </time>
                          )}
                        </div>
                        {milestone.description && (
                          <p className="mt-2 text-sm leading-relaxed text-temple-text">{milestone.description}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {galleryImages.length > 0 && (
            <div>
              <h4 className="text-lg font-heading text-temple-primary mb-4">Project photos</h4>
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                {galleryImages.map((img, index) => (
                  <figure
                    key={`${img.url}-${index}`}
                    className="group relative overflow-hidden rounded-xl border border-temple-divider/80 bg-temple-light/30 shadow-sm"
                  >
                    <div className="relative aspect-[4/3] w-full">
                      <Image
                        src={img.url}
                        alt={img.caption || `${project.title} — photo ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                    </div>
                    {img.caption && (
                      <figcaption className="border-t border-temple-divider/60 bg-white/95 px-2 py-2 text-center text-xs text-temple-text leading-snug">
                        {img.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </div>
          )}

          {project.donorRecognition && project.donorRecognition.length > 0 && (
            <div>
              <h4 className="text-lg font-heading text-temple-primary mb-3">Donor Recognition Levels</h4>
              <div className="grid gap-4 sm:grid-cols-2">
                {project.donorRecognition.map((level, index) => (
                  <div key={index} className="bg-temple-light/50 rounded-lg p-4">
                    <h5 className="font-medium text-temple-primary mb-1">{level.level}</h5>
                    <p className="text-sm text-temple-text/80 mb-2">
                      Minimum Contribution: {formatINRWithLabel(level.minAmount)}
                    </p>
                    <p className="text-temple-text text-sm">{level.benefits}</p>
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
