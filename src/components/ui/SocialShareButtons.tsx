import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const shareUrl = 'https://www.spvbstemple.org/';
const shareText = encodeURIComponent('Discover Sri Veerabrahmendra Swami Temple, Atmakur | Annadanam & Events');

export function SocialShareButtons() {
  return (
    <div className="flex justify-center md:justify-start gap-4 mt-4">
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors"
      >
        <FontAwesomeIcon icon={faFacebookF} />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareText}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter"
        className="bg-blue-400 hover:bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors"
      >
        <FontAwesomeIcon icon={faTwitter} />
      </a>
      <a
        href={`https://wa.me/?text=${shareText}%20${encodeURIComponent(shareUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        className="bg-green-500 hover:bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center transition-colors"
      >
        <FontAwesomeIcon icon={faWhatsapp} />
      </a>
    </div>
  );
} 