export type Language = 'pt-BR' | 'en' | 'es';

export interface ServiceDetail {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  protocol?: string[];
  equipment?: string[];
  targetAudience: string;
  image: string;
}

export interface ClinicalTool {
  name: string;
  category: string;
  description: string;
  benefit: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  category: string;
  condition: string;
  outcome: string;
  quote: string;
  avatarInitials: string;
}

export interface BookingFormData {
  fullName: string;
  phone: string;
  email?: string;
  painLevel: number;
  mainComplaint: string;
  duration: string;
  recommendedService: string;
  preferredPeriod: 'morning' | 'afternoon' | 'any';
  preferredDate?: string;
  notes?: string;
}

export interface TriageQuestion {
  id: string;
  title: string;
  description?: string;
}

export interface Recommendation {
  serviceId: string;
  serviceTitle: string;
  badge: string;
  reason: string;
  firstStep: string;
}

