import { groq } from 'next-sanity';
import { client } from '@/lib/sanity.client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faOm, faStar, faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import ProjectHighlight from '@/components/ProjectHighlight';

export const metadata = {
  title: "Temple Services & Annadanam | Veerabrahmendra Swami Temple",
  description: "Explore Annadanam, daily rituals, and special services at Veerabrahmendra Swami Temple, Atmakur.",
  keywords: "services, annadanam, rituals, temple, veerabrahmendra, atmakur, nellore, bramhamgari temple"
};

const servicesQuery = groq`
  *[_type == "templeService" && isActive == true] | order(order asc) {
    _id,
    name,
    type,
    description,
    timing,
    date,
    significance,
    offerings,
    specialInstructions
  }
`;

interface TempleService {
  _id: string;
  name: string;
  type: 'daily' | 'annual' | 'special';
  description: string;
  timing: string;
  date?: string;
  significance?: string;
  offerings?: string[];
  specialInstructions?: string;
}

export const revalidate = 60; // Revalidate every minute

function ServiceCard({ service }: { service: TempleService }) {
  return (
    <div className="bg-white rounded-xl shadow-decorative border border-temple-divider p-6 hover:border-temple-gold transition-all duration-300">
      <div className="flex items-start gap-4">
        <div className="text-3xl text-temple-gold">
          <FontAwesomeIcon 
            icon={(
              service.type === 'daily' ? faOm :
              service.type === 'annual' ? faCalendarDays :
              faStar
            ) as IconProp} 
          />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-heading text-temple-primary mb-2">{service.name}</h3>
          <p className="text-temple-text mb-4">{service.description}</p>
          
          <div className="space-y-3">
            <div>
              <strong className="text-temple-primary">Timing:</strong>
              <span className="ml-2 text-temple-text">{service.timing}</span>
            </div>
            
            {service.date && (
              <div>
                <strong className="text-temple-primary">Date:</strong>
                <span className="ml-2 text-temple-text">{service.date}</span>
              </div>
            )}

            {service.significance && (
              <div>
                <strong className="text-temple-primary">Significance:</strong>
                <p className="mt-1 text-temple-text">{service.significance}</p>
              </div>
            )}

            {service.offerings && service.offerings.length > 0 && (
              <div>
                <strong className="text-temple-primary">Offerings:</strong>
                <ul className="mt-1 list-disc list-inside text-temple-text">
                  {service.offerings.map((offering, index) => (
                    <li key={index}>{offering}</li>
                  ))}
                </ul>
              </div>
            )}

            {service.specialInstructions && (
              <div>
                <strong className="text-temple-primary">Special Instructions:</strong>
                <p className="mt-1 text-temple-text">{service.specialInstructions}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function ServicesPage() {
  const services = await client.fetch<TempleService[]>(servicesQuery);
  
  const dailyServices = services.filter(s => s.type === 'daily');
  const annualServices = services.filter(s => s.type === 'annual');
  const specialServices = services.filter(s => s.type === 'special');

  return (
    <div className="min-h-screen bg-temple-light py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-heading text-temple-primary text-center mb-16">
          Temple Services
        </h1>

        {/* Daily Services Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-heading text-temple-primary mb-8">
            Daily Services
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {dailyServices.map(service => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        </section>

        {/* Annual Festivals Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-heading text-temple-primary mb-8">
            Annual Festivals
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {annualServices.map(service => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <a 
              href="/events" 
              className="inline-flex items-center gap-2 text-temple-primary hover:text-temple-secondary transition-colors duration-300 font-sanskrit text-lg"
            >
              <FontAwesomeIcon icon={faCalendarDays as IconProp} className="w-5 h-5" />
              View All Annual Events and Festival Details
            </a>
          </div>
        </section>

        {/* Special Services Section */}
        {specialServices.length > 0 && (
          <section>
            <h2 className="text-3xl font-heading text-temple-primary mb-8">
              Special Services
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {specialServices.map(service => (
                <ServiceCard key={service._id} service={service} />
              ))}
            </div>
          </section>
        )}

        {/* Kalyana Mandapam Campaign */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-heading text-temple-primary text-center mb-8">
              Upcoming Facility
            </h2>
            <ProjectHighlight variant="full" className="max-w-4xl mx-auto" />
          </div>
        </section>
      </div>
    </div>
  );
} 