'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import type { SiteSettings } from '@/lib/queries';
import { trackDonateButtonClick, trackWhatsAppClick } from '@/lib/analytics';

interface HeaderProps {
  settings: SiteSettings | null;
}

export default function Header({ settings }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Events', href: '/events' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Projects', href: '/projects' },
    { name: 'Donors', href: '/donors' },
  ];

  const getWhatsAppLink = () => {
    const message = encodeURIComponent("Namaste! I would like to get information about the temple.");
    return `https://wa.me/${settings?.contact?.whatsapp}?text=${message}`;
  };

  const NavLink = ({ name, href }: { name: string; href: string }) => (
    <Link
      href={href}
      className="text-temple-text hover:text-temple-primary transition-colors duration-300 font-sanskrit text-lg relative group"
      onClick={() => setIsMenuOpen(false)}
    >
      {name}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-temple-primary transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></span>
    </Link>
  );

  const WhatsAppLink = ({ isMobile = false }: { isMobile?: boolean }) => (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-temple-text hover:text-temple-primary transition-colors duration-300 font-sanskrit text-lg flex items-center gap-2 ${
        isMobile ? 'block py-3' : 'relative group'
      }`}
      onClick={() => {
        setIsMenuOpen(false);
        trackWhatsAppClick('general', isMobile ? 'mobile_header' : 'desktop_header');
      }}
    >
      <FontAwesomeIcon 
        icon={faWhatsapp as IconProp} 
        className="text-[#25D366] text-xl" 
      />
      <span className="relative">
        Contact
        {!isMobile && (
          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-temple-primary transform origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100"></span>
        )}
      </span>
    </a>
  );

  const DonateButton = ({ isMobile = false }: { isMobile?: boolean }) => (
    <a
      href="/donate"
      className={`bg-temple-primary text-white font-sanskrit hover:bg-temple-secondary transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${
        isMobile ? 'block mt-4 px-6 py-3 rounded-full text-center' : 'px-6 py-2 rounded-full'
      }`}
      onClick={() => {
        setIsMenuOpen(false);
        trackDonateButtonClick(isMobile ? 'mobile_header' : 'desktop_header');
      }}
    >
      Donate Now
    </a>
  );

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-temple-divider">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Image 
                src="/images/swamigaru.jpg" 
                alt={settings?.templeName || "Temple Logo"}
                width={48}
                height={48}
                className="rounded-full object-cover border-2 border-temple-gold"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-heading text-temple-primary tracking-wider">
                {settings?.templeName || "SPVBS Temple"}
              </span>
              <span className="text-sm text-temple-text/80 font-sanskrit">
                {settings?.location?.city || ""}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <NavLink key={item.name} {...item} />
            ))}
            <WhatsAppLink />
            <DonateButton />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-temple-primary p-2 hover:bg-temple-light rounded-lg transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-white rounded-2xl p-6 shadow-decorative border border-temple-divider flex flex-col space-y-4">
            {navigation.map((item) => (
              <NavLink key={item.name} {...item} />
            ))}
            <WhatsAppLink isMobile />
            <DonateButton isMobile />
          </div>
        )}
      </div>
    </nav>
  );
} 