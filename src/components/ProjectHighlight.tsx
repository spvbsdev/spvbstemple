'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCircleCheck, 
  faCircleDot, 
  faClock, 
  faHandHoldingHeart, 
  faUsers, 
  faBuildingColumns,
  faCircleExclamation 
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { format } from 'date-fns';
import { Card } from './ui/Card';
import { useCountdown } from '@/hooks/useCountdown';
import { 
  KALYANA_MANDAPAM_MILESTONES, 
  CONSTRUCTION_PHASES, 
  PROJECT_START_DATE,
  IMPACT_METRICS 
} from '@/constants/project';

interface ProjectHighlightProps {
  variant?: 'full' | 'compact';
  className?: string;
}

const iconMap = {
  faUsers,
  faBuildingColumns,
  faHandHoldingHeart
} as const;

export default function ProjectHighlight({ variant = 'compact', className = '' }: ProjectHighlightProps) {
  const timeLeft = useCountdown(PROJECT_START_DATE);

  return (
    <div className={`bg-gradient-to-br from-temple-gold/5 via-temple-gold/10 to-temple-gold/5 rounded-xl p-6 ${className}`}>      
      <div className="relative">
        {/* Urgency Icon */}
        <div className="absolute -top-3 md:-top-4 -left-3 md:left-4 bg-temple-primary text-white w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center shadow-lg" title="Urgent Need">
          <FontAwesomeIcon icon={faCircleExclamation as IconProp} className="w-4 h-4 md:w-5 md:h-5" />
        </div>

        <h3 className="text-2xl font-heading text-temple-primary mb-3 mt-3 md:mt-4 text-center">
          Kalyana Mandapam Construction
        </h3>

        <p className="text-temple-text mb-6 text-center">
          Construction of a new Kalyana Mandapam to serve the community&apos;s wedding and cultural event needs.
        </p>

        {/* Countdown Timer */}
        <Card className="p-4 mb-6">
          <div className="flex items-center justify-center gap-2 text-temple-primary mb-2">
            <FontAwesomeIcon icon={faClock as IconProp} className="w-4 h-4" />
            <span className="font-medium">Construction Begins In:</span>
          </div>
          <div className="flex justify-center gap-4 text-center">
            {[
              { value: timeLeft.days, label: 'Days' },
              { value: timeLeft.hours, label: 'Hours' },
              { value: timeLeft.minutes, label: 'Minutes' }
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="text-2xl font-bold text-temple-primary">{value}</div>
                <div className="text-xs text-temple-text">{label}</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Impact Section */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {IMPACT_METRICS.map(({ label, icon }) => (
            <div key={label} className="text-center">
              <Card className="p-3">
                <FontAwesomeIcon 
                  icon={iconMap[icon as keyof typeof iconMap] as IconProp} 
                  className="text-temple-primary text-xl mb-2" 
                />
                <div className="text-sm text-temple-text">{label}</div>
              </Card>
            </div>
          ))}
        </div>
      </div>
      
      {variant === 'full' && (
        <>
          <div className="mb-8">
            <h4 className="font-heading text-temple-primary mb-4">Project Milestones</h4>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-temple-primary/20"></div>
              
              {/* Milestones */}
              <div className="space-y-6">
                {KALYANA_MANDAPAM_MILESTONES.map((milestone, index) => (
                  <div key={index} className="relative flex items-start gap-4 pl-2">
                    <div className="relative z-10 flex-shrink-0 w-6 h-6 mt-1">
                      <FontAwesomeIcon 
                        icon={(milestone.completed ? faCircleCheck : faCircleDot) as IconProp}
                        className={milestone.completed ? "text-green-500" : "text-temple-primary"}
                      />
                    </div>
                    <Card className="flex-grow p-4 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-heading text-temple-primary">{milestone.title}</h5>
                        <span className="text-xs text-temple-muted">
                          {format(new Date(milestone.date), 'MMM yyyy')}
                        </span>
                      </div>
                      <p className="text-temple-text text-sm">{milestone.description}</p>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-heading text-temple-primary mb-2">Construction Phases</h4>
            <div className="space-y-4">
              {CONSTRUCTION_PHASES.map((phase) => (
                <Card key={phase.title} className="p-4">
                  <h5 className="font-heading text-temple-primary">{phase.title}</h5>
                  <p className="text-temple-text text-sm">{phase.description}</p>
                  <div className="mt-2 text-xs text-temple-muted">Timeline: {phase.timeline}</div>
                </Card>
              ))}
            </div>
          </div>
        </>
      )}
      
      {/* Progress Section */}
      <Card className="p-4 mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-temple-text font-medium">Fundraising Progress</span>
          <span className="text-temple-primary font-bold">3.5%</span>
        </div>
        <div className="w-full h-3 bg-white rounded-full overflow-hidden shadow-inner">
          <div 
            className="h-full bg-gradient-to-r from-temple-primary to-temple-accent rounded-full transition-all duration-500"
            style={{ width: '3.5%' }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <div>
            <span className="text-xs text-temple-text">Raised</span>
            <div className="text-temple-primary font-bold">₹3,50,000</div>
          </div>
          <div className="text-right">
            <span className="text-xs text-temple-text">Goal</span>
            <div className="text-temple-primary font-bold">₹1,00,00,000</div>
          </div>
        </div>
      </Card>

      {/* Call to Action Buttons */}
      <div className="space-y-3">
        <Link 
          href="/donate?project=kalyana-mandapam"
          className="block w-full bg-temple-primary text-white text-center py-4 rounded-lg font-sanskrit hover:bg-temple-secondary transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
        >
          Support This Project
        </Link>
        <Link
          href="/projects#kalyana-mandapam"
          className="block w-full bg-white text-temple-primary text-center py-3 rounded-lg font-sanskrit hover:bg-temple-light transition-all duration-300 border border-temple-gold/20"
        >
          View Kalyana Mandapam Project Details
        </Link>
      </div>

      {/* Donor Recognition */}
      <div className="mt-4 text-center">
        <p className="text-sm text-temple-text">
          All donors will be recognized on our temple&apos;s donor wall
        </p>
      </div>
    </div>
  );
} 