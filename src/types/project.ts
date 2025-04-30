export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  status: 'planning' | 'in-progress' | 'completed';
  description: string;
  detailedDescription: unknown;
  imageUrl?: string;
  targetAmount: number;
  raisedAmount: number;
  benefits: string[];
  timeline: {
    startDate: string;
    estimatedCompletion: string;
    milestones: Array<{
      title: string;
      date: string;
      completed: boolean;
    }>;
  };
  donorRecognition: Array<{
    level: string;
    minAmount: number;
    benefits: string;
  }>;
  isHighPriority: boolean;
} 