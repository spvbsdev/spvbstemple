import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-temple-light text-temple-primary">
      <h1 className="text-5xl font-heading font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-6 text-lg text-center max-w-xl">
        Oops! The page you are looking for does not exist.<br />
        Please check the URL or return to the home page to explore more about Sri Govinda mamba sametha Veerabramhendra Swami Temple, Atmakur.
      </p>
      <Link href="/" className="px-6 py-2 bg-temple-primary text-white rounded-lg font-semibold shadow hover:bg-temple-accent transition">Back to Home</Link>
    </main>
  );
} 