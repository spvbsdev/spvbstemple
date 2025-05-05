'use client';
import { useEffect } from 'react';

declare global {
  interface Window {
    dataLayer: unknown[];
    __eventQueue?: unknown[][];
  }
}

export default function MarTechDelayedLoader() {
  useEffect(() => {
    // Setup event queue
    window.dataLayer = window.dataLayer || [];
    window.__eventQueue = [];

    // Temporary gtag/dataLayer push
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as unknown as any).gtag = (...args: unknown[]) => {
      window.__eventQueue!.push(args);
    };

    // After 3 seconds, load GA and GTM
    const timeout = setTimeout(() => {
      // Load GA
      const gaScript = document.createElement('script');
      gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-3VG5RCYX1X';
      gaScript.async = true;
      document.head.appendChild(gaScript);

      gaScript.onload = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as unknown as any).gtag = (...args: unknown[]) => { window.dataLayer.push(args); };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as unknown as any).gtag('js', new Date());
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as unknown as any).gtag('config', 'G-3VG5RCYX1X');
        // Replay queued events
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        window.__eventQueue!.forEach(args => (window as unknown as any).gtag.apply(null, args));
        window.__eventQueue = [];
      };

      // Load GTM
      const gtmScript = document.createElement('script');
      gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=GT-PZX9J2QR';
      gtmScript.async = true;
      document.head.appendChild(gtmScript);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return null;
} 