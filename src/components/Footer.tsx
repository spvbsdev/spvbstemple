'use client';

import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faLocationDot, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import type { SiteSettings } from '@/lib/queries';

// Prevent Font Awesome from adding its CSS since we did it manually above
config.autoAddCss = false;

interface FooterProps {
  settings: SiteSettings | null;
}

export default function Footer({ settings }: FooterProps) {
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Events', href: '/events' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Projects', href: '/projects' },
    { name: 'Donors', href: '/donors' }
  ];

  // Function to generate WhatsApp link with phone number and pre-filled message
  const getWhatsAppLink = () => {
    const message = encodeURIComponent("Namaste! I would like to get information about the temple.");
    return `https://wa.me/${settings?.contact?.whatsapp}?text=${message}`;
  };

  const getGoogleMapsLink = () => {
    return 'https://www.google.com/maps/place/%E0%B0%B5%E0%B1%80%E0%B0%B0%E0%B0%AC%E0%B1%8D%E0%B0%B0%E0%B0%B9%E0%B1%8D%E0%B0%AE%E0%B1%87%E0%B0%82%E0%B0%A6%E0%B1%8D%E0%B0%B0+%E0%B0%B8%E0%B1%8D%E0%B0%B5%E0%B0%BE%E0%B0%AE%E0%B0%BF+%E0%B0%A6%E0%B1%87%E0%B0%B5%E0%B0%BE%E0%B0%B2%E0%B0%AF%E0%B0%82/@14.6355507,79.638358,17z/data=!4m6!3m5!1s0x3a4ca5747df49f59:0x1e1e0331c70aa7d0!8m2!3d14.6337404!4d79.6393008!16s%2Fg%2F11swc7fwvk';
  };

  return (
    <footer className="bg-temple-dark text-temple-light">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Temple Information */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-heading text-temple-gold mb-6">Location & Contact</h3>
            <div className="space-y-4 font-sanskrit text-lg">
              <div className="space-y-2">
                <div className="flex items-center md:justify-start justify-center gap-2">
                  <h4 className="text-lg text-temple-gold/90">Address</h4>
                  <a
                    href={getGoogleMapsLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-temple-gold hover:text-temple-gold/80 transition-colors duration-300"
                    title="Open in Google Maps"
                  >
                    <FontAwesomeIcon icon={faLocationDot as IconProp} className="text-xl" />
                  </a>
                </div>
                <div>
                  <p className="text-temple-light/90">{settings?.location?.address}</p>
                  <p className="text-temple-light/90">{settings?.location?.city}</p>
                  <p className="text-temple-light/90">{settings?.location?.state} - {settings?.location?.zipCode}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-lg text-temple-gold/90">Contact Details</h4>
                <div className="space-y-3">
                  <p className="text-temple-light/90">
                    <a 
                      href={getWhatsAppLink()} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 hover:text-temple-gold transition-colors duration-300"
                      title="Contact via WhatsApp"
                    >
                      <FontAwesomeIcon icon={faWhatsapp as IconProp} className="text-[#25D366] text-lg w-5" />
                      <span>{settings?.contact?.whatsapp}</span>
                    </a>
                  </p>
                  {settings?.contact?.primaryPhone && (
                    <div className="text-temple-light/90">
                      <p className="mb-1 text-temple-gold/90 text-sm">Temple Priest - Sri Mayabrahma Chari</p>
                      <a 
                        href={`tel:${settings.contact.primaryPhone}`}
                        className="inline-flex items-center gap-2 hover:text-temple-gold transition-colors duration-300"
                        title="Call our primary number"
                      >
                        <FontAwesomeIcon icon={faPhone as IconProp} className="text-temple-gold/90 text-lg w-5" />
                        <span>{settings.contact.primaryPhone}</span>
                      </a>
                    </div>
                  )}
                  {settings?.contact?.secondaryPhone && (
                    <p className="text-temple-light/90">
                      <a 
                        href={`tel:${settings.contact.secondaryPhone}`}
                        className="inline-flex items-center gap-2 hover:text-temple-gold transition-colors duration-300"
                        title="Call our secondary number"
                      >
                        <FontAwesomeIcon icon={faPhone as IconProp} className="text-temple-gold/90 text-lg w-5" />
                        <span>{settings.contact.secondaryPhone}</span>
                      </a>
                    </p>
                  )}
                  <p className="text-temple-light/90">
                    <a 
                      href={`mailto:${settings?.contact?.email}`} 
                      className="inline-flex items-center gap-2 hover:text-temple-gold transition-colors duration-300"
                      title="Email us"
                    >
                      <FontAwesomeIcon icon={faEnvelope as IconProp} className="text-temple-gold/90 text-lg w-5" />
                      <span>{settings?.contact?.email}</span>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-heading text-temple-gold mb-6">Quick Links</h3>
            <ul className="space-y-3 font-sanskrit">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-temple-light/90 hover:text-temple-gold transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Temple Hours */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-heading text-temple-gold mb-6">Temple Schedule</h3>
            <div className="space-y-4 font-sanskrit">
              <div>
                <h4 className="text-lg text-temple-gold/90 mb-2">Weekdays</h4>
                <div className="space-y-1">
                  {settings?.templeHours?.weekday?.split('Evening:').map((timing, index) => (
                    <p key={index} className="text-temple-light/90">
                      {index === 0 ? timing : `Evening:${timing}`}
                    </p>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg text-temple-gold/90 mb-2">Weekends</h4>
                <div className="space-y-1">
                  {settings?.templeHours?.weekend?.split('Evening:').map((timing, index) => (
                    <p key={index} className="text-temple-light/90">
                      {index === 0 ? timing : `Evening:${timing}`}
                    </p>
                  ))}
                </div>
              </div>

              {settings?.templeHours?.specialNote && (
                <p className="text-temple-light/70 mt-4 text-sm">
                  * {settings.templeHours.specialNote}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-temple-light/20 text-center">
          <p className="text-temple-light/70 font-sanskrit">
            © {new Date().getFullYear()} {settings?.templeName || "SPVBS Temple"}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 