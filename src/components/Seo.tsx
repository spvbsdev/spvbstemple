import Head from 'next/head';

interface SeoProps {
  keywords?: string;
  canonicalUrl?: string;
  children?: React.ReactNode;
}

export default function Seo({ keywords, canonicalUrl, children }: SeoProps) {
  return (
    <Head>
      {keywords && <meta name="keywords" content={keywords} />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      {children}
    </Head>
  );
} 