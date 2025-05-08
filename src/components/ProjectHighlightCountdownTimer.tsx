"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { useCountdown } from '@/hooks/useCountdown';
import { PROJECT_START_DATE } from '@/constants/project';

export default function CountdownTimer() {
  const timeLeft = useCountdown(PROJECT_START_DATE);
  return (
    <>
      <div className="flex items-center justify-center gap-2 text-temple-primary mb-2">
        <FontAwesomeIcon icon={faClock} className="w-4 h-4" />
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
    </>
  );
} 