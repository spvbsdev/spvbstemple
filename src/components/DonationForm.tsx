'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useSettings } from '@/lib/hooks';
import { trackWhatsAppContact, trackBankDetailsCopy } from '@/lib/analytics';

interface DonationFormProps {
  projectId?: string;
}

const BANK_DETAILS = {
  account_number: '3757020206123',
  ifsc: 'SBIN0021921',
  beneficiary_name: 'Sri Pothuluri Veerabrahmendra Swamivari Devasthanam Trust',
  bank_name: 'State Bank of India',
  branch_name: 'Atmakur'
};

export default function DonationForm({ projectId }: DonationFormProps) {
  const [copied, setCopied] = useState('');
  const { settings } = useSettings();

  const copyToClipboard = (text: string, field: 'account_number' | 'ifsc' | 'beneficiary_name') => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    trackBankDetailsCopy(field);
    setTimeout(() => setCopied(''), 2000);
  };

  const getWhatsAppMessage = () => {
    const message = encodeURIComponent(
      `Hello, I would like to make a donation to Sri Pothuluri Veerabrahmendra Swamivari Temple.${
        projectId ? ` For project: ${projectId}` : ''
      }`
    );
    return `https://wa.me/${settings?.contact?.whatsapp}?text=${message}`;
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppContact('donation', `donation_form${projectId ? '_project' : ''}`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-temple-light p-6 rounded-lg">
        <h3 className="text-xl font-medium text-temple-primary mb-6">Bank Transfer Details</h3>
        
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <div className="flex-grow">
              <p className="text-sm font-medium text-temple-text mb-2">Account Number</p>
              <p className="text-xl text-red-600 select-all">{BANK_DETAILS.account_number}</p>
            </div>
            <button
              onClick={() => copyToClipboard(BANK_DETAILS.account_number, 'account_number')}
              className="text-temple-primary hover:text-temple-secondary p-2"
              aria-label="Copy account number"
            >
              <FontAwesomeIcon icon={faCopy} className="w-5 h-5" />
              {copied === 'account_number' && <span className="ml-2 text-sm">Copied!</span>}
            </button>
          </div>

          <div className="flex justify-between items-start">
            <div className="flex-grow">
              <p className="text-sm font-medium text-temple-text mb-2">IFSC Code</p>
              <p className="text-xl text-red-600 select-all">{BANK_DETAILS.ifsc}</p>
            </div>
            <button
              onClick={() => copyToClipboard(BANK_DETAILS.ifsc, 'ifsc')}
              className="text-temple-primary hover:text-temple-secondary p-2"
              aria-label="Copy IFSC code"
            >
              <FontAwesomeIcon icon={faCopy} className="w-5 h-5" />
              {copied === 'ifsc' && <span className="ml-2 text-sm">Copied!</span>}
            </button>
          </div>

          <div className="flex justify-between items-start">
            <div className="flex-grow">
              <p className="text-sm font-medium text-temple-text mb-2">Beneficiary Name</p>
              <p className="text-xl text-red-600 select-all">{BANK_DETAILS.beneficiary_name}</p>
            </div>
            <button
              onClick={() => copyToClipboard(BANK_DETAILS.beneficiary_name, 'beneficiary_name')}
              className="text-temple-primary hover:text-temple-secondary p-2"
              aria-label="Copy beneficiary name"
            >
              <FontAwesomeIcon icon={faCopy} className="w-5 h-5" />
              {copied === 'beneficiary_name' && <span className="ml-2 text-sm">Copied!</span>}
            </button>
          </div>

          <div>
            <p className="text-sm font-medium text-temple-text mb-2">Bank & Branch</p>
            <p className="text-xl text-red-600">{BANK_DETAILS.bank_name}, {BANK_DETAILS.branch_name}</p>
          </div>
        </div>
      </div>

      <div className="text-center">
        <p className="text-temple-text mb-4">- OR -</p>
        <a
          href={getWhatsAppMessage()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full bg-[#25D366] text-white py-3 rounded-lg font-sanskrit hover:bg-[#128C7E] transition-colors duration-300"
          onClick={handleWhatsAppClick}
        >
          <FontAwesomeIcon icon={faWhatsapp} className="w-5 h-5" />
          Contact via WhatsApp
        </a>
      </div>

      <div className="text-sm text-temple-text text-center space-y-2">
        <p>After making the transfer, please contact us on WhatsApp for confirmation.</p>
        <p>We will send you the receipt and donation acknowledgment.</p>
      </div>
    </div>
  );
} 