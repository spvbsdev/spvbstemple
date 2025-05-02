'use client';

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapPin, faPhone, faEnvelope, faLocationDot, faHome, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { getSiteSettings } from '@/lib/queries';
import { trackWhatsAppClick } from '@/lib/analytics';
import Link from 'next/link';
import type { SiteSettings } from '@/types/site';

export default function ContactPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSiteSettings();
        setSettings(data);
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  if (isLoading || !settings) {
    return <div>Loading...</div>;
  }

  const { location, contact } = settings;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${location.address}, ${location.city}, ${location.state} ${location.zipCode}`
  )}`;
  const whatsappLink = `https://wa.me/${contact.whatsapp}`;

  return (
    <div className="min-h-screen bg-temple-light pb-8">
      <div className="container mx-auto px-4 pt-24 md:pt-32">
        {/* Breadcrumb Navigation */}
        <nav className="mb-8">
          <ol className="flex items-center text-sm md:text-base">
            <li>
              <Link 
                href="/" 
                className="flex items-center text-temple-primary hover:text-temple-secondary transition-colors"
              >
                <FontAwesomeIcon icon={faHome as IconProp} className="w-4 h-4 mr-2" />
                Home
              </Link>
            </li>
            <li className="mx-3">
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
                  <div className="space-y-4">
                    <div>
                      <p className="text-temple-text mb-2">
                        Primary: <a href={`tel:${contact.primaryPhone}`} className="hover:text-temple-primary transition-colors">{contact.primaryPhone}</a>
                      </p>
                      {contact.secondaryPhone && (
                        <p className="text-temple-text">
                          Secondary: <a href={`tel:${contact.secondaryPhone}`} className="hover:text-temple-primary transition-colors">{contact.secondaryPhone}</a>
                        </p>
                      )}
                    </div>
                    
                    {/* Additional Contacts */}
                    {contact.additionalContacts && contact.additionalContacts.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-temple-divider">
                        <h3 className="text-lg font-heading text-temple-primary mb-4">Additional Contacts</h3>
                        <div className="space-y-6">
                          {contact.additionalContacts.map((person, index) => (
                            <div key={index} className="space-y-2">
                              <p className="font-medium text-temple-primary">{person.name}</p>
                              <p className="text-sm text-temple-text/80">{person.role}</p>
                              <div className="flex flex-col gap-2">
                                <a 
                                  href={`tel:${person.phone}`}
                                  className="text-temple-text hover:text-temple-primary transition-colors inline-flex items-center gap-2"
                                >
                                  <FontAwesomeIcon icon={faPhone as IconProp} className="w-4 h-4" />
                                  {person.phone}
                                </a>
                                {person.whatsapp && (
                                  <a 
                                    href={`https://wa.me/${person.whatsapp}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-temple-text hover:text-[#25D366] transition-colors inline-flex items-center gap-2"
                                    onClick={() => trackWhatsAppClick('additional_contact', 'contact_page')}
                                  >
                                    <FontAwesomeIcon icon={faWhatsapp as IconProp} className="w-4 h-4 text-[#25D366]" />
                                    WhatsApp
                                  </a>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
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
                    onClick={() => trackWhatsAppClick('general', 'contact_page')}
                  >
                    Connect on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Location Link Section */}
          <div className="bg-white rounded-xl p-6 shadow-decorative relative overflow-hidden group">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-75 transition-all duration-300 group-hover:opacity-85"
              style={{
                backgroundImage: "url('/images/temple-location-bg.jpg')",
                filter: "brightness(1.3) contrast(1.15) saturate(1.1)",
                transform: "scale(1.02)"
              }}
            />
            
            {/* Overlay gradient for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-white/30 to-transparent z-[1]" />
            
            {/* Content */}
            <div className="relative z-10">
              <h2 className="text-xl font-heading text-temple-primary mb-4 drop-shadow-sm">Location</h2>
              <div className="flex flex-col items-center justify-center text-center space-y-6 pt-4">
                <div className="text-6xl text-temple-primary drop-shadow-sm">
                  <FontAwesomeIcon icon={faLocationDot as IconProp} />
                </div>
                <div className="text-temple-text">
                  <p className="mb-4 font-medium text-lg drop-shadow-sm text-temple-primary">Find us on Google Maps</p>
                  <a 
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-temple-primary/95 backdrop-blur-sm text-white px-6 py-3 rounded-full hover:bg-temple-secondary transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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
    </div>
  );
} 