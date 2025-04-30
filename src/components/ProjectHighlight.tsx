import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faCircleDot } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { format } from 'date-fns';

interface ProjectHighlightProps {
  variant?: 'full' | 'compact';
  className?: string;
}

const milestones = [
  {
    title: "Land Preparation & Foundation",
    date: "2025-07-01",
    completed: false,
    description: "Site clearing, ground preparation, and foundation work"
  },
  {
    title: "Main Structure Construction",
    date: "2025-11-01",
    completed: false,
    description: "Building walls, pillars, and roof structure"
  },
  {
    title: "Interior Work",
    date: "2026-03-01",
    completed: false,
    description: "Flooring, electrical, plumbing, and interior finishes"
  },
  {
    title: "Final Touches & Inauguration",
    date: "2026-07-01",
    completed: false,
    description: "Decorative elements, landscaping, and grand opening ceremony"
  }
];

export default function ProjectHighlight({ variant = 'compact', className = '' }: ProjectHighlightProps) {
  return (
    <div className={`bg-temple-gold/10 rounded-xl p-6 ${className}`}>      
      <h3 className="text-2xl font-heading text-temple-primary mb-3">
        Kalyana Mandapam Construction
      </h3>

      <p className="text-temple-text mb-6">
        Construction of a new Kalyana Mandapam to serve the community&apos;s wedding and cultural event needs.
      </p>
      
      {variant === 'full' && (
        <>
          <div className="mb-8">
            <h4 className="font-heading text-temple-primary mb-4">Project Milestones</h4>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-temple-primary/20"></div>
              
              {/* Milestones */}
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={index} className="relative flex items-start gap-4 pl-2">
                    <div className="relative z-10 flex-shrink-0 w-6 h-6 mt-1">
                      <FontAwesomeIcon 
                        icon={(milestone.completed ? faCircleCheck : faCircleDot) as IconProp}
                        className={milestone.completed ? "text-green-500" : "text-temple-primary"}
                      />
                    </div>
                    <div className="flex-grow bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-heading text-temple-primary">{milestone.title}</h5>
                        <span className="text-xs text-temple-muted">
                          {format(new Date(milestone.date), 'MMM yyyy')}
                        </span>
                      </div>
                      <p className="text-temple-text text-sm">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-heading text-temple-primary mb-2">Construction Phases</h4>
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4">
                <h5 className="font-heading text-temple-primary">Phase 1: Foundation</h5>
                <p className="text-temple-text text-sm">Ground preparation, foundation laying, and basic structure</p>
                <div className="mt-2 text-xs text-temple-muted">Timeline: 3-4 months</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h5 className="font-heading text-temple-primary">Phase 2: Main Structure</h5>
                <p className="text-temple-text text-sm">Walls, pillars, and traditional architectural elements</p>
                <div className="mt-2 text-xs text-temple-muted">Timeline: 4-5 months</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h5 className="font-heading text-temple-primary">Phase 3: Interior & Amenities</h5>
                <p className="text-temple-text text-sm">Flooring, electrical work, plumbing, and interior finishes</p>
                <div className="mt-2 text-xs text-temple-muted">Timeline: 3-4 months</div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <h5 className="font-heading text-temple-primary">Phase 4: Final Touches</h5>
                <p className="text-temple-text text-sm">Decorative elements, landscaping, and finishing work</p>
                <div className="mt-2 text-xs text-temple-muted">Timeline: 2-3 months</div>
              </div>
            </div>
          </div>
        </>
      )}
      
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-temple-text">Progress</span>
          <span className="text-temple-primary font-medium">3.5%</span>
        </div>
        <div className="w-full h-2 bg-white rounded-full overflow-hidden">
          <div 
            className="h-full bg-temple-primary rounded-full transition-all duration-500"
            style={{ width: '3.5%' }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className="text-temple-text">Raised: ₹3,50,000</span>
          <span className="text-temple-text">Goal: ₹1,00,00,000</span>
        </div>
      </div>

      <div className="space-y-3">
        <Link 
          href="/donate?project=kalyana-mandapam"
          className="block w-full bg-temple-primary text-white text-center py-3 rounded-lg font-sanskrit hover:bg-temple-secondary transition-colors duration-300"
        >
          Contribute Now
        </Link>
        <Link
          href="/projects#kalyana-mandapam"
          className="block w-full bg-white text-temple-primary text-center py-3 rounded-lg font-sanskrit hover:bg-temple-light transition-colors duration-300"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
} 