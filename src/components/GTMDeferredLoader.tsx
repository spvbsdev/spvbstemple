'use client';
import { useEffect } from 'react';

declare global {
  interface Window {
    gtmDidInit?: boolean;
  }
}

export default function GTMDeferredLoader() {
  useEffect(() => {
    const loadGTM = () => {
      if (window.gtmDidInit) return;
      window.gtmDidInit = true;
      const script = document.createElement('script');
      script.src = 'https://www.googletagmanager.com/gtm.js?id=G-3VG5RCYX1X'; // <-- Actual GTM ID
      script.async = true;
      document.head.appendChild(script);
    };

    // Only load after first user interaction
    const events = ['scroll', 'mousemove', 'keydown', 'touchstart', 'click'];
    events.forEach(event => window.addEventListener(event, loadGTM, { once: true }));

    return () => {
      events.forEach(event => window.removeEventListener(event, loadGTM));
    };
  }, []);

  return null;
} 