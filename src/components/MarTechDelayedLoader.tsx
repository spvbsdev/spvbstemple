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
    if (process.env.NODE_ENV !== 'production') return;
    window.dataLayer = window.dataLayer || [];
    window.__eventQueue = [];
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag = (...args: unknown[]) => {
      window.__eventQueue!.push(args);
    };

    let loaded = false;
    const loadAnalytics = () => {
      if (loaded) return;
      loaded = true;
      // Load GA
      const gaScript = document.createElement('script');
      gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-3VG5RCYX1X';
      gaScript.async = true;
      document.head.appendChild(gaScript);
      gaScript.onload = () => {
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag = (...args: unknown[]) => { window.dataLayer.push(args); };
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('js', new Date());
        (window as unknown as { gtag: (...args: unknown[]) => void }).gtag('config', 'G-3VG5RCYX1X');
        window.__eventQueue!.forEach(args => (window as unknown as { gtag: (...args: unknown[]) => void }).gtag.apply(null, args));
        window.__eventQueue = [];
      };
      // Load GTM
      const gtmScript = document.createElement('script');
      gtmScript.src = 'https://www.googletagmanager.com/gtm.js?id=GT-PZX9J2QR';
      gtmScript.async = true;
      document.head.appendChild(gtmScript);
      removeListeners();
    };

    const timer = setTimeout(loadAnalytics, 5000);
    const removeListeners = () => {
      window.removeEventListener('scroll', loadAnalytics);
      window.removeEventListener('click', loadAnalytics);
      window.removeEventListener('keydown', loadAnalytics);
      window.removeEventListener('touchstart', loadAnalytics);
    };
    window.addEventListener('scroll', loadAnalytics, { once: true });
    window.addEventListener('click', loadAnalytics, { once: true });
    window.addEventListener('keydown', loadAnalytics, { once: true });
    window.addEventListener('touchstart', loadAnalytics, { once: true });

    return () => {
      clearTimeout(timer);
      removeListeners();
    };
  }, []);
  return null;
} 