'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faOm, faPrayingHands, faHandsHolding } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const teachings = [
  {
    title: 'SPIRITUAL WISDOM',
    description: 'His teachings emphasize the importance of meditation, self-realization, and the pursuit of divine knowledge.',
    icon: faOm
  },
  {
    title: 'PROPHECIES',
    description: 'The Kalagnanam contains detailed prophecies about future events and the evolution of human society.',
    icon: faPrayingHands
  },
  {
    title: 'SOCIAL REFORM',
    description: 'He worked tirelessly to remove social inequalities and promote harmony among all sections of society.',
    icon: faHandsHolding
  }
];

export default function CoreTeachings() {
  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-heading text-temple-gold text-center mb-16">
          CORE TEACHINGS
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {teachings.map((teaching, index) => (
            <div 
              key={index}
              className="relative p-8 rounded-2xl border border-temple-gold/30 backdrop-blur-sm bg-black/50 hover:border-temple-gold transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="text-4xl text-temple-gold mb-6">
                  <FontAwesomeIcon 
                    icon={teaching.icon as IconProp} 
                    className="transform hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-2xl font-heading text-temple-gold mb-4">
                  {teaching.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {teaching.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 