"use client";
import FaqAccordion from "./FaqAccordion";

export default function FaqAccordionWrapper({ faqs }: { faqs?: { _id: string; question: string; answer: string }[] }) {
  return <FaqAccordion faqs={faqs ?? []} />;
} 