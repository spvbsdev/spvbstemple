import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';
import { Inter } from "next/font/google";
import { Cinzel_Decorative, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteSettings } from '@/lib/queries';
import type { SiteSettings } from '@/types/site';
import MarTechDelayedLoader from '@/components/MarTechDelayedLoader';

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const cinzelDecorative = Cinzel_Decorative({
  weight: ['400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-cinzel-decorative',
  display: 'swap',
});

const notoSansDevanagari = Noto_Sans_Devanagari({
  weight: ['400', '500', '600', '700'],
  subsets: ['devanagari'],
  variable: '--font-noto-sans-devanagari',
  display: 'swap',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings: SiteSettings | null = await getSiteSettings();

  return (
    <html lang="en">
      <head>
        {/* Essential meta tags for mobile and performance */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#fff9ed" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <style>{`
          /* === Critical CSS: Header, Carousel, Project Highlight === */
          header {
            background: #fff;
            backdrop-filter: blur(4px);
            border-bottom: 1px solid #E2E8F0;
            height: 80px;
            width: 100%;
            position: fixed;
            top: 0; left: 0; right: 0;
            z-index: 9999;
            display: flex;
            align-items: center;
          }
          @media (min-width: 768px) {
            header { height: 96px; }
          }
          .font-heading { font-family: var(--font-cinzel-decorative), serif; }
          .font-sanskrit, .font-devanagari { font-family: var(--font-noto-sans-devanagari), sans-serif; }
          .text-temple-primary { color: #E62200; }
          .bg-temple-primary { background: #E62200; }
          .bg-temple-light { background: #FFF5EB; }
          .bg-temple-gold { background: #FFD700; }
          .rounded-full { border-radius: 9999px; }
          .object-cover { object-fit: cover; }
          .border-temple-gold { border-color: #FFD700; }
          .shadow-lg { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
          .transition-colors { transition: color 0.2s, background 0.2s; }
          .transition-all { transition: all 0.3s; }
          .hover\:bg-temple-light:hover { background: #FFF5EB; }
          .hover\:bg-temple-secondary:hover { background: #A0522D; }
          .hover\:shadow-lg:hover { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.2); }
          .rounded-lg { border-radius: 0.5rem; }
          .rounded-xl { border-radius: 1rem; }

          /* Carousel */
          .carousel, .relative.w-full.aspect-\[4\/3\] {
            width: 100%;
            position: relative;
            aspect-ratio: 4/3;
            min-height: 300px;
            max-height: 750px;
            overflow: hidden;
          }
          @media (min-width: 768px) {
            .carousel, .relative.w-full.aspect-\[4\/3\] {
              aspect-ratio: 16/9;
              min-height: 500px;
              height: 65vh;
            }
          }
          .object-cover { object-fit: cover; }
          .absolute { position: absolute; }
          .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
          .transition-opacity { transition: opacity 0.7s; }
          .opacity-100 { opacity: 1; }
          .opacity-0 { opacity: 0; }
          .z-10 { z-index: 10; }
          .z-0 { z-index: 0; }
          .pointer-events-none { pointer-events: none; }

          /* Project Highlight */
          .bg-gradient-to-br {
            background: linear-gradient(135deg, #FFD7000D, #FFD7001A, #FFD7000D);
          }
          .rounded-xl { border-radius: 1rem; }
          .p-6 { padding: 1.5rem; }
          .text-2xl { font-size: 1.5rem; }
          .mb-3 { margin-bottom: 0.75rem; }
          .text-center { text-align: center; }
          .text-temple-primary { color: #E62200; }
          .mb-6 { margin-bottom: 1.5rem; }
          .block { display: block; }
          .w-full { width: 100%; }
          .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
          .rounded-lg { border-radius: 0.5rem; }
          .hover\:bg-temple-secondary:hover { background: #A0522D; }
          .transition-all { transition: all 0.3s; }
          .transform { transform: translateY(0); }
          .hover\:-translate-y-1:hover { transform: translateY(-0.25rem); }
          .hover\:shadow-lg:hover { box-shadow: 0 10px 15px -3px rgba(0,0,0,0.2); }

          /* === Desktop Menu Underline Animation === */
          .group .group-hover\:scale-x-100 {
            transform: scaleX(0);
            transform-origin: left;
            transition: transform 0.3s;
          }
          .group:hover .group-hover\:scale-x-100 {
            transform: scaleX(1);
          }
          .scale-x-0 { transform: scaleX(0); }
          .group-hover\:scale-x-100 { transform: scaleX(1); }
          .transition-transform { transition: transform 0.3s; }
          .duration-300 { transition-duration: 0.3s; }
          .bg-temple-primary { background: #E62200; }
          .absolute { position: absolute; }
          .bottom-0 { bottom: 0; }
          .left-0 { left: 0; }
          .w-full { width: 100%; }
          .h-0\.5 { height: 2px; }

          /* === Hamburger Icon (Mobile Menu Button) === */
          /* Only one of .top-0 or .top-[11px] (and .bottom-0 or .bottom-[11px]) should be applied at a time to avoid CSS override issues. */
          .w-6 { width: 1.5rem; }
          .h-6 { height: 1.5rem; }
          .relative { position: relative; }
          .absolute { position: absolute; }
          .left-0 { left: 0; }
          .top-0 { top: 0; }
          .top-\[11px\] { top: 11px; }
          .bottom-0 { bottom: 0; }
          .bottom-\[11px\] { bottom: 11px; }
          .h-0\.5 { height: 2px; }
          .w-full { width: 100%; }
          .bg-current { background-color: currentColor; }
          .transition-all { transition: all 0.3s; }
          .duration-300 { transition-duration: 0.3s; }
          .rotate-45 {
            --tw-rotate: 45deg;
            transform: rotate(var(--tw-rotate));
          }
          .-rotate-45 {
            --tw-rotate: -45deg;
            transform: rotate(var(--tw-rotate));
          }
          .opacity-0 { opacity: 0; }
          button[aria-label='Toggle menu'] .rotate-45 { transform: rotate(45deg) translateY(11px); }
          button[aria-label='Toggle menu'] .-rotate-45 { transform: rotate(-45deg) translateY(-11px); }
        `}</style>
        {/* Google Analytics Debug Mode */}
        <Script
          id="ga-debug"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-3VG5RCYX1X', {
                debug_mode: true,
                send_page_view: true
              });
            `,
          }}
        />
        {/* JSON-LD Structured Data for Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HinduTemple",
              "name": "Sri Veerabrahmendra Swami Temple",
              "url": "https://www.spvbstemple.org",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Bypass Road",
                "addressLocality": "Atmakur",
                "addressRegion": "Andhra Pradesh",
                "postalCode": "524322",
                "addressCountry": "IN"
              },
              "telephone": "+9197036605778",
              "email": "contact@spvbstemple.org",
              "description": "Sri Veerabrahmendra Swami Temple in Atmakur, SPSR Nellore, Andhra Pradesh, is a renowned Hindu temple known for Annadanam, spiritual events, and as a top place to visit in Nellore district. The temple is dedicated to Veerabrahmhendra Swami and is a spiritual destination for devotees and tourists alike.",
              "contactPoint": [
                {
                  "@type": "ContactPoint",
                  "telephone": "+9197036605778",
                  "contactType": "customer service"
                },
                {
                  "@type": "ContactPoint",
                  "telephone": "+919441875458",
                  "contactType": "Temple Priest",
                  "name": "Sri Mayabrahma Chari"
                },
                {
                  "@type": "ContactPoint",
                  "telephone": "+919492679770",
                  "contactType": "customer service"
                }
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.variable} ${cinzelDecorative.variable} ${notoSansDevanagari.variable} font-sans min-h-screen flex flex-col bg-temple-light`}>
        <MarTechDelayedLoader />
        <Header settings={settings} />
        <main className="flex-grow pt-16 md:pt-20">
          {children}
        </main>
        <Footer settings={settings} />
        <Analytics />
      </body>
    </html>
  );
}
