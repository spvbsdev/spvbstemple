'use client';

import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { useSettings } from '@/lib/hooks';

interface DonationFormProps {
  projectId?: string;
  defaultAmount?: number;
}

const BANK_DETAILS = {
  account_number: '3757020206123',
  ifsc: 'SBIN0021921',
  beneficiary_name: 'Sri Pothuluri Veerabrahmendra Swamivari Devasthanam Trust',
  bank_name: 'State Bank of India',
  branch_name: 'Atmakur'
};

export default function DonationForm({ projectId, defaultAmount }: DonationFormProps) {
  const [amount, setAmount] = useState(defaultAmount || 1100);
  const [copied, setCopied] = useState('');
  const { settings } = useSettings();
  const predefinedAmounts = [1100, 2100, 5100, 11000, 21000];

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(''), 2000);
  };

  const getWhatsAppMessage = () => {
    const message = encodeURIComponent(
      `Hello, I would like to make a donation of ₹${amount} to Sri Pothuluri Veerabrahmendra Swamivari Temple.${
        projectId ? ` For project: ${projectId}` : ''
      }`
    );
    return `https://wa.me/${settings?.contact?.whatsapp}?text=${message}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-temple-text font-medium mb-2">
          Select Amount (₹)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-3">
          {predefinedAmounts.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => setAmount(amt)}
              className={`py-2 px-4 rounded-lg text-center transition-colors duration-200 ${
                amount === amt
                  ? 'bg-temple-primary text-white'
                  : 'bg-temple-light text-temple-text hover:bg-temple-primary/10'
              }`}
            >
              ₹{amt.toLocaleString()}
            </button>
          ))}
        </div>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
          min="100"
          step="100"
          className="w-full px-4 py-2 rounded-lg border border-temple-divider focus:outline-none focus:ring-2 focus:ring-temple-primary/20"
          placeholder="Enter custom amount"
        />
      </div>

      <div className="bg-temple-light p-6 rounded-lg space-y-4">
        <h3 className="text-lg font-medium text-temple-text">Bank Transfer Details</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-temple-text">Account Number</p>
              <p className="font-medium">{BANK_DETAILS.account_number}</p>
            </div>
            <button
              onClick={() => copyToClipboard(BANK_DETAILS.account_number, 'account')}
              className="text-temple-primary hover:text-temple-secondary p-2"
            >
              <FontAwesomeIcon icon={faCopy} />
              {copied === 'account' && <span className="ml-2 text-sm">Copied!</span>}
            </button>
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-temple-text">IFSC Code</p>
              <p className="font-medium">{BANK_DETAILS.ifsc}</p>
            </div>
            <button
              onClick={() => copyToClipboard(BANK_DETAILS.ifsc, 'ifsc')}
              className="text-temple-primary hover:text-temple-secondary p-2"
            >
              <FontAwesomeIcon icon={faCopy} />
              {copied === 'ifsc' && <span className="ml-2 text-sm">Copied!</span>}
            </button>
          </div>

          <div>
            <p className="text-sm text-temple-text">Beneficiary Name</p>
            <p className="font-medium">{BANK_DETAILS.beneficiary_name}</p>
          </div>

          <div>
            <p className="text-sm text-temple-text">Bank & Branch</p>
            <p className="font-medium">{BANK_DETAILS.bank_name}, {BANK_DETAILS.branch_name}</p>
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
        >
          <FontAwesomeIcon icon={faWhatsapp} />
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