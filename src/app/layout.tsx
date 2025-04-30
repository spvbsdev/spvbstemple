import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Cinzel_Decorative, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteSettings } from '@/lib/queries';

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
  const settings = await getSiteSettings();

  return (
    <html lang="en">
      <body className={`${inter.variable} ${cinzelDecorative.variable} ${notoSansDevanagari.variable} font-sans`}>
        <Header settings={settings} />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer settings={settings} />
      </body>
    </html>
  );
}
