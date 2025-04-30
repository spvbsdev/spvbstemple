import { Metadata } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { icons } from '@/lib/icons';
import HeroCarouselComponent from '@/components/HeroCarousel';
import { getClient } from '@/lib/sanity.client';
import { heroCarouselQuery, type HeroCarousel as HeroCarouselType } from '@/lib/queries';
import { PortableText } from '@portabletext/react';
import ProjectHighlight from '@/components/ProjectHighlight';

export const metadata: Metadata = {
  title: 'SPVBS Temple | Home',
  description: 'Welcome to Sri Pothuluri Veera Brahmendra Swami Temple - A spiritual sanctuary dedicated to peace and wisdom',
};

export default async function Home() {
  try {
    const [heroData, siteSettings] = await Promise.all([
      getClient().fetch<HeroCarouselType>(heroCarouselQuery),
      getClient().fetch(`*[_type == "siteSettings"][0]{
        templeName,
        templeInfo
      }`)
    ]);

    if (!heroData?.images?.length) {
      console.log('No hero images found');
      return <div>Loading...</div>;
    }

    return (
      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroCarouselComponent images={heroData.images} />

        {/* Sacred Initiative Section */}
        <section className="py-12 bg-temple-light">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto">
              <ProjectHighlight className="bg-white shadow-decorative rounded-xl" />
            </div>
          </div>
        </section>

        {/* Welcome Section with Temple Information */}
        <div className="bg-temple-light py-16 md:py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading mb-8 text-temple-primary text-center font-bold">
                Welcome to Our Temple
              </h2>
              <div className="prose prose-lg max-w-none text-temple-text">
                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-soft">
                  <div className="prose prose-lg md:prose-xl prose-headings:text-temple-primary prose-headings:font-heading 
                                prose-p:text-temple-text prose-p:leading-relaxed md:prose-p:leading-loose
                                prose-p:mb-6 md:prose-p:mb-8
                                prose-strong:text-temple-primary prose-strong:font-medium
                                prose-em:text-temple-accent prose-em:font-normal
                                prose-li:text-temple-text prose-li:leading-relaxed">
                    <PortableText value={siteSettings?.templeInfo || []} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="py-20 bg-white relative">
          <div className="absolute inset-0 bg-texture opacity-5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl font-heading text-center mb-16 text-temple-primary">Temple Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Daily Rituals */}
              <div className="group">
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
              <div className="group">
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
              <div className="group">
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
            <h2 className="text-4xl font-heading text-center mb-16 text-temple-gold">Upcoming Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Monthly Abhishekam */}
              <div className="bg-temple-overlay backdrop-blur-sm p-8 rounded-2xl border border-temple-gold/20 hover:border-temple-gold/50 transition-all duration-500 transform hover:-translate-y-2">
                <div className="text-temple-gold text-4xl mb-4 flex justify-center">
                  <FontAwesomeIcon icon={icons.pray as IconProp} className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-heading mb-3 text-temple-gold">Monthly Abhishekam</h3>
                <p className="font-sanskrit text-lg mb-2">First Sunday of every month</p>
                <p className="text-white/80">Special prayers and offerings to Sri Veera Brahmendra Swami</p>
              </div>

              {/* Spiritual Discourse */}
              <div className="bg-temple-overlay backdrop-blur-sm p-8 rounded-2xl border border-temple-gold/20 hover:border-temple-gold/50 transition-all duration-500 transform hover:-translate-y-2">
                <div className="text-temple-gold text-4xl mb-4 flex justify-center">
                  <FontAwesomeIcon icon={icons.om as IconProp} className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-heading mb-3 text-temple-gold">Spiritual Discourse</h3>
                <p className="font-sanskrit text-lg mb-2">Every Saturday</p>
                <p className="text-white/80">Teachings from Kalagnanam and other sacred texts</p>
              </div>

              {/* Annual Festival */}
              <div className="bg-temple-overlay backdrop-blur-sm p-8 rounded-2xl border border-temple-gold/20 hover:border-temple-gold/50 transition-all duration-500 transform hover:-translate-y-2">
                <div className="text-temple-gold text-4xl mb-4 flex justify-center">
                  <FontAwesomeIcon icon={icons.star as IconProp} className="w-12 h-12" />
                </div>
                <h3 className="text-2xl font-heading mb-3 text-temple-gold">Annual Festival</h3>
                <p className="font-sanskrit text-lg mb-2">Coming Soon</p>
                <p className="text-white/80">Grand celebration with special pujas and cultural programs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-temple-light py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-5"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-4xl font-heading mb-6 text-temple-primary">Join Our Community</h2>
            <p className="text-xl text-temple-text mb-12 max-w-2xl mx-auto">
              Be part of our spiritual family and contribute to spreading Sri Veera Brahmendra Swami&apos;s message of peace and wisdom
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a
                href="/donate"
                className="bg-temple-primary text-white px-8 py-4 rounded-full font-sanskrit hover:bg-temple-secondary transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg inline-flex items-center"
              >
                Support the Temple
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </a>
              <a
                href="/contact"
                className="bg-transparent border-2 border-temple-primary text-temple-primary px-8 py-4 rounded-full font-sanskrit hover:bg-temple-primary hover:text-white transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching hero data:', error);
    return <div>Error loading data</div>;
  }
}
