'use client';

import { useState } from 'react';
import { initializePayment } from '@/lib/payment';

interface DonationFormProps {
  projectId?: string;
  defaultAmount?: number;
}

export default function DonationForm({ projectId, defaultAmount }: DonationFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: defaultAmount || 1100,
    name: '',
    email: '',
    phone: '',
  });

  const predefinedAmounts = [1100, 2100, 5100, 11000, 21000];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await initializePayment({
        amount: formData.amount,
        projectId,
        donorName: formData.name,
        donorEmail: formData.email,
        donorPhone: formData.phone,
      });
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-temple-text font-medium mb-2">
          Select Amount (₹)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-3">
          {predefinedAmounts.map((amount) => (
            <button
              key={amount}
              type="button"
              onClick={() => setFormData({ ...formData, amount })}
              className={`py-2 px-4 rounded-lg text-center transition-colors duration-200 ${
                formData.amount === amount
                  ? 'bg-temple-primary text-white'
                  : 'bg-temple-light text-temple-text hover:bg-temple-primary/10'
              }`}
            >
              ₹{amount.toLocaleString()}
            </button>
          ))}
        </div>
        <input
          type="number"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: parseInt(e.target.value) })}
          min="100"
          step="100"
          className="w-full px-4 py-2 rounded-lg border border-temple-divider focus:outline-none focus:ring-2 focus:ring-temple-primary/20"
          placeholder="Enter custom amount"
        />
      </div>

      <div>
        <label className="block text-temple-text font-medium mb-2">
          Name
        </label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-temple-divider focus:outline-none focus:ring-2 focus:ring-temple-primary/20"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label className="block text-temple-text font-medium mb-2">
          Phone Number <span className="text-temple-primary">*</span>
        </label>
        <input
          type="tel"
          required
          pattern="[0-9]{10}"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-temple-divider focus:outline-none focus:ring-2 focus:ring-temple-primary/20"
          placeholder="Enter your WhatsApp number"
        />
        <p className="text-sm text-temple-text mt-1">
          We'll send donation confirmation on WhatsApp
        </p>
      </div>

      <div>
        <label className="block text-temple-text font-medium mb-2">
          Email (Optional)
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2 rounded-lg border border-temple-divider focus:outline-none focus:ring-2 focus:ring-temple-primary/20"
          placeholder="Enter your email address"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-temple-primary text-white py-3 rounded-lg font-sanskrit hover:bg-temple-secondary transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Processing...' : 'Proceed to Pay'}
      </button>

      <p className="text-sm text-temple-text text-center mt-4">
        Secure payments powered by Razorpay
      </p>
    </form>
  );
} 