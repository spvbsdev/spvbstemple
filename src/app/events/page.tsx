import { Metadata } from 'next'
import { client } from '@/lib/sanity.client'
import { eventsQuery } from '@/lib/queries'
import type { Event } from '@/types/event'
import EventCard from '@/components/EventCard'
import { getPageMetadata } from '@/lib/getPageMetadata'

export async function generateMetadata(): Promise<Metadata> {
  return getPageMetadata('/events')
}

async function getEvents(): Promise<Event[]> {
  return await client.fetch(eventsQuery)
}

export default async function EventsPage() {
  const events = await getEvents()

  // Separate annual and other events
  const annualEvents = events.filter(event => event.isAnnualEvent)
  const otherEvents = events.filter(event => !event.isAnnualEvent)

  // Group annual events by type
  const groupedAnnualEvents = annualEvents.reduce((acc, event) => {
    const type = event.eventType
    if (!acc[type]) {
      acc[type] = []
    }
    acc[type].push(event)
    return acc
  }, {} as Record<string, Event[]>)

  return (
    <div className="w-full flex flex-col items-center px-4 py-12">
      <h1 className="text-4xl font-heading text-[#FF4B26] text-center mb-16">
        Annual Events
      </h1>
      
      {/* Annual Events Section */}
      <div className="space-y-16">
        {Object.entries(groupedAnnualEvents).map(([type, events]) => (
          <section key={type} className="space-y-6">
            <h2 className="text-2xl font-heading text-[#FF4B26] capitalize">
              {type === 'jayanthi' ? 'Swami Vari Jayanthi' :
               type === 'aaradhana' ? 'Swami Vari Aaradhana' :
               type === 'shivaratri' ? 'Shiva Ratri' :
               type === 'navaratri' ? 'Navaratri' : type}
            </h2>
            <div className="flex flex-col items-center gap-8">
              {events.map(event => (
                <div key={event._id} className="w-full max-w-2xl">
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Other Events Section */}
      {otherEvents.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-heading text-[#FF4B26] mb-6">Special Events</h2>
          <div className="flex flex-col items-center gap-8">
            {otherEvents.map(event => (
              <div key={event._id} className="w-full max-w-2xl">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* No Events Message */}
      {events.length === 0 && (
        <p className="text-center text-temple-text text-lg">
          No upcoming events at the moment. Please check back later.
        </p>
      )}
    </div>
  )
} 