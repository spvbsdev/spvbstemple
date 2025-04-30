import CoreTeachings from '@/components/CoreTeachings';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SPVBS Temple | About',
  description: 'Learn about Sri Pothuluri Veera Brahmendra Swami Temple, our history, mission, and spiritual journey',
};

export default function About() {
  return (
    <div className="min-h-screen bg-temple-light">
      {/* Hero Section */}
      <div className="bg-temple-dark text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="w-48 h-48 mx-auto mb-10">
            <img 
              src="/images/swamigaru.jpg" 
              alt="Sri Pothuluri Veera Brahmendra Swami" 
              className="w-full h-full object-cover rounded-full border-4 border-temple-gold shadow-xl"
            />
          </div>
          <h1 className="text-5xl md:text-7xl font-heading mb-8 text-temple-gold">
            Sri Pothuluri Veera Brahmendra Swami
          </h1>
          <p className="text-2xl text-white/90 max-w-3xl mx-auto font-sanskrit leading-relaxed">
            The Great Saint, Yogi, and Prophet of Kaliyuga
          </p>
        </div>
      </div>

      {/* Life History Section */}
      <div className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-heading mb-12 text-temple-primary text-center">
              Life History
            </h2>
            <div className="prose prose-lg md:prose-xl mx-auto text-temple-text space-y-8">
              <p className="leading-relaxed">
                Sri Pothuluri Veera Brahmendra Swami, born in Kandimallayapalle, Kadapa District of Andhra Pradesh, 
                was a great saint and seer who lived during the 17th century. He is widely known for his remarkable 
                prophecies documented in the &ldquo;Kalagnanam&rdquo; and his teachings that continue to guide spiritual seekers.
              </p>
              <p className="leading-relaxed">
                From an early age, he showed extraordinary spiritual inclination and wisdom. Through intense meditation 
                and spiritual practices, he attained the highest state of enlightenment. His life was dedicated to 
                spreading spiritual knowledge and working for the welfare of society.
              </p>
              <p className="leading-relaxed">
                The saint traveled extensively across South India, establishing centers of learning and spirituality. 
                His teachings emphasized the importance of dharma, meditation, and service to humanity. He was known 
                for his profound understanding of the Vedas and his ability to explain complex spiritual concepts in 
                simple terms.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Core Teachings Section */}
      <CoreTeachings />

      {/* Legacy Section */}
      <div className="py-24 bg-temple-light/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-heading mb-12 text-temple-primary text-center">
              Living Legacy
            </h2>
            <div className="prose prose-lg md:prose-xl mx-auto text-temple-text space-y-8">
              <p className="leading-relaxed">
                Today, Sri Veera Brahmendra Swami&apos;s teachings continue to inspire millions. His prophecies, 
                documented in the Kalagnanam, are studied and referenced by scholars and spiritual seekers worldwide. 
                The accuracy of his predictions has amazed many and continues to be relevant in modern times.
              </p>
              <p className="leading-relaxed">
                Our temple serves as a center for preserving and propagating his teachings. We conduct regular 
                discourses on the Kalagnanam and his other works, helping devotees understand and apply his wisdom 
                in their daily lives. Through various spiritual and charitable activities, we strive to keep his 
                mission of social welfare and spiritual enlightenment alive.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-temple-dark text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-heading mb-8 text-temple-gold">
            Experience the Divine Presence
          </h2>
          <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-sanskrit leading-relaxed">
            Visit our temple to learn more about Sri Veera Brahmendra Swami&apos;s teachings and participate in daily rituals
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
            <a
              href="/services"
              className="bg-temple-gold text-temple-dark px-10 py-5 rounded-full font-sanskrit text-xl hover:bg-temple-light transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              View Temple Services
            </a>
            <a
              href="/contact"
              className="border-2 border-temple-gold text-temple-gold px-10 py-5 rounded-full font-sanskrit text-xl hover:bg-temple-gold hover:text-temple-dark transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 