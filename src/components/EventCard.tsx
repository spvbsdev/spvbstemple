import { Event } from '@/types/event'
import { PortableText } from '@portabletext/react'

interface EventCardProps {
  event: Event
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="p-8">
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

        <p className="text-gray-700 text-lg">
          {event.description}
        </p>

        {event.schedule && event.schedule.length > 0 && (
          <div className="mt-6 space-y-2">
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
          <div className="mt-6 prose prose-lg max-w-none">
            <PortableText value={event.detailedDescription} />
          </div>
        )}
      </div>
    </div>
  )
} 