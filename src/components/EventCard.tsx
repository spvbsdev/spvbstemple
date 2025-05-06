'use client'

import { Event } from '@/types/event'
import { PortableText } from '@portabletext/react'
import { useState } from 'react'
import imageUrlBuilder from '@sanity/image-url'
import { client } from '@/lib/sanity.client'

interface EventCardProps {
  event: Event
}

const builder = imageUrlBuilder(client)

export default function EventCard({ event }: EventCardProps) {
  const [showModal, setShowModal] = useState(false)
  const flyer = event.flyer;
  const asset = flyer?.asset;

  // Build the flyer image URL for the modal (no width/height/crop)
  const flyerImageUrl = asset
    ? builder.image({ _type: 'image', asset })
        .format('webp')
        .quality(90)
        .fit('clip')
        .auto('format')
        .url()
    : ''

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
          onClick={() => setShowModal(true)}
          className="w-full flex items-center justify-center bg-temple-primary text-white py-3 rounded-lg font-sanskrit hover:bg-temple-secondary transition-colors duration-300 mt-4"
        >
          <span>View Details</span>
        </button>
      )}

      {/* Flyer Modal */}
      {showModal && flyer && asset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[98vh] p-2 flex flex-col items-center overflow-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl font-bold z-10"
              aria-label="Close flyer modal"
            >
              ×
            </button>
            <div className="w-full flex justify-center items-center">
              <img
                src={flyerImageUrl}
                alt={event.title + ' Flyer'}
                className="object-contain w-full h-auto rounded-lg"
                style={{ maxWidth: '95vw', maxHeight: '98vh', touchAction: 'pan-x pan-y pinch-zoom' }}
                draggable={true}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 