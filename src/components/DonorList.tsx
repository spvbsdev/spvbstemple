'use client';

import { useState } from 'react';
import { format } from 'date-fns';

interface Donor {
  _id: string;
  name: string;
  amount: number;
  cause: string;
  donationDate: string;
  message?: string;
  isAnonymous: boolean;
}

interface DonorListProps {
  donors: Donor[];
}

export default function DonorList({ donors }: DonorListProps) {
  const [selectedCause, setSelectedCause] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');

  const causes = ['all', 'development', 'annadanam', 'festivals', 'maintenance', 'other'];

  const filteredDonors = donors
    .filter((donor) => selectedCause === 'all' || donor.cause === selectedCause)
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.donationDate).getTime() - new Date(a.donationDate).getTime();
      }
      return b.amount - a.amount;
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <label htmlFor="cause" className="text-temple-text">Filter by Cause:</label>
          <select
            id="cause"
            value={selectedCause}
            onChange={(e) => setSelectedCause(e.target.value)}
            className="border border-temple-divider rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-temple-primary"
          >
            {causes.map((cause) => (
              <option key={cause} value={cause}>
                {cause.charAt(0).toUpperCase() + cause.slice(1)}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="sort" className="text-temple-text">Sort by:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'amount')}
            className="border border-temple-divider rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-temple-primary"
          >
            <option value="date">Date</option>
            <option value="amount">Amount</option>
          </select>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredDonors.map((donor) => (
          <div
            key={donor._id}
            className="bg-white rounded-lg shadow-decorative p-6 border border-temple-divider hover:border-temple-primary transition-colors duration-300"
          >
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="text-xl font-sanskrit text-temple-primary">
                  {donor.isAnonymous ? 'Anonymous Donor' : donor.name}
                </h3>
                <p className="text-temple-text mt-1">
                  Donated for: <span className="font-medium">{donor.cause.charAt(0).toUpperCase() + donor.cause.slice(1)}</span>
                </p>
                {donor.message && (
                  <p className="text-temple-text mt-2 italic">&ldquo;{donor.message}&rdquo;</p>
                )}
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-temple-primary">₹{donor.amount.toLocaleString()}</p>
                <p className="text-temple-text text-sm mt-1">
                  {format(new Date(donor.donationDate), 'dd MMM yyyy')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredDonors.length === 0 && (
        <div className="text-center py-12 text-temple-text">
          No donations found for the selected criteria.
        </div>
      )}
    </div>
  );
} 