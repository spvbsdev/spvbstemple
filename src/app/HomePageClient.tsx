"use client";
import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import HeroLCPHydrationHandoff from '@/components/HeroLCPHydrationHandoff';
import ProjectHighlight from '@/components/ProjectHighlight';
import type { HeroCarousel } from '@/lib/queries';

const FaqAccordionWrapper = dynamic(() => import('@/components/FaqAccordionWrapper'), { ssr: false });

const DynamicBelowFoldSections = dynamic(async () => {
  const [siteSettings, faqs] = await Promise.all([
    (await import('@/lib/sanity.client')).client.fetch(`*[_type == "siteSettings"][0]`),
    (await import('@/lib/sanity.client')).client.fetch((await import('@/lib/queries')).faqQuery),
  ]);
  const { annadanamInfo, eventsInfo, teachingsInfo, getInvolvedInfo } = siteSettings || {};
  const PortableText = (await import('@portabletext/react')).PortableText;
  return function BelowFoldSections() {
    return (
      <>
        {/* Annadanam Section */}
        <section className="py-20 bg-white relative">
          <div className="absolute inset-0 bg-texture opacity-5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl font-heading text-center mb-6 text-temple-primary tracking-wider">Temple Services</h2>
            {annadanamInfo ? (
              <div className="flex justify-center mb-12">
                <div className="relative bg-[#fff9ed] border-l-4 border-temple-primary shadow-xl rounded-2xl px-10 py-8 max-w-6xl mx-auto">
                  <div className="prose prose-lg text-temple-text leading-normal [&_p]:mb-4">
                    <PortableText value={annadanamInfo} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-temple-muted mb-12">Loading Annadanam info...</div>
            )}
          </div>
        </section>

        {/* Events Section */}
        <div className="bg-temple-dark text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl font-heading text-center mb-4 text-temple-gold">Upcoming Events</h2>
            <p className="text-lg text-temple-gold/80 text-center mb-8">Join us for our vibrant festivals and spiritual gatherings.</p>
            {eventsInfo ? (
              <div className="mb-12">
                <div className="relative bg-[#181716] border-l-4 border-temple-gold shadow-xl rounded-2xl px-10 py-8 max-w-6xl mx-auto">
                  <div className="prose prose-lg text-temple-gold leading-normal [&_ul]:pl-8 [&_ul]:space-y-2 [&_li]:text-base [&_p]:mb-4">
                    <PortableText value={eventsInfo} />
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-temple-gold/80 mb-12">Loading events info...</div>
            )}
          </div>
        </div>

        {/* Teachings & Get Involved Section */}
        <div className="bg-white py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl font-heading mb-6 text-temple-primary">Join Our Community</h2>
            {(teachingsInfo || getInvolvedInfo) ? (
              <div className="relative bg-[#fff9ed] border-l-4 border-temple-primary shadow-xl rounded-2xl px-10 py-8 max-w-6xl mx-auto">
                <div className="prose prose-base prose-p:mb-2 text-temple-text leading-normal text-left font-normal">
                  {teachingsInfo && <PortableText value={teachingsInfo} />}
                  {getInvolvedInfo && <PortableText value={getInvolvedInfo} />}
                </div>
              </div>
            ) : (
              <div className="text-center text-temple-muted mb-12">Loading community info...</div>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <hr className="my-16 border-t-4 border-temple-primary/80 rounded-full" />
        <section className="faq-section py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading text-temple-primary mb-8 text-center">Frequently Asked Questions</h2>
            <div className="max-w-6xl mx-auto">
              <FaqAccordionWrapper faqs={faqs} />
            </div>
          </div>
        </section>
      </>
    );
  };
}, { ssr: false });

export default function HomePageClient({ heroData }: { heroData: HeroCarousel }) {
  const [belowFoldVisible, setBelowFoldVisible] = useState(false);
  const belowFoldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (belowFoldVisible) return; // Prevent re-observing after loaded
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBelowFoldVisible(true);
          observer.disconnect(); // Stop observing after first load
        }
      },
      { threshold: 0.1 }
    );
    if (belowFoldRef.current) observer.observe(belowFoldRef.current);
    return () => observer.disconnect();
  }, [belowFoldVisible]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroLCPHydrationHandoff images={heroData.images} />
      {/* Project Highlight Section */}
      <section className="py-12 bg-temple-light">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <ProjectHighlight className="bg-white shadow-decorative rounded-xl" />
          </div>
        </div>
      </section>
      {/* Below-the-fold placeholder and dynamic content */}
      <div ref={belowFoldRef} />
      {belowFoldVisible ? (
        <DynamicBelowFoldSections />
      ) : (
        <div style={{ minHeight: 600 }} />
      )}
    </div>
  );
} 