'use client';

import { useState } from 'react';
import type { DonorRecord } from '@/types/donor';

interface DonorListProps {
  donors: DonorRecord[];
  /** `table` = spreadsheet-style rows (default). `cards` = stacked cards. */
  layout?: 'table' | 'cards';
}

/** Matches `donor` schema `cause` values in Sanity (studio/schemas/donor.ts). */
const CAUSE_LABELS: Record<string, string> = {
  all: 'All causes',
  development: 'Temple Development',
  'kalyana-mandapam': 'Kalyana Mandapam',
  annadanam: 'Annadanam',
  festivals: 'Festivals & Events',
  maintenance: 'Maintenance',
  other: 'Other',
};

function causeLabel(value: string): string {
  return CAUSE_LABELS[value] ?? value.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function DonorList({ donors, layout = 'table' }: DonorListProps) {
  const [selectedCause, setSelectedCause] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'amount'>('date');

  const causes = ['all', 'development', 'kalyana-mandapam', 'annadanam', 'festivals', 'maintenance', 'other'];

  const filteredDonors = donors
    .filter((donor) => selectedCause === 'all' || donor.cause === selectedCause)
    .sort((a, b) => {
      if (sortBy === 'date') {
        const ta = a.donationDate ? new Date(a.donationDate).getTime() : 0;
        const tb = b.donationDate ? new Date(b.donationDate).getTime() : 0;
        return tb - ta;
      }
      return (b.amount ?? 0) - (a.amount ?? 0);
    });

  return (
    <div className="w-full py-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <label htmlFor="cause" className="text-temple-text">Filter by Cause:</label>
          <select
            id="cause"
            value={selectedCause}
            onChange={(e) => setSelectedCause(e.target.value)}
            className="border border-temple-divider rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-temple-primary bg-white"
          >
            {causes.map((cause) => (
              <option key={cause} value={cause}>
                {causeLabel(cause)}
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
            className="border border-temple-divider rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-temple-primary bg-white"
          >
            <option value="date">Date (newest first)</option>
            <option value="amount">Amount (highest first)</option>
          </select>
        </div>
      </div>

      {layout === 'table' ? (
        <div className="overflow-x-auto rounded-xl border border-temple-divider bg-white shadow-decorative">
          <table className="min-w-full text-left text-sm text-temple-text">
            <thead className="bg-temple-light/90 font-heading text-temple-primary border-b border-temple-divider">
              <tr>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Name</th>
                <th className="px-4 py-3 font-semibold whitespace-nowrap">Cause</th>
                <th className="px-4 py-3 font-semibold text-right whitespace-nowrap">Amount</th>
                <th className="px-4 py-3 font-semibold min-w-[140px]">Notes</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonors.map((donor) => (
                <tr
                  key={donor._id}
                  className="border-b border-temple-divider/60 last:border-0 hover:bg-temple-light/40 transition-colors"
                >
                  <td className="px-4 py-3 font-medium text-temple-dark align-top">
                    {donor.isAnonymous ? 'Anonymous' : donor.name}
                  </td>
                  <td className="px-4 py-3 align-top">{donor.cause ? causeLabel(donor.cause) : '—'}</td>
                  <td className="px-4 py-3 text-right font-semibold text-temple-primary align-top whitespace-nowrap">
                    {donor.amount != null ? `₹${donor.amount.toLocaleString('en-IN')}` : '—'}
                  </td>
                  <td className="px-4 py-3 text-temple-muted align-top max-w-xs">
                    {donor.message ?? '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
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
                  {donor.cause && (
                    <p className="text-temple-text mt-1">
                      Donated for: <span className="font-medium">{causeLabel(donor.cause)}</span>
                    </p>
                  )}
                  {donor.message && (
                    <p className="text-temple-text mt-2 italic">&ldquo;{donor.message}&rdquo;</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-temple-primary">
                    {donor.amount != null ? `₹${donor.amount.toLocaleString()}` : '—'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredDonors.length === 0 && (
        <div className="text-center py-12 text-temple-text">
          No donations found for the selected criteria.
        </div>
      )}
    </div>
  );
}
