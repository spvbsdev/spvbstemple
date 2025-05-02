import { track } from '@vercel/analytics';

// Define allowed property value types for analytics
type AllowedPropertyValues = string | number | boolean | null;

// Define all possible event names
type EventNames = 
  | 'whatsapp_contact'
  | 'donation_started'
  | 'donation_completed'
  | 'donation_failed'
  | 'donate_button_click'
  | 'bank_details_copy'
  | 'contact_form_submission'
  | 'event_registration'
  | 'newsletter_signup'
  | 'whatsapp_click';

// Define base analytics properties
interface BaseAnalyticsProperties {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: AllowedPropertyValues | undefined;
}

// Define all possible event properties
interface EventProperties extends BaseAnalyticsProperties {
  amount?: number;
  currency?: string;
  contactType?: string;
  location?: string;
  errorMessage?: string;
  projectId?: string;
  detailType?: 'account_number' | 'ifsc' | 'beneficiary_name';
  category?: string;
  label?: string;
  eventName?: string;
}

// Type definitions for Google Analytics
declare global {
  interface Window {
    gtag: (
      command: 'event',
      action: string,
      params: BaseAnalyticsProperties
    ) => void;
  }
}

/**
 * Track a custom event with both Vercel Analytics and Google Analytics
 */
export const trackEvent = (
  eventName: EventNames | string,
  properties: EventProperties = {}
): void => {
  // Convert properties to analytics-compatible format
  const analyticsProperties: Record<string, AllowedPropertyValues> = {};
  
  // Only include non-undefined values
  Object.entries(properties).forEach(([key, value]) => {
    if (value !== undefined) {
      analyticsProperties[key] = value as AllowedPropertyValues;
    }
  });

  // Add derived properties
  const eventCategory = properties.category || properties.event_category;
  if (eventCategory) {
    analyticsProperties.event_category = eventCategory;
  }
  
  const eventLabel = properties.label || properties.event_label;
  if (eventLabel) {
    analyticsProperties.event_label = eventLabel;
  }

  // Track with Vercel Analytics
  track(eventName, analyticsProperties);

  // Track with Google Analytics 4
  if (typeof window !== 'undefined' && 'gtag' in window) {
    window.gtag('event', eventName, analyticsProperties);
  }
};

// WhatsApp contact tracking
export const trackWhatsAppContact = (contactType: string, location: string) => {
  trackEvent('whatsapp_contact', { 
    contactType, // e.g., 'general', 'donation', 'event'
    location // e.g., 'header', 'footer', 'contact_page'
  });
};

// Bank details copy tracking
export const trackBankDetailsCopy = (detailType: 'account_number' | 'ifsc' | 'beneficiary_name') => {
  trackEvent('bank_details_copy', { detailType });
};

// Donation tracking
export const trackDonationStarted = (amount: number, currency: string = 'INR', projectId?: string) => {
  trackEvent('donation_started', { amount, currency, projectId });
};

export const trackDonationCompleted = (amount: number, currency: string = 'INR', projectId?: string) => {
  trackEvent('donation_completed', { amount, currency, projectId });
};

export const trackDonationFailed = (amount: number, errorMessage: string, currency: string = 'INR', projectId?: string) => {
  trackEvent('donation_failed', { amount, currency, errorMessage, projectId });
};

export const trackContactForm = (category: string) => {
  trackEvent('contact_form_submission', { category });
};

export const trackEventRegistration = (eventName: string) => {
  trackEvent('event_registration', { eventName });
};

export const trackNewsletterSignup = () => {
  trackEvent('newsletter_signup');
};

export const trackDonateButtonClick = (location: string) => {
  trackEvent('donate_button_click', { location });
};

// WhatsApp click tracking
export const trackWhatsAppClick = (contactType: string, location: string) => {
  trackEvent('whatsapp_click', { 
    contactType, // e.g., 'general', 'additional_contact'
    location // e.g., 'header', 'footer', 'contact_page'
  });
}; 