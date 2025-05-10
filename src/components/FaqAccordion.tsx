import React, { useState } from "react";

export interface FaqItem {
  _id: string;
  question: string;
  answer: string;
}

export default function FaqAccordion({ faqs = [] }: { faqs?: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4 max-w-6xl mx-auto w-full">
      {faqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <div
            key={faq._id || idx}
            className="border border-temple-primary rounded-lg overflow-hidden group"
          >
            <button
              className="w-full text-left px-6 py-4 font-bold text-lg bg-temple-light focus:outline-none flex justify-between items-center cursor-pointer text-black group-open:bg-temple-primary/10"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${idx}`}
              id={`faq-header-${idx}`}
              type="button"
            >
              {faq.question}
              <span
                className={`ml-2 transition-transform duration-200 ${
                  isOpen ? "rotate-90" : ""
                }`}
              >
                ▶
              </span>
            </button>
            {isOpen && (
              <div
                id={`faq-panel-${idx}`}
                role="region"
                aria-labelledby={`faq-header-${idx}`}
                className="px-6 bg-white pb-4"
              >
                {faq.answer.includes("About page") ? (
                  <p className="text-red-600">
                    To learn more about Sri Pothuluri Veerabrahmendra Swami and his teachings, please visit our{" "}
                    <a href="/about" className="text-temple-primary underline hover:text-temple-secondary">
                      About page
                    </a>
                    .
                  </p>
                ) : (
                  <p className="text-red-600">{faq.answer}</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
} 