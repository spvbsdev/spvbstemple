import { TypedObject } from '@portabletext/types';

export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  status: 'completed' | 'ongoing' | 'upcoming';
  description: string;
  detailedDescription?: TypedObject | TypedObject[];
  imageUrl?: string;
  /** All project images (for gallery); first is also imageUrl when present */
  projectImages?: Array<{ url: string; caption?: string }>;
  targetAmount: number;
  raisedAmount?: number;
  benefits: string[];
  timeline: {
    startDate: string;
    /** Legacy / alternate key from older content */
    endDate?: string;
    /** Sanity field name for estimated completion */
    estimatedCompletion?: string;
    milestones: Array<{
      title: string;
      date: string;
      completed?: boolean;
      description?: string;
    }>;
  };
  donorRecognition: Array<{
    level: string;
    minAmount: number;
    benefits: string;
  }>;
  isHighPriority: boolean;
  startDate?: string;
  endDate?: string;
  estimatedCost?: number;
} 