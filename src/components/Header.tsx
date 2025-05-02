'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import type { SiteSettings } from '@/types/site';
import { trackDonateButtonClick, trackWhatsAppClick } from '@/lib/analytics';

interface HeaderProps {
  settings: SiteSettings | null;
}

export default function Header({ settings }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Add effect to handle body scroll
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

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

  const MobileNavLink = ({ name, href }: { name: string; href: string }) => (
    <Link
      href={href}
      className="block w-full text-center py-2.5 text-lg font-sanskrit text-temple-text hover:text-temple-primary hover:bg-temple-light/50 transition-all duration-300 rounded-lg"
      onClick={() => setIsMenuOpen(false)}
    >
      {name}
    </Link>
  );

  const WhatsAppLink = ({ isMobile = false }: { isMobile?: boolean }) => (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className={`text-temple-text hover:text-temple-primary transition-colors duration-300 font-sanskrit text-lg flex items-center gap-2 ${
        isMobile ? 'justify-center py-2.5 text-lg hover:bg-temple-light/50 rounded-lg' : 'relative group'
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
        isMobile ? 'block w-full text-center px-6 py-2.5 rounded-lg text-lg' : 'px-6 py-2 rounded-full'
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
    <>
      <header className="fixed top-0 left-0 right-0 z-[9999] bg-white/95 backdrop-blur-sm border-b border-temple-divider h-20 md:h-24 w-full">
        <div className="container mx-auto px-4 h-full flex items-center justify-between">
          <div className="flex items-center justify-between w-full">
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
                <span className="text-base md:text-lg font-heading text-temple-primary tracking-wider leading-tight">
                  Sri Veerabrahmendra
                </span>
                <span className="text-base md:text-lg font-heading text-temple-primary tracking-wider leading-tight">
                  Swami Temple
                </span>
                <span className="text-xs text-temple-text/80 font-sanskrit">
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
              <div className="w-6 h-6 relative">
                <span className={`absolute left-0 top-0 w-full h-0.5 bg-current transform transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 top-[11px]' : ''
                }`} />
                <span className={`absolute left-0 top-[11px] w-full h-0.5 bg-current transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`} />
                <span className={`absolute left-0 bottom-0 w-full h-0.5 bg-current transform transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 bottom-[11px]' : ''
                }`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998]">
          <div 
            className="fixed inset-x-0 top-20 bottom-0 bg-white shadow-lg"
          >
            <div className="container mx-auto max-w-lg px-4 py-6 space-y-2">
              {navigation.map((item) => (
                <MobileNavLink key={item.name} {...item} />
              ))}
              <div className="pt-2">
                <WhatsAppLink isMobile />
              </div>
              <div className="pt-2">
                <DonateButton isMobile />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 