'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { 
  faCalendarDay, 
  faPrayingHands, 
  faInfinity, 
  faStar, 
  faPhone
} from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import type { SiteSettings } from '@/types/site';
import { trackWhatsAppContact } from '@/lib/analytics';
import { useState, useEffect } from 'react';

interface DonationCategoriesProps {
  settings: SiteSettings | null;
}

const categories = [
  {
    title: "Palliki Seva & Anna Prasadam",
    amount: 10800,
    description: "Participate in Palliki Seva and offer Anna Prasadam for up to 300 devotees on any given Monday.",
    note: "Contact us on WhatsApp to book your slot",
    icon: faCalendarDay,
    hasWhatsApp: true
  },
  {
    title: "Lifetime Patron",
    amount: 100000,
    description: "Become a permanent patron. A Monday Palliki Seva and Anna Prasadam for up to 300 devotees will be performed in your name for lifetime.",
    icon: faInfinity,
    hasWhatsApp: true
  },
  {
    title: "Nithya Pooja",
    amount: 3116,
    description: "Lifetime Nithya Pooja will be performed on a day of your choice every year.",
    icon: faPrayingHands,
    hasWhatsApp: true
  }
];

const annualEvents = [
  "Swami Vari Jayanthi",
  "Swami Vari Aaradhana",
  "Shiva Ratri",
  "Navaratri"
];

// Add your exchangerate.host API key here if you have one
const EXCHANGE_RATE_API_KEY = process.env.NEXT_PUBLIC_EXCHANGERATE_HOST_KEY || '';

export default function DonationCategories({ settings }: DonationCategoriesProps) {
  const [userCurrency, setUserCurrency] = useState<string>('');
  const [exchangeRate, setExchangeRate] = useState<number | null>(null);
  const [currencyError, setCurrencyError] = useState(false);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        const currency = data.currency;
        if (currency && currency !== 'INR' && /^[A-Z]{3}$/.test(currency)) {
          setUserCurrency(currency);
          // 2. Fetch exchange rate
          let url = '';
          if (EXCHANGE_RATE_API_KEY) {
            url = `https://api.exchangerate.host/latest?base=INR&symbols=${currency}&api_key=${EXCHANGE_RATE_API_KEY}`;
          } else {
            url = `https://open.er-api.com/v6/latest/INR`;
          }
          fetch(url)
            .then(res => res.json())
            .then(rateData => {
              let rate = null;
              if (EXCHANGE_RATE_API_KEY) {
                // exchangerate.host format
                if (rateData && rateData.success && rateData.rates && rateData.rates[currency]) {
                  rate = rateData.rates[currency];
                }
              } else {
                // open.er-api.com format
                if (rateData && rateData.result === 'success' && rateData.rates && rateData.rates[currency]) {
                  rate = rateData.rates[currency];
                }
              }
              if (rate) {
                setExchangeRate(rate);
              } else {
                setCurrencyError(true);
              }
            })
            .catch(() => {
              setCurrencyError(true);
            });
        } else {
          setUserCurrency('INR');
        }
      })
      .catch(() => {
        setCurrencyError(true);
      });
  }, []);

  const formatINR = (amount: number) =>
    amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });

  const formatLocal = (amount: number) =>
    userCurrency && userCurrency !== 'INR'
      ? amount.toLocaleString(undefined, { style: 'currency', currency: userCurrency, minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : '';

  const getWhatsAppLink = () => {
    if (!settings?.contact?.whatsapp) return '#';
    const message = encodeURIComponent("Namaste! I would like to inquire about the Palliki Seva slot booking.");
    return `https://wa.me/${settings.contact.whatsapp}?text=${message}`;
  };

  const whatsappLink = getWhatsAppLink();

  return (
    <div className="space-y-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => (
          <div 
            key={index}
            className="bg-white rounded-xl shadow-decorative border border-temple-divider p-6 hover:border-temple-gold transition-all duration-300"
          >
            <div className="text-3xl text-temple-gold mb-4 flex justify-center">
              <FontAwesomeIcon icon={category.icon as IconProp} />
            </div>
            <h3 className="text-xl font-heading text-temple-primary text-center mb-2">
              {category.title}
            </h3>
            <p className="text-center font-sanskrit mb-4">
              <span className="block text-xl md:text-2xl text-temple-primary">{formatINR(category.amount)}</span>
              {userCurrency && userCurrency !== 'INR' && exchangeRate && !currencyError && (
                <span className="block text-base md:text-lg text-green-600">
                  ({formatLocal(category.amount * exchangeRate)})
                </span>
              )}
            </p>
            <p className="text-temple-text text-center mb-4">
              {category.description}
            </p>
            {category.hasWhatsApp && (
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-temple-primary hover:text-temple-secondary transition-colors duration-300"
                onClick={() => trackWhatsAppContact('donation', `donation_category_${category.title.toLowerCase().replace(/\s+/g, '_')}`)}
              >
                <FontAwesomeIcon icon={faWhatsapp as IconProp} className="text-[#25D366]" />
                <span>Contact for Details</span>
              </a>
            )}
          </div>
        ))}
      </div>

      {/* Annual Events Section */}
      <div className="bg-white rounded-xl shadow-decorative border border-temple-divider p-6">
        <div className="text-3xl text-temple-gold mb-4 flex justify-center">
          <FontAwesomeIcon icon={faStar as IconProp} />
        </div>
        <h3 className="text-xl font-heading text-temple-primary text-center mb-4">
          Annual Events
        </h3>
        <p className="text-temple-text text-center mb-6">
          Your donations are greatly appreciated for these annual events. Dates will be updated yearly.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {annualEvents.map((event, index) => (
            <div 
              key={index}
              className="bg-temple-light/50 rounded-lg p-4 text-center"
            >
              <p className="text-temple-primary font-sanskrit">{event}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-white rounded-xl shadow-decorative border border-temple-divider p-6">
        <h3 className="text-xl font-heading text-temple-primary text-center mb-4">
          Contact for Seva Bookings
        </h3>
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-temple-primary font-sanskrit text-lg mb-1">Temple Priest</p>
            <p className="text-temple-text font-medium">Brahma Sri. Mayabrahma Swami</p>
            {settings?.contact?.primaryPhone && (
              <a 
                href={`tel:${settings.contact.primaryPhone}`}
                className="inline-flex items-center gap-2 text-temple-primary hover:text-temple-secondary transition-colors duration-300 mt-2"
              >
                <FontAwesomeIcon icon={faPhone as IconProp} className="text-temple-primary" />
                <span>{settings.contact.primaryPhone}</span>
              </a>
            )}
          </div>
          <div className="text-center">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-temple-primary hover:text-temple-secondary transition-colors duration-300"
              onClick={() => trackWhatsAppContact('donation', 'seva_booking_section')}
            >
              <FontAwesomeIcon icon={faWhatsapp as IconProp} className="text-[#25D366]" />
              <span>Contact on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
} 