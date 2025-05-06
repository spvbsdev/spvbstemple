'use client'

import { Event } from '@/types/event'
import { PortableText } from '@portabletext/react'
import { urlForImage } from '@/lib/sanity.image'

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  const flyer = event.flyer;
  const asset = flyer?.asset;
  return (
    <div className="bg-white rounded-xl shadow-decorative p-4 sm:p-6 max-w-2xl w-full mx-auto mb-8">
      <div className="flex items-start justify-between gap-4 mb-6">
        <h3 className="text-2xl font-heading text-[#FF4B26]">
          {event.title}
        </h3>
        {event.isAnnualEvent && (
          <span className="inline-block bg-yellow-50 text-yellow-600 text-sm px-3 py-1 rounded-full font-medium whitespace-nowrap">
            Annual Event
          </span>
        )}
      </div>

      <p className="text-temple-text text-base sm:text-lg leading-relaxed mb-4">
        {event.description}
      </p>

      {event.schedule && event.schedule.length > 0 && (
        <div className="mt-2 space-y-2 mb-4">
          {event.schedule.map((item, index) => (
            <div key={index} className="text-gray-600">
              <span className="font-medium">{item.time}</span>
              <span className="mx-2">-</span>
              <span>{item.activity}</span>
            </div>
          ))}
        </div>
      )}

      {event.detailedDescription && (
        <div className="text-temple-text text-base sm:text-lg leading-relaxed mb-4">
          <PortableText value={event.detailedDescription} />
        </div>
      )}

      {/* View Details Button */}
      {flyer && asset && (
        <button
          onClick={() => {
            const flyerImage = {
              _type: 'image',
              asset: asset
            };
            const url = urlForImage(flyerImage, { width: 2200, quality: 90, fit: 'clip' }).url();
            window.open(url, '_blank', 'noopener,noreferrer');
          }}
          className="w-full flex items-center justify-center bg-temple-primary text-white py-3 rounded-lg font-sanskrit hover:bg-temple-secondary transition-colors duration-300 mt-4"
        >
          <span>View Details</span>
        </button>
      )}
    </div>
  )
} 