'use client';
import Script from 'next/script';

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

export default function DeferredAnalytics() {
  return (
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=G-3VG5RCYX1X`}
      strategy="afterInteractive"
      onLoad={() => {
        window.dataLayer = window.dataLayer || [];
        window.gtag = (...args: unknown[]) => { window.dataLayer.push(args); };
        // @ts-expect-error: Google Analytics gtag expects variable arguments
        window.gtag('js', new Date());
        // @ts-expect-error: Google Analytics gtag expects variable arguments
        window.gtag('config', 'G-3VG5RCYX1X');
      }}
    />
  );
} 