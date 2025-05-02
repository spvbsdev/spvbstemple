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
      </head>
      <body className={`${inter.variable} ${cinzelDecorative.variable} ${notoSansDevanagari.variable} font-sans min-h-screen flex flex-col bg-temple-light`}>
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
