'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    // Optionally log error to an error reporting service
    // console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-temple-light text-temple-primary">
      <h1 className="text-5xl font-heading font-bold mb-4">500 - Something Went Wrong</h1>
      <p className="mb-6 text-lg text-center max-w-xl">
        We&apos;re sorry, but something went wrong on our end.<br />
        Please try again, or return to the home page to continue exploring Sri Govinda mamba sametha Veerabramhendra Swami Temple, Atmakur.
      </p>
      <button
        onClick={() => reset()}
        className="px-6 py-2 bg-temple-primary text-white rounded-lg font-semibold shadow hover:bg-temple-accent transition mb-4"
      >
        Try Again
      </button>
      <Link href="/" className="text-temple-primary underline hover:text-temple-accent">Back to Home</Link>
    </main>
  );
} 