import CoreTeachings from '@/components/CoreTeachings';
import Image from 'next/image';
import FaqAccordionWrapper from '@/components/FaqAccordionWrapper';
import { client } from '@/lib/sanity.client';
import { faqQuery } from '@/lib/queries';
import { getPageMetadata } from '@/lib/getPageMetadata';

export async function generateMetadata() {
  return getPageMetadata('/about');
}

export default async function About() {
  const faqs = await client.fetch(faqQuery);
  return (
    <>
      <div className={`min-h-screen bg-temple-light `}>
        {/* Hero Section */}
        <div className="bg-temple-dark text-white py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="w-48 h-48 mx-auto mb-10">
              <Image 
                src="/images/swamigaru.jpg" 
                alt="Sri Pothuluri Veera Brahmendra Swami" 
                className="w-full h-full object-cover rounded-full border-4 border-temple-gold shadow-xl"
                width={192}
                height={192}
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
                Life & Teachings
              </h2>
              <div className="prose prose-lg md:prose-xl mx-auto text-temple-text space-y-8">
                <p className="leading-relaxed">
                  <strong>Sri Pothuluri Veera Brahmendra Swami</strong> lived from <strong>1608 to 1693</strong>. He was born on <strong>Kaartheeka Suddha Dwadasi</strong> and entered <strong>Jeeva Samadhi</strong> on <strong>Visakha Suddha Dasami</strong>. These dates are considered highly auspicious and mark the extraordinary spiritual journey of the Swami.
                </p>
                <p className="leading-relaxed">
                  Sri Pothuluri Veera Brahmendra Swami was born near the river Saraswati in Brahmandapuram village 
                  to Sri Paripurnayacharya and Srimati Prakruthamba of a Vishwakarma family. His early life took a 
                  significant turn when his parents dedicated him to Atri Mahamuni Ashram near Kashi (present-day Varanasi).
                </p>
                <p className="leading-relaxed">
                  He was later adopted by Veerabhojayacharya, the Head of the Papagni Mutt in Chikballapur, Karnataka, 
                  and his wife Prakruthamba, who named him &lsquo;VeeramBhotlaiah&rsquo;. Showing extraordinary spiritual inclination 
                  from childhood, he authored the Kalikamba Sapthashathi at the mere age of 11. Later, following his 
                  spiritual calling, he began his journey of enlightenment.
                </p>
                <p className="leading-relaxed">
                  His spiritual journey led him to many sacred places, including Hariharapuram where he performed penance. 
                  He spent about 20 years in Banaganapalli, Kurnool District, where he wrote his famous &ldquo;Kalagnanam&rdquo; while 
                  working as a cowherd. He later established his main spiritual seat at Kandimallayapalle, where he worked 
                  as a sculptor, carpenter, and blacksmith, embodying the Vishwakarma traditions while spreading spiritual 
                  knowledge to all, regardless of caste, creed, or religion.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Teachings Section */}
        <CoreTeachings />

        {/* Spiritual Practices & Disciples Section */}
        <div className="py-24 bg-temple-light/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-heading mb-12 text-temple-primary text-center">
                Spiritual Legacy & Disciples
              </h2>
              <div className="prose prose-lg md:prose-xl mx-auto text-temple-text space-y-8">
                <div className="mb-12">
                  <h3 className="text-3xl font-heading mb-6 text-temple-primary">
                    Universal Spirituality
                  </h3>
                  <p className="leading-relaxed">
                    Sri Veera Brahmendra Swami was a pioneer in promoting universal spirituality that transcended 
                    religious boundaries. During his time at Kandimallayapalle, he worked as an artisan while 
                    simultaneously imparting profound spiritual wisdom. His teachings emphasized direct experience 
                    of truth through meditation, selfless service, and inner transformation.
                  </p>
                  <p className="leading-relaxed">
                    He authored &ldquo;Jeevaikya Bodha&rdquo;, a spiritual text that remains preserved at his matam, 
                    which contains deep insights into self-realization and the unity of all existence. His practical 
                    approach to spirituality made complex Vedantic concepts accessible to common people, while his 
                    own life exemplified the perfect blend of karma (action) and bhakti (devotion).
                  </p>
                </div>

                <div className="mb-12">
                  <h3 className="text-3xl font-heading mb-6 text-temple-primary">
                    Notable Disciples
                  </h3>
                  <p className="leading-relaxed">
                    Breaking the rigid social barriers of his time, Sri Veera Brahmendra Swami chose disciples 
                    from diverse backgrounds, demonstrating that spiritual knowledge should be accessible to all. 
                    His two most prominent disciples were:
                  </p>
                  <div className="pl-6 space-y-6 mt-6">
                    <div>
                      <h4 className="text-xl font-heading text-temple-primary">Siddayya (Noorbasha)</h4>
                      <p className="leading-relaxed">
                        A Muslim disciple who became one of his closest followers. Through Siddyya, the Swami 
                        demonstrated that spiritual wisdom transcends religious boundaries. This relationship 
                        exemplified his message of universal brotherhood and religious harmony.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-xl font-heading text-temple-primary">Kakkayya</h4>
                      <p className="leading-relaxed">
                        From the harijan community, Kakkayya&apos;s acceptance as a primary disciple was revolutionary 
                        for that era. This choice emphasized the Swami&apos;s teaching that spiritual elevation depends 
                        on one&apos;s inner qualities rather than social status.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-3xl font-heading mb-6 text-temple-primary">
                    Interfaith Harmony
                  </h3>
                  <p className="leading-relaxed">
                    The Swami&apos;s influence extended to the Muslim rulers (Nawabs) of his time, whom he taught 
                    the essence of religious harmony and mutual respect. He explained spiritual scriptures to them 
                    and encouraged them to respect and protect all faiths. This interfaith dialogue was revolutionary 
                    for his time and remains relevant in today&apos;s world.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prophecies Section */}
        <div className="py-24 bg-temple-dark text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-heading mb-12 text-temple-gold text-center">
                Kalagnanam: Divine Prophecies
              </h2>
              <div className="prose prose-lg md:prose-xl mx-auto text-white/90 space-y-8">
                <p className="leading-relaxed">
                  Sri Veera Brahmendra Swami is renowned for his remarkable work &ldquo;Kalagnanam&rdquo;, which contains 
                  over 14,000 prophecies about future events. As a &ldquo;Kala Gnani&rdquo; (knower of time), his predictions 
                  have amazed scholars and devotees alike with their accuracy and continued relevance in modern times.
                </p>
                <p className="leading-relaxed">
                  Some of his notable prophecies include:
                </p>
                <ul className="pl-6 space-y-4 list-none">
                  <li>The emergence of women as powerful leaders ruling nations</li>
                  <li>Significant global climate events including droughts and famines</li>
                  <li>Democratic transformations where rulers would bow to public will</li>
                  <li>Divine manifestations at sacred temples:
                    <ul className="pl-6 mt-2 list-none">
                      <li>The Thiruvallur Veera Raghava Swamy idol showing signs of perspiration</li>
                      <li>Tears flowing from the Kanchi Kamakshi idol</li>
                      <li>Movement in the right hand of Lord Venkateswara at Tirupati</li>
                    </ul>
                  </li>
                  <li>Social transformations in religious institutions, including leadership changes at the Kanchi Kama Koti Peetam</li>
                </ul>
                <p className="leading-relaxed">
                  Most significantly, Sri Veera Brahmendra Swami prophesied his own return at the end of Kaliyuga as 
                  Sri Veera Bhoga Vasantha Rayalu, promising to protect righteous people during times of great change 
                  and transformation.
                </p>
              </div>
            </div>
          </div>
        </div>

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

        {/* Temple Information Section */}
        <div className="bg-temple-dark text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-heading mb-8 text-temple-gold">
              Visit Our Temple
            </h2>
            <p className="text-2xl text-white/90 mb-12 max-w-3xl mx-auto font-sanskrit leading-relaxed">
              Experience the divine presence and learn more about Sri Veera Brahmendra Swami&apos;s teachings
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

        {/* FAQ Section */}
        <section className="faq-section py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading text-temple-primary mb-8 text-center">Frequently Asked Questions</h2>
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
        </section>
      </div>
    </>
  );
} 