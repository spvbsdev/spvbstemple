import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script';
import { Inter } from "next/font/google";
import { Cinzel_Decorative, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteSettings } from '@/lib/queries';
import type { SiteSettings } from '@/types/site';
import GTMDeferredLoader from '@/components/GTMDeferredLoader';

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

export const metadata: Metadata = {
  title: "SPVBS Temple",
  description: "Sri Pothuluri Veera Brahmendra Swami Temple",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings: SiteSettings | null = await getSiteSettings();

  return (
    <html lang="en">
      <head>
        {/* Canonical Tag */}
        <link rel="canonical" href="https://www.spvbstemple.org/" />
        {/* OpenGraph Meta Tags */}
        <meta property="og:title" content="Sri Veerabrahmendra Swami Temple, Atmakur" />
        <meta property="og:description" content="Discover Sri Veerabrahmendra Swami Temple in Atmakur, Nellore. Annadanam, events, timings, and visitor info." />
        <meta property="og:url" content="https://www.spvbstemple.org/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://www.spvbstemple.org/images/swamigaru.jpg" />
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sri Veerabrahmendra Swami Temple, Atmakur" />
        <meta name="twitter:description" content="Discover Sri Veerabrahmendra Swami Temple in Atmakur, Nellore. Annadanam, events, timings, and visitor info." />
        <meta name="twitter:image" content="https://www.spvbstemple.org/images/swamigaru.jpg" />
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
        <GTMDeferredLoader />
        <Header settings={settings} />
        <main className="flex-grow pt-16 md:pt-20">
          {children}
        </main>
        <Footer settings={settings} />
        <Analytics />
        <GoogleAnalytics gaId="G-3VG5RCYX1X" />
      </body>
    </html>
  );
}
