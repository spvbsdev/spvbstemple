import { track } from '@vercel/analytics';

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
  | 'newsletter_signup';

// Define all possible event properties
interface EventProperties {
  amount?: number;
  currency?: string;
  contactType?: string;
  location?: string;
  errorMessage?: string;
  projectId?: string;
  detailType?: 'account_number' | 'ifsc' | 'beneficiary_name';
  category?: string;
  eventName?: string;
  [key: string]: any;
}

/**
 * Track a custom event with both Vercel Analytics and Google Analytics
 */
export const trackEvent = (
  eventName: EventNames,
  properties?: EventProperties
) => {
  // Track with Vercel Analytics
  track(eventName, properties);

  // Track with Google Analytics 4
  if (typeof window !== 'undefined' && 'gtag' in window) {
    // @ts-expect-error - gtag is not typed
    window.gtag('event', eventName, properties);
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