import { defineField, defineType } from 'sanity'

type EventType = 'jayanthi' | 'aaradhana' | 'shivaratri' | 'navaratri' | 'other';

const eventTypeLabels: Record<EventType, string> = {
  jayanthi: 'Jayanthi',
  aaradhana: 'Aaradhana',
  shivaratri: 'Shivaratri',
  navaratri: 'Navaratri',
  other: 'Other'
};

export default defineType({
  name: 'event',
  title: 'Temple Events',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'eventDate',
      title: 'Event Date',
      type: 'date',
      description: 'Date of the event (can be updated later)'
    }),
    defineField({
      name: 'description',
      title: 'Event Description',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'detailedDescription',
      title: 'Detailed Description',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Rich text content about the event, its significance, and schedule'
    }),
    defineField({
      name: 'flyer',
      title: 'Event Flyer',
      type: 'image',
      options: {
        hotspot: true
      },
      description: 'Upload event flyer or promotional image'
    }),
    defineField({
      name: 'isAnnualEvent',
      title: 'Is Annual Event',
      type: 'boolean',
      description: 'Mark if this is an annual recurring event',
      initialValue: true
    }),
    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
      options: {
        list: [
          { title: 'Jayanthi', value: 'jayanthi' },
          { title: 'Aaradhana', value: 'aaradhana' },
          { title: 'Shivaratri', value: 'shivaratri' },
          { title: 'Navaratri', value: 'navaratri' },
          { title: 'Other', value: 'other' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'schedule',
      title: 'Event Schedule',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'time',
              title: 'Time',
              type: 'string'
            },
            {
              name: 'activity',
              title: 'Activity',
              type: 'string'
            }
          ]
        }
      ],
      description: 'Add schedule items for the event'
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Set to false to hide this event',
      initialValue: true
    })
  ],
  orderings: [
    {
      title: 'Start Date',
      name: 'startDateDesc',
      by: [{ field: 'eventDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'eventDate',
      eventType: 'eventType'
    },
    prepare({ title, date, eventType }) {
      return {
        title,
        subtitle: `${eventTypeLabels[eventType as EventType]} - ${date ? new Date(date).toLocaleDateString() : 'Date not set'}`,
        media: null
      }
    }
  }
}) 