'use client';
import { useEffect } from 'react';

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

    // Load after 3 seconds
    const timeout = setTimeout(loadGTM, 3000);

    // Also load after first user interaction
    window.addEventListener('scroll', loadGTM, { once: true });
    window.addEventListener('mousemove', loadGTM, { once: true });
    window.addEventListener('keydown', loadGTM, { once: true });
    window.addEventListener('touchstart', loadGTM, { once: true });

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('scroll', loadGTM);
      window.removeEventListener('mousemove', loadGTM);
      window.removeEventListener('keydown', loadGTM);
      window.removeEventListener('touchstart', loadGTM);
    };
  }, []);

  return null;
} 