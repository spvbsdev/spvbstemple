import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleCheck,
  faCircleDot,
  faHandHoldingHeart,
  faUsers,
  faBuildingColumns,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { format } from 'date-fns';
import { Card } from './ui/Card';
import {
  KALYANA_MANDAPAM_MILESTONES,
  CONSTRUCTION_PHASES,
  IMPACT_METRICS,
} from '@/constants/project';
import type { Project } from '@/types/project';
import { formatINRWithLabel } from '@/lib/formatINR';

interface ProjectHighlightProps {
  variant?: 'full' | 'compact';
  className?: string;
  /** When set (e.g. Kalyana Mandapam from Sanity), card matches /projects data. */
  project?: Project | null;
}

const iconMap = {
  faUsers,
  faBuildingColumns,
  faHandHoldingHeart,
} as const;

/** Shown only if no Sanity project document (e.g. local dev). */
const FALLBACK_RAISED = 350_000;
const FALLBACK_TARGET = 10_000_000;

/** Short status under the description — no countdown timer. */
function constructionStatusText(project: Project | null | undefined): string {
  const startRaw = project?.timeline?.startDate;
  if (startRaw) {
    const d = new Date(startRaw);
    const monthYear = format(d, 'MMMM yyyy');
    if (d.getTime() > Date.now()) {
      return `Groundbreaking is planned for ${monthYear}. Your support helps us prepare.`;
    }
    return `Construction began in ${monthYear}. Donations fund ongoing work and help us reach completion.`;
  }
  return 'Construction is underway. Your donations support the work still ahead.';
}

export default function ProjectHighlight({
  variant = 'compact',
  className = '',
  project,
}: ProjectHighlightProps) {
  const slug = project?.slug?.current ?? 'kalyana-mandapam';
  const title = project?.title ?? 'Kalyana Mandapam Construction';
  const description =
    project?.description ??
    "Construction of a new Kalyana Mandapam to serve the community's wedding and cultural event needs.";

  const raised = project?.raisedAmount ?? FALLBACK_RAISED;
  const target = project?.targetAmount ?? FALLBACK_TARGET;
  const progressPct = target > 0 ? Math.min(100, (raised / target) * 100) : 0;
  const formattedProgress = progressPct.toFixed(1);

  const sanityMilestones = project?.timeline?.milestones?.filter(Boolean) ?? [];
  const useSanityMilestones = sanityMilestones.length > 0;

  return (
    <div className={`bg-gradient-to-br from-temple-gold/5 via-temple-gold/10 to-temple-gold/5 rounded-xl p-6 ${className}`}>
      <div className="relative">
        <div
          className="absolute -top-3 md:-top-4 -left-3 md:left-4 bg-temple-primary text-white w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center md:shadow-lg"
          title="Urgent Need"
        >
          <FontAwesomeIcon icon={faCircleExclamation as IconProp} className="w-4 h-4 md:w-5 md:h-5" />
        </div>

        <h3 className="text-2xl font-heading text-temple-primary mb-3 mt-3 md:mt-4 text-center">{title}</h3>

        <p className="text-temple-text mb-6 text-center">{description}</p>

        <Card className="p-4 mb-6 border border-temple-gold/25 bg-white/70">
          <p className="text-sm text-temple-text text-center leading-relaxed">
            {constructionStatusText(project)}
          </p>
        </Card>

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
              <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-temple-primary/20"></div>

              <div className="space-y-6">
                {useSanityMilestones
                  ? sanityMilestones.map((milestone, index) => (
                      <div key={`${milestone.title}-${index}`} className="relative flex items-start gap-4 pl-2">
                        <div className="relative z-10 flex-shrink-0 w-6 h-6 mt-1">
                          <FontAwesomeIcon
                            icon={(milestone.completed ? faCircleCheck : faCircleDot) as IconProp}
                            className={milestone.completed ? 'text-green-500' : 'text-temple-primary'}
                          />
                        </div>
                        <Card className="flex-grow p-4 shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-heading text-temple-primary">{milestone.title}</h5>
                            {milestone.date ? (
                              <span className="text-xs text-temple-muted">
                                {format(new Date(milestone.date), 'MMM yyyy')}
                              </span>
                            ) : null}
                          </div>
                          {milestone.description && (
                            <p className="text-temple-text text-sm">{milestone.description}</p>
                          )}
                        </Card>
                      </div>
                    ))
                  : KALYANA_MANDAPAM_MILESTONES.map((milestone, index) => (
                      <div key={index} className="relative flex items-start gap-4 pl-2">
                        <div className="relative z-10 flex-shrink-0 w-6 h-6 mt-1">
                          <FontAwesomeIcon
                            icon={(milestone.completed ? faCircleCheck : faCircleDot) as IconProp}
                            className={milestone.completed ? 'text-green-500' : 'text-temple-primary'}
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

          {!project && (
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
          )}
        </>
      )}

      <Card className="p-4 mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-temple-text font-medium">Fundraising Progress</span>
          <span className="text-temple-primary font-bold">{formattedProgress}%</span>
        </div>
        <div className="w-full h-3 bg-white rounded-full overflow-hidden shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-temple-primary to-temple-accent rounded-full transition-all duration-500"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <div className="flex justify-between mt-2">
          <div>
            <span className="text-xs text-temple-text">Raised</span>
            <div className="text-temple-primary font-bold">{formatINRWithLabel(raised)}</div>
          </div>
          <div className="text-right">
            <span className="text-xs text-temple-text">Goal</span>
            <div className="text-temple-primary font-bold">{formatINRWithLabel(target)}</div>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        <Link
          href={`/donate?project=${slug}`}
          className="block w-full bg-temple-primary text-white text-center py-4 rounded-lg font-sanskrit hover:bg-temple-secondary transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
        >
          Support This Project
        </Link>
        <Link
          href={`/projects#${slug}`}
          className="block w-full bg-white text-temple-primary text-center py-3 rounded-lg font-sanskrit hover:bg-temple-light transition-all duration-300 border border-temple-gold/20"
        >
          View {title} Details
        </Link>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-temple-text">All donors will be recognized on our temple&apos;s donor wall</p>
      </div>
    </div>
  );
}
