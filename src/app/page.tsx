import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { icons } from '@/lib/icons';
import ProjectHighlight from '@/components/ProjectHighlight';
import FaqAccordionWrapper from '@/components/FaqAccordionWrapper';
import { client } from '@/lib/sanity.client';
import { heroCarouselQuery, faqQuery } from '@/lib/queries';
import type { HeroCarousel } from '@/lib/queries';
import { PortableText } from '@portabletext/react';
import type { SiteSettings } from '@/types/site';
import { faEnvelope, faSyncAlt, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import HeroLCPHydrationHandoff from '@/components/HeroLCPHydrationHandoff';
import { getPageMetadata } from '@/lib/getPageMetadata';

export async function generateMetadata() {
  return getPageMetadata('/');
}

async function fetchHomeData() {
  const [heroData, siteSettings, faqs] = await Promise.all([
    client.fetch(heroCarouselQuery),
    client.fetch(`*[_type == "siteSettings"][0]`),
    client.fetch(faqQuery)
  ]);
  return { heroData, siteSettings, faqs };
}

function HomePageContent({
  heroData,
  faqs,
  templeInfo,
  annadanamInfo,
  eventsInfo,
  teachingsInfo,
  getInvolvedInfo,
}: {
  heroData: HeroCarousel;
  faqs: { question: string; answer: string; _id?: string }[];
  templeInfo?: SiteSettings['templeInfo'];
  annadanamInfo?: SiteSettings['annadanamInfo'];
  eventsInfo?: SiteSettings['eventsInfo'];
  teachingsInfo?: SiteSettings['teachingsInfo'];
  getInvolvedInfo?: SiteSettings['getInvolvedInfo'];
}) {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroLCPHydrationHandoff images={heroData.images} />

      {/* Sacred Initiative Section */}
      <section className="py-12 bg-temple-light">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <ProjectHighlight className="bg-white shadow-decorative rounded-xl" />
          </div>
        </div>
      </section>

      {/* Welcome Section with Temple Information */}
      <div className="bg-temple-light py-16 md:py-24 relative overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 bg-pattern opacity-5"></div>
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white/30 to-transparent"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Section Title with Decorative Elements */}
            <div className="text-center mb-16">
              <div className="inline-block">
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading text-temple-primary tracking-wider leading-tight relative">
                  <span className="block">Sri Veerabrahmendra Swami Temple, Atmakur, Nellore</span>
                </h1>
              </div>
            </div>

            {/* Content Container */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-10 md:p-14 shadow-xl relative overflow-hidden max-w-6xl mx-auto">
              {/* Decorative Corner Elements */}
              <div className="absolute top-0 left-0 w-24 h-24 border-l-4 border-t-4 border-temple-primary/30 rounded-tl-2xl"></div>
              <div className="absolute top-0 right-0 w-24 h-24 border-r-4 border-t-4 border-temple-primary/30 rounded-tr-2xl"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 border-l-4 border-b-4 border-temple-primary/30 rounded-bl-2xl"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 border-r-4 border-b-4 border-temple-primary/30 rounded-br-2xl"></div>

              {/* Main Content */}
              <div className="relative z-10">
                <div className="prose prose-base text-temple-text leading-normal text-left font-normal [&_p]:mb-4">
                  <div className="space-y-8">
                    {templeInfo && <PortableText value={templeInfo} />}
                  </div>
                </div>
              </div>
            </div>
            {/* CTA to Gallery */}
            <div className="flex justify-center mt-10">
              <a
                href="/gallery"
                className="w-full max-w-xl text-center bg-[#e32605] text-white text-xl md:text-2xl font-semibold rounded-lg py-4 transition-colors duration-200 hover:bg-[#c41f04] focus:outline-none focus:ring-4 focus:ring-[#FF4B26]/40"
                aria-label="Explore Temple Videos"
              >
                Explore Temple Videos
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-texture opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-heading text-center mb-6 text-temple-primary tracking-wider">Temple Services</h2>
          {annadanamInfo && (
            <div className="flex justify-center mb-12">
              <div className="relative bg-[#fff9ed] border-l-4 border-temple-primary shadow-xl rounded-2xl px-10 py-8 max-w-6xl mx-auto">
                <div className="prose prose-lg text-temple-text leading-normal [&_p]:mb-4">
                  <PortableText value={annadanamInfo} />
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Daily Rituals */}
            <div className="group transition hover:shadow-xl hover:-translate-y-2">
              <div className="bg-temple-light rounded-2xl p-8 shadow-decorative group-hover:shadow-hover transition-all duration-500 transform group-hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-temple-primary to-temple-accent transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100"></div>
                <div className="w-20 h-20 bg-temple-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-temple-accent transition-colors duration-300">
                  <FontAwesomeIcon icon={icons.pray as IconProp} className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-heading mb-4 text-temple-dark text-center">Daily Rituals</h3>
                <p className="text-temple-muted text-center">
                  Traditional pujas and archanas performed according to Vedic traditions
                </p>
              </div>
            </div>

            {/* Spiritual Teachings */}
            <div className="group transition hover:shadow-xl hover:-translate-y-2">
              <div className="bg-temple-light rounded-2xl p-8 shadow-decorative group-hover:shadow-hover transition-all duration-500 transform group-hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-temple-primary to-temple-accent transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100"></div>
                <div className="w-20 h-20 bg-temple-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-temple-accent transition-colors duration-300">
                  <FontAwesomeIcon icon={icons.om as IconProp} className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-heading mb-4 text-temple-dark text-center">Spiritual Teachings</h3>
                <p className="text-temple-muted text-center">
                  Learn about Sri Veera Brahmendra Swami&apos;s teachings and prophecies
                </p>
              </div>
            </div>

            {/* Special Events */}
            <div className="group transition hover:shadow-xl hover:-translate-y-2">
              <div className="bg-temple-light rounded-2xl p-8 shadow-decorative group-hover:shadow-hover transition-all duration-500 transform group-hover:-translate-y-2 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-temple-primary to-temple-accent transform origin-left transition-transform duration-500 scale-x-0 group-hover:scale-x-100"></div>
                <div className="w-20 h-20 bg-temple-primary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-temple-accent transition-colors duration-300">
                  <FontAwesomeIcon icon={icons.calendar as IconProp} className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-heading mb-4 text-temple-dark text-center">Special Events</h3>
                <p className="text-temple-muted text-center">
                  Festivals and ceremonies celebrating important occasions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events Section */}
      <div className="bg-temple-dark text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-heading text-center mb-4 text-temple-gold">Upcoming Events</h2>
          <p className="text-lg text-temple-gold/80 text-center mb-8">Join us for our vibrant festivals and spiritual gatherings.</p>
          {eventsInfo && (
            <div className="mb-12">
              <div className="relative bg-[#181716] border-l-4 border-temple-gold shadow-xl rounded-2xl px-10 py-8 max-w-6xl mx-auto">
                <div className="prose prose-lg text-temple-gold leading-normal [&_ul]:pl-8 [&_ul]:space-y-2 [&_li]:text-base [&_p]:mb-4">
                  <PortableText value={eventsInfo} />
                </div>
              </div>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Monthly Abhishekam */}
            <div className="relative bg-temple-overlay backdrop-blur-sm p-8 rounded-2xl border border-temple-gold/20 hover:border-temple-gold/50 transition-all duration-500 transform hover:-translate-y-2 max-w-6xl mx-auto">
              <div className="text-temple-gold text-4xl mb-4 flex justify-center">
                <FontAwesomeIcon icon={icons.pray as IconProp} className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-heading mb-3 text-temple-gold">Weekly Abhishekam</h3>
              <p className="font-sanskrit text-lg mb-2">Every Monday</p>
              <p className="text-white/80">Special prayers and offerings to Sri Veera Brahmendra Swami</p>
            </div>

            {/* Spiritual Discourse */}
            <div className="relative bg-temple-overlay backdrop-blur-sm p-8 rounded-2xl border border-temple-gold/20 hover:border-temple-gold/50 transition-all duration-500 transform hover:-translate-y-2 max-w-6xl mx-auto">
              <div className="text-temple-gold text-4xl mb-4 flex justify-center">
                <FontAwesomeIcon icon={icons.om as IconProp} className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-heading mb-3 text-temple-gold">Spiritual Discourse</h3>
              <p className="font-sanskrit text-lg mb-2">Every Saturday</p>
              <p className="text-white/80">Teachings from Kalagnanam and other sacred texts</p>
            </div>

            {/* Annual Festival */}
            <div className="relative bg-temple-overlay backdrop-blur-sm p-8 rounded-2xl border border-temple-gold/20 hover:border-temple-gold/50 transition-all duration-500 transform hover:-translate-y-2 max-w-6xl mx-auto">
              <div className="text-temple-gold text-4xl mb-4 flex justify-center">
                <FontAwesomeIcon icon={icons.star as IconProp} className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-heading mb-3 text-temple-gold">Annual Events</h3>
              <p className="font-sanskrit text-lg mb-2">View All Events</p>
              <a href="/events" className="text-white/80 hover:text-temple-gold transition-colors duration-300">
                Grand celebration with special pujas and cultural programs
              </a>
            </div>
          </div>
          {/* CTA to Events Page - Black & Gold Style */}
          <div className="flex justify-center mt-8">
            <a
              href="/events"
              className="w-fit flex items-center gap-3 bg-[#FFD600] text-black text-lg md:text-xl rounded-full px-8 py-3 transition-colors duration-200 hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-300"
              aria-label="Explore Events"
            >
              <FontAwesomeIcon icon={faCalendarAlt} className="w-6 h-6" />
              Explore Events
            </a>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-white py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-heading mb-6 text-temple-primary">Join Our Community</h2>
          {(teachingsInfo || getInvolvedInfo) && (
            <div className="relative bg-[#fff9ed] border-l-4 border-temple-primary shadow-xl rounded-2xl px-10 py-8 max-w-6xl mx-auto">
              <div className="prose prose-base prose-p:mb-2 text-temple-text leading-normal text-left font-normal">
                {teachingsInfo && <PortableText value={teachingsInfo} />}
                {getInvolvedInfo && <PortableText value={getInvolvedInfo} />}
              </div>
            </div>
          )}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-16">
            <a
              href="/donate"
              className="bg-temple-primary text-white px-8 py-4 rounded-full font-sanskrit hover:bg-temple-secondary transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg inline-flex items-center justify-center"
            >
              Support the Temple
              <FontAwesomeIcon icon={faSyncAlt} className="w-5 h-5 ml-2" />
            </a>
            <a
              href="/contact"
              className="bg-temple-primary text-white px-8 py-4 rounded-full font-sanskrit hover:bg-temple-secondary transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg inline-flex items-center justify-center"
            >
              Contact Us
              <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <hr className="my-16 border-t-4 border-temple-primary/80 rounded-full" />
      <section className="faq-section py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-heading text-temple-primary mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-6xl mx-auto">
            <FaqAccordionWrapper
              faqs={
                Array.isArray(faqs)
                  ? faqs.map((faq, idx) => {
                      const _id = typeof (faq as { _id?: string })._id === 'string' ? (faq as { _id: string })._id : `faq-${idx}`;
                      return {
                        _id,
                        question: faq.question,
                        answer: faq.answer,
                      };
                    })
                  : []
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default async function HomePage() {
  const { heroData, siteSettings, faqs } = await fetchHomeData();
  if (!heroData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <main>
          <div>Error loading data</div>
        </main>
      </div>
    );
  }

  // Build FAQ JSON-LD
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": (faqs as { question: string; answer: string }[]).map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <HomePageContent
        heroData={heroData}
        faqs={faqs}
        templeInfo={siteSettings?.templeInfo}
        annadanamInfo={siteSettings?.annadanamInfo}
        eventsInfo={siteSettings?.eventsInfo}
        teachingsInfo={siteSettings?.teachingsInfo}
        getInvolvedInfo={siteSettings?.getInvolvedInfo}
      />
    </>
  );
}
