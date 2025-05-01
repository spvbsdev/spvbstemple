import { Metadata } from 'next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin, faPhone, faEnvelope, faLocationDot, faHome, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { getSiteSettings } from '@/lib/queries';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'SPVBS Temple | Contact',
  description: 'Get in touch with Sri Pothuluri Veera Brahmendra Swami Temple. Find our location, contact numbers, and ways to connect.',
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  if (!settings) {
    return <div>Loading...</div>;
  }

  const { location, contact } = settings;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${location.address}, ${location.city}, ${location.state} ${location.zipCode}`
  )}`;
  const whatsappLink = `https://wa.me/${contact.whatsapp}`;

  return (
    <div className="min-h-screen bg-temple-light py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm md:text-base">
            <li>
              <Link 
                href="/" 
                className="flex items-center text-temple-primary hover:text-temple-secondary transition-colors"
              >
                <FontAwesomeIcon icon={faHome as IconProp} className="w-4 h-4 mr-1" />
                Home
              </Link>
            </li>
            <li>
              <FontAwesomeIcon 
                icon={faChevronRight as IconProp} 
                className="w-3 h-3 text-temple-text"
              />
            </li>
            <li className="text-temple-text">Contact</li>
          </ol>
        </nav>

        <h1 className="text-4xl md:text-5xl font-heading text-temple-primary text-center mb-16">
          Contact Us
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-8">
            {/* Address Section */}
            <div className="bg-white rounded-xl p-6 shadow-decorative">
              <div className="flex items-start gap-4">
                <div className="text-2xl text-temple-primary">
                  <FontAwesomeIcon icon={faMapPin as IconProp} />
                </div>
                <div>
                  <h2 className="text-xl font-heading text-temple-primary mb-3">Address</h2>
                  <address className="not-italic text-temple-text space-y-1">
                    <p>{location.address}</p>
                    <p>{location.city}, {location.state} {location.zipCode}</p>
                  </address>
                </div>
              </div>
            </div>

            {/* Phone Numbers Section */}
            <div className="bg-white rounded-xl p-6 shadow-decorative">
              <div className="flex items-start gap-4">
                <div className="text-2xl text-temple-primary">
                  <FontAwesomeIcon icon={faPhone as IconProp} />
                </div>
                <div>
                  <h2 className="text-xl font-heading text-temple-primary mb-3">Phone Numbers</h2>
                  <div className="space-y-2">
                    <p className="text-temple-text">
                      Primary: <a href={`tel:${contact.primaryPhone}`} className="hover:text-temple-primary transition-colors">{contact.primaryPhone}</a>
                    </p>
                    {contact.secondaryPhone && (
                      <p className="text-temple-text">
                        Secondary: <a href={`tel:${contact.secondaryPhone}`} className="hover:text-temple-primary transition-colors">{contact.secondaryPhone}</a>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Email Section */}
            <div className="bg-white rounded-xl p-6 shadow-decorative">
              <div className="flex items-start gap-4">
                <div className="text-2xl text-temple-primary">
                  <FontAwesomeIcon icon={faEnvelope as IconProp} />
                </div>
                <div>
                  <h2 className="text-xl font-heading text-temple-primary mb-3">Email</h2>
                  <a 
                    href={`mailto:${contact.email}`}
                    className="text-temple-text hover:text-temple-primary transition-colors"
                  >
                    {contact.email}
                  </a>
                </div>
              </div>
            </div>

            {/* WhatsApp Section */}
            <div className="bg-white rounded-xl p-6 shadow-decorative">
              <div className="flex items-start gap-4">
                <div className="text-2xl text-[#25D366]">
                  <FontAwesomeIcon icon={faWhatsapp as IconProp} />
                </div>
                <div>
                  <h2 className="text-xl font-heading text-temple-primary mb-3">WhatsApp</h2>
                  <a 
                    href={whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-temple-text hover:text-[#25D366] transition-colors"
                  >
                    Connect on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Location Link Section */}
          <div className="bg-white rounded-xl p-6 shadow-decorative">
            <h2 className="text-xl font-heading text-temple-primary mb-4">Location</h2>
            <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
              <div className="text-6xl text-temple-primary animate-bounce">
                <FontAwesomeIcon icon={faLocationDot as IconProp} />
              </div>
              <div className="text-temple-text">
                <p className="mb-4">Find us on Google Maps</p>
                <a 
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-temple-primary text-white px-6 py-3 rounded-full hover:bg-temple-secondary transition-colors duration-300"
                >
                  <FontAwesomeIcon icon={faMapPin as IconProp} className="w-4 h-4" />
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 